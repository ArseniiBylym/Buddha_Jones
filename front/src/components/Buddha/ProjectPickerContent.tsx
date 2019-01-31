import * as React from 'react';
import * as classNames from 'classnames';
import AnimateHeight from 'react-animate-height';
import { observer } from 'mobx-react';
import { ProjectPickerSections, ProjectPickerValues } from '.';
import { Col, Row } from '../Section';
import { ProjectsCampaignsSpotsActions } from 'actions';
import { LoadingShade, LoadingSpinner } from '../Loaders';
import {
    CampaignResult,
    CampaignsResult,
    ProjectResult,
    ProjectsResult,
    SpotResult,
    SpotsResult,
    TRTItem,
    VersionResult,
    VersionsResult,
} from 'types/projectsCampaignsSpots';
import { Pagination } from '../Pagination';
import { InputSearch } from '../Form';
import { ButtonClose } from '../Button';
import { ProjectPickerEntries } from './ProjectPickerEntries';

// Styles
const s = require('./ProjectPicker.css');

export interface ProjectPickerResult {
    section: ProjectPickerSections;
    id: number;
    campaignId: number | null;
    name: string;
    clientId: number | null;
    clientName: string | null;
    customerName?: string | null;
    customerId?: number | null;
}

interface Props {
    onResultPicked: (result: ProjectPickerResult | null) => void;
    onSearchQueryChange: (query: string) => void;
    onSectionClose: () => void;
    entriesPerPage: number;
    sectionOpen: ProjectPickerSections | null;
    searchQuery: string;
    value: ProjectPickerValues | null;
    readOnly: boolean;
    forUserId: number;
    projects: ProjectResult[];
    campaigns: CampaignResult[];
    spots: SpotResult[];
    versions: VersionResult[];
    openWithAutoFocus: boolean;
    areProjectPermissionsLoading: boolean;
    userCanViewProjectName: boolean;
    userCanViewProjectCodeName: boolean;
    trtList: TRTItem[] | null;
    spot_customer_name?: string | null;
    spot_customer_id?: number | null;
    real_index?: number;
}

interface State {
    resultsPage: number;
}

declare type ProjectPickerList = ProjectsResult | CampaignsResult | SpotsResult | VersionsResult | null;

@observer
export class ProjectPickerContent extends React.Component<Props, State> {
    private get resultsCountFrom(): number {
        return (this.state.resultsPage - 1) * this.props.entriesPerPage;
    }

