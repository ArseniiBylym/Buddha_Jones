import React from 'react';
import { connect } from 'react-redux';
import { debounce as _debounce, toNumber as _toNumber } from 'lodash';
import * as actionsProjectsList from './../../../actions/ProjectsList';
import * as actionsHeader from './../../../actions/Header';
import * as API from './../../../actions/api';
import history from './../../../core/history';
import zenscroll from 'zenscroll';
import { Layout } from './../../../components/Layout';
import { Section, Row, Col } from './../../../components/Section';
import { Paragraph } from './../../../components/Content';
import { Button } from './../../../components/Button';
import { LoadingShade, LoadingSpinner, LoadingIndicator } from './../../../components/Loaders';
import { Person, ClientsFilter } from './../../../components/Buddha';
import { Input } from './../../../components/Form';
import { Pagination } from './../../../components/Pagination';
import { ProjectGridCard } from '.';
import { getProjectsCount, getProjectsColumns } from './ProjectsGridSelectors';
import { bindActionCreators } from 'redux';

// Styles
import s from './ProjectsGrid.css';
import { IconPlusWhite, IconSearchLoupe } from './../../../components/Icons';

// Deriviations
const mapStateToProps = (state, ownProps) => {
    return {
        header: state.header,
        notifications: state.notifications,
        projectsList: state.projectsList,
        projectsCount: getProjectsCount(state),
        projectsColumns: getProjectsColumns(state)
    };
};

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actionsProjectsList: bindActionCreators(actionsProjectsList, dispatch),
        actionsHeader: bindActionCreators(actionsHeader, dispatch)
    };
};

// Component
class PageProjectsGrid extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.debouncedProjectsFetch = _debounce(this.debouncedProjectsFetch, 300);
        this.handleProjectClick = this.handleProjectClick.bind(this);
    }

    componentDidMount() {
        // Scroll to top
        window.scrollTo(0, 0);

        // Dispatch header
        this.props.actionsHeader.setNewHeader(
            {
                title: 'Projects board'
            },
            [
                <Button
                    onClick={e => this.handleDefineNewProjectClick(e)}
                    label={{
                        text: 'Define new project',
                        color: 'white',
                        size: 'large',
                        onLeft: true
                    }}
                    icon={{
                        size: 'small',
                        background: 'yellow',
                        element:
                            <IconPlusWhite
                                width={12}
                                height={12}
                                marginTop={-6}
                                marginLeft={-6}
                            />
                    }}
                />
            ]
        );

        // Fetch projects
        this.props.actionsProjectsList.fetchProjects(
            typeof this.props.page !== 'undefined' && this.props.page ? this.props.page : 1
        );
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.page !== nextProps.page) {
            this.projectsFetch(typeof nextProps.page !== 'undefined' && nextProps.page ? nextProps.page : 1, true);
        }
    }

    render() {
        const { projectsList, projectsCount, projectsColumns } = this.props;

        return (
            <Layout>

                <Section
                    title="All projects"
                    noSeparator={true}
                    headerElements={
                        [projectsList.updatingProjects ? {
                            key: 'updating-indicator',
                            element:
                                <LoadingIndicator label="Refreshing" />
                        } : undefined]
                        .concat([
                            {
                                key: 'clients-filter',
                                element:
                                    <ClientsFilter
                                        ref="clientFilter"
                                        onChange={e => this.handleClientFilterChange(e)}
                                        truncuateLabelTo={64}
                                    />
                            },
                            {
                                key: 'search-input',
                                element:
                                    <Input
                                        onChange={e => this.handleProjectNameSearchChange(e)}
                                        label="Search project by name..."
                                        minWidth={320}
                                        icon={
                                            <IconSearchLoupe
                                                width={13}
                                                height={13}
                                                marginTop={-6}
                                            />
                                        }
                                    />
                            }
                        ])
                    }
                >

                    <div ref="board" className={s.board}>
                        {(projectsColumns !== null && projectsColumns.count > 0) && (
                            <Row justifyContent={projectsColumns.count === 1 ? 'center' : undefined}>
                                {Object.keys(projectsColumns)
                                    .filter((columnKey) => columnKey.indexOf('column') !== -1)
                                    .map((columnKey) => (
                                    <Col key={columnKey} size={12 / projectsColumns.count}>
                                        {projectsColumns[columnKey].length > 0 && projectsColumns[columnKey].map((project) => (
                                            <ProjectGridCard
                                                key={project.key}
                                                project={project.data}
                                                handleProjectClick={this.handleProjectClick}
                                            />
                                        ))}
                                    </Col>
                                ))}
                            </Row>
                        ) || (projectsColumns === null && projectsList.loadingProjects === false) && (
                            <Row justifyContent="center">
                                <Col>
                                    <p>No projects</p>
                                </Col>
                            </Row>
                        )}
                    </div>

                    <Pagination
                        className={s.pagination}
                        onPageChange={e => this.handleProjectsPageChange(e)}
                        currentPage={projectsList.pagination.currentPage}
                        countPerPage={projectsList.pagination.countPerPage}
                        countTotal={projectsList.pagination.countTotal}
                    />

                    {(projectsList.loadingProjects) && (
                        <LoadingShade background="rgba(247, 247, 247, 0.9)" contentCentered={true} contentCenteredToTop={true}>
                            <LoadingSpinner size={64} />
                        </LoadingShade>
                    )}

                </Section>

            </Layout>
        );
    }

    projectsFetch(newPage, scrollToTop) {
        newPage = typeof newPage !== 'undefined' && newPage ? _toNumber(newPage) : undefined;
        scrollToTop = typeof scrollToTop === 'boolean' && scrollToTop !== null ? scrollToTop : false;

        this.props.actionsProjectsList.fetchProjects(
             typeof newPage !== 'undefined' && !isNaN(newPage) ? newPage : undefined
        );

        if (scrollToTop) {
            zenscroll.toY(0);
        }
    }

    debouncedProjectsFetch(newPage, scrollToTop) {
        this.projectsFetch(newPage);
    }

    handleClientFilterChange(selected) {
        if (typeof selected !== 'undefined' && typeof selected.value !== 'undefined') {
            // Change client filter and fetch filtered projects
            this.props.actionsProjectsList.changeProjectsListClientFilter(selected);

            // Close client filter dropdown
            if (
                this.refs.clientFilter !== undefined &&
                this.refs.clientFilter.refs.clientsFilterDropdown !== undefined &&
                this.refs.clientFilter.refs.clientsFilterDropdown.closeDropdown !== undefined
            ) {
                this.refs.clientFilter.refs.clientsFilterDropdown.closeDropdown();
            }
        }
    }

    handleProjectNameSearchChange(e) {
        this.props.actionsProjectsList.changeProjectsListSearchQuery(e.target.value).then(() => {
            this.debouncedProjectsFetch(1);
        });
    }

    handleProjectsPageChange(newPage) {
        history.push('/projects/' + newPage);
    }

    handleDefineNewProjectClick(e) {
        history.push('/new-project');
    }

    handleProjectClick(clientId, clientName, projectId, projectName) {
        if (
            typeof clientId !== 'undefined' &&
            typeof clientName !== 'undefined' &&
            typeof projectId !== 'undefined' &&
            typeof projectName !== 'undefined'
        ) {
            let url = '/project';
            url += '/' + clientId.toString();
            url += '/' + encodeURIComponent(clientName);
            url += '/' + projectId.toString();
            url += '/' + encodeURIComponent(projectName);
            url += '/' + (typeof this.props.page !== 'undefined' && this.props.page ? this.props.page : 1);
            history.push(url);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageProjectsGrid);