    private get search(): string {
        return ProjectsCampaignsSpotsActions.prepareSearchQuery(this.props.searchQuery);
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            resultsPage: 1
        };
    }

    public componentDidMount() {
        if (this.props.sectionOpen) {
            ProjectsCampaignsSpotsActions.fetchResults(
                this.props.forUserId,
                this.props.sectionOpen,
                this.props.searchQuery,
                this.state.resultsPage,
                this.props.entriesPerPage,
                this.props.value,
                false
            );
        }
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (nextProps.sectionOpen && this.props.value !== nextProps.value) {
            this.dropPaginator();
            ProjectsCampaignsSpotsActions.fetchResults(
                nextProps.forUserId,
                nextProps.sectionOpen,
                nextProps.searchQuery,
                this.state.resultsPage,
                nextProps.entriesPerPage,
                nextProps.value,
                false
            );
        } else if (nextProps.sectionOpen && this.props.sectionOpen !== nextProps.sectionOpen) {
            this.dropPaginator();
            ProjectsCampaignsSpotsActions.fetchResults(
                nextProps.forUserId,
                nextProps.sectionOpen,
                nextProps.searchQuery,
                this.state.resultsPage,
                nextProps.entriesPerPage,
                nextProps.value,
                false
            );
        } else if (nextProps.sectionOpen && this.props.searchQuery !== nextProps.searchQuery) {
            this.dropPaginator();
            ProjectsCampaignsSpotsActions.fetchResults(
                nextProps.forUserId,
                nextProps.sectionOpen,
                nextProps.searchQuery,
                this.state.resultsPage,
                nextProps.entriesPerPage,
                nextProps.value,
                false
            );
        }
    }

    public render() {
        const currentResults: ProjectPickerList = this.getCurrentResult();
        const areCurrentResultsLoading: boolean = Boolean(currentResults && currentResults.isLoading);

        return (
            <AnimateHeight height={this.props.sectionOpen !== null && !this.props.readOnly ? 'auto' : 0}>
                <Row removeGutter={true}>
                    <Col className={s.searchResults}>
                        <Row className={s.searchCreateCloseRow} removeMargins={true}>
                            <Col size={4}>
                                <InputSearch
                                    onChange={this.handleSearchChange}
                                    value={this.props.searchQuery}
                                    label={`Search ${this.props.sectionOpen + 's'}`}
                                    autoFocus={this.props.openWithAutoFocus}
                                />
                            </Col>

                            <Col size={4}>
                                <ButtonClose
                                    onClick={this.handlePickerCollapse}
                                    className={s.closeButton}
                                    float="right"
                                    label="Close"
                                />
                            </Col>
                        </Row>

                        <ol
                            key={1}
                            className={classNames(s.searchResultsList, {
                                ['resultsCount' + (currentResults ? currentResults.results.length : 0)]: true,
                            })}
                            start={this.resultsCountFrom}
                        >
                            <ProjectPickerEntries
                                currentResults={currentResults}
                                onResultPicked={this.props.onResultPicked}
                                userCanViewProjectCodeName={this.props.userCanViewProjectCodeName}
                                userCanViewProjectName={this.props.userCanViewProjectName}
                                trtList={this.props.trtList}
                                sectionOpen={this.props.sectionOpen}
                                spot_customer_name={this.props.spot_customer_name}
                                spot_customer_id={this.props.spot_customer_id}
                                real_index={this.props.real_index}
                            />
                            {(currentResults === null || currentResults.results.length <= 0) && (
                                <li className={s.noEntries} key="noEntries">
                                    <p>No available results</p>
                                </li>
                            )}
                        </ol>

                        <Pagination
                            edgesCount={3}
                            currentPage={this.state.resultsPage}
                            countPerPage={this.props.entriesPerPage}
                            countTotal={currentResults ? currentResults.totalCountOfResults : 0}
                            displayTotals={true}
                            onPageChange={this.handleResultsPageChange}
                        />

                        {(areCurrentResultsLoading || this.props.areProjectPermissionsLoading) && (
                            <LoadingShade
                                key={3}
                                background={
                                    'rgba(233, 224, 215, ' +
                                    (this.props.areProjectPermissionsLoading ? '1.0' : '0.7') +
                                    ')'
                                }
                                border="4px solid rgba(248, 248, 248, 0.9)"
                            >
                                <LoadingSpinner size={48} color="#5A4D3F"/>
                            </LoadingShade>
                        )}
                    </Col>
                </Row>
            </AnimateHeight>
        );
    }

    private refreshResults = () => {
        if (this.props.sectionOpen !== null) {
            ProjectsCampaignsSpotsActions.fetchResults(
                this.props.forUserId,
                this.props.sectionOpen,
                this.props.searchQuery,
                this.state.resultsPage,
                this.props.entriesPerPage,
                this.props.value,
                false
            );
        }
    }

    private getCurrentResult(): ProjectPickerList {
        const { value, forUserId } = this.props;

        switch (this.props.sectionOpen) {
            case ProjectPickerSections.project: {
                return ProjectsCampaignsSpotsActions.getProjectResult(forUserId, this.search, this.state.resultsPage);
            }

            case ProjectPickerSections.projectCampaign: {
                const id: number | null = value && value.project ? value.project.id : null;

                return ProjectsCampaignsSpotsActions.getCampaignResult(forUserId, id, this.search, this.state.resultsPage);
            }

            case ProjectPickerSections.spot: {
                let ids: any = null;
                if (value && (value.project || value.projectCampaign)) {
                    const projectId: number | null = value.project ? value.project.id : null;
                    const projectCampaignId: number | null = value.projectCampaign && value.projectCampaign.id ?
                        value.projectCampaign.id : null;

                    ids = {
                        projectId,
                        projectCampaignId,
                    };
                }

                return ProjectsCampaignsSpotsActions.getSpotResult(forUserId, ids, this.search, this.state.resultsPage);
            }

            case ProjectPickerSections.version: {
                let ids: any = null;

                if (value && (value.project || value.projectCampaign || value.spot)) {
                    ids = {
                        projectId: value.project ? value.project.id : null,
                        projectCampaignId: value.projectCampaign ? value.projectCampaign.id : null,
                        spotId: value.spot ? value.spot.id : null,
                    };
                }

                return ProjectsCampaignsSpotsActions.getVersionResult(forUserId, ids, this.search, this.state.resultsPage);
            }

            default:
                return null;
        }
    }

    private dropPaginator = (): void => {
        this.setState({
            resultsPage: 1,
        }, this.refreshResults);
    };

    private handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onSearchQueryChange(e.target.value);
    };

    private handlePickerCollapse = () => {
        this.props.onSectionClose();
    };

    private handleResultsPageChange = (newPage: number) => {
        this.setState({
            resultsPage: newPage
        }, this.refreshResults);
    };
}
