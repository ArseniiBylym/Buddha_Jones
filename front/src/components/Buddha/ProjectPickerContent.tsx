import * as React from 'react';
import * as classNames from 'classnames';
import AnimateHeight from 'react-animate-height';
import debounce from 'lodash-es/debounce';
import { observer } from 'mobx-react';
import { ProjectPickerSections, ProjectPickerValues } from '.';
import { observable, reaction, computed } from 'mobx';
import { Row, Col } from '../Section';
import { ProjectsCampaignsSpotsActions } from 'actions';
import { LoadingShade, LoadingSpinner } from '../Loaders';
import {
    SpotsResult,
    ProjectsResult,
    CampaignsResult,
    VersionsResult,
    ProjectsResultsEntry,
    CampaignsResultsEntry,
    SpotsResultsEntry,
    VersionsResultsEntry,
    ProjectResult,
    CampaignResult,
    SpotResult,
    VersionResult,
} from 'types/projectsCampaignsSpots';
import { Pagination } from '../Pagination';
import { InputSearch } from '../Form';
import { ButtonClose, Button } from '../Button';
import { truncate } from 'lodash-es';

// Styles
const s = require('./ProjectPicker.css');

// Types
export interface ProjectPickerResult {
    section: ProjectPickerSections;
    id: number;
    name: string;
    clientId: number | null;
    clientName: string | null;
}

// Props
interface ProjectPickerContentProps {
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
}

// Component
@observer
export class ProjectPickerContent extends React.Component<ProjectPickerContentProps, {}> {
    @observable private resultsPage: number = 1;

    @computed
    private get resultsCountFrom(): number {
        const count = this.resultsPage * this.props.entriesPerPage - (this.props.entriesPerPage - 1);
        return count < 0 ? 0 : count;
    }

    @computed
    private get search(): string {
        return ProjectsCampaignsSpotsActions.prepareSearchQuery(this.props.searchQuery);
    }

    constructor(props: ProjectPickerContentProps) {
        super(props);

        this.fetchResultsDebounced = debounce(this.fetchResultsDebounced, 300);

        reaction(
            () => this.resultsPage,
            resultsPage => {
                if (this.props.sectionOpen !== null) {
                    this.fetchResults(
                        this.props.forUserId,
                        this.props.sectionOpen,
                        this.props.searchQuery,
                        resultsPage,
                        this.props.entriesPerPage,
                        this.props.value,
                        false
                    );
                }
            }
        );
    }

    public componentDidMount() {
        if (this.props.sectionOpen) {
            this.fetchResults(
                this.props.forUserId,
                this.props.sectionOpen,
                this.props.searchQuery,
                this.resultsPage,
                this.props.entriesPerPage,
                this.props.value,
                false
            );
        }
    }

    public componentWillReceiveProps(nextProps: ProjectPickerContentProps) {
        if (nextProps.sectionOpen && this.props.value !== nextProps.value) {
            this.fetchResults(
                nextProps.forUserId,
                nextProps.sectionOpen,
                nextProps.searchQuery,
                this.resultsPage,
                nextProps.entriesPerPage,
                nextProps.value,
                false
            );
        } else if (nextProps.sectionOpen && this.props.sectionOpen !== nextProps.sectionOpen) {
            this.fetchResults(
                nextProps.forUserId,
                nextProps.sectionOpen,
                nextProps.searchQuery,
                this.resultsPage,
                nextProps.entriesPerPage,
                nextProps.value,
                false
            );
        } else if (nextProps.sectionOpen && this.props.searchQuery !== nextProps.searchQuery) {
            this.fetchResultsDebounced(
                nextProps.forUserId,
                nextProps.sectionOpen,
                nextProps.searchQuery,
                this.resultsPage,
                nextProps.entriesPerPage,
                nextProps.value,
                false
            );
        }
    }

    public render() {
        const { value, forUserId } = this.props;

        const currentResults =
            this.props.sectionOpen === 'project'
                ? ProjectsCampaignsSpotsActions.getProjectResult(forUserId, this.search, this.resultsPage)
                : this.props.sectionOpen === 'projectCampaign'
                    ? ProjectsCampaignsSpotsActions.getCampaignResult(
                          forUserId,
                          value && value.project ? value.project.id : null,
                          this.search,
                          this.resultsPage
                      )
                    : this.props.sectionOpen === 'spot'
                        ? ProjectsCampaignsSpotsActions.getSpotResult(
                              forUserId,
                              value && (value.project || value.projectCampaign)
                                  ? {
                                        projectId: value.project ? value.project.id : null,
                                        projectCampaignId: value.projectCampaign ? value.projectCampaign.id : null,
                                    }
                                  : null,
                              this.search,
                              this.resultsPage
                          )
                        : this.props.sectionOpen === 'version'
                            ? ProjectsCampaignsSpotsActions.getVersionResult(
                                  forUserId,
                                  value && (value.project || value.projectCampaign || value.spot)
                                      ? {
                                            projectId: value.project ? value.project.id : null,
                                            projectCampaignId: value.projectCampaign ? value.projectCampaign.id : null,
                                            spotId: value.spot ? value.spot.id : null,
                                        }
                                      : null,
                                  this.search,
                                  this.resultsPage
                              )
                            : null;

        const areCurrentResultsLoading = currentResults && currentResults.isLoading ? true : false;

        return (
            <AnimateHeight height={this.props.sectionOpen !== null && this.props.readOnly === false ? 'auto' : 0}>
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

                            {/*
                <Col size={4}>
                    {
                        if (this.props.userCanCreateNew) {
                            createPicker = (
                                <div className={s.createPicker}>
                                    {this.state.current==='project' && (
                                        <CreateProjectPicker
                                            label='Create new project'
                                            reloadProject={(
                                                    value,
                                                    selectedId,
                                                    customerId,
                                                    customerName
                                                )=>{
                                                    this.setState({
                                                        current: 'campaign',
                                                        project: Object.assign(
                                                            {},
                                                            this.state.project, {
                                                                value: value,
                                                                selectedId: selectedId,
                                                                customerId: customerId,
                                                                customerName: customerName
                                                            }
                                                        ),
                                                        campaign: Object.assign(
                                                            {},
                                                            this.state.campaign, {
                                                                value: '',
                                                                selectedId: null
                                                            }
                                                        ),
                                                        spot: Object.assign({}, this.state.spot, {
                                                            value: '',
                                                            selectedId: null
                                                        }),
                                                        version: Object.assign(
                                                            {},
                                                            this.state.version, {
                                                                value: '',
                                                                selectedId: null
                                                            }
                                                        )
                                                    }, ()=>{
                                                        this.loadResultsFromServer('campaign', 1);
                                                    });
                                                }
                                            }
                                        />
                                    )}

                                    {this.state.current==='campaign' && (
                                        <CreateCampaignPicker
                                            label='Create new campaign'
                                            projectId = {this.state.project.selectedId}
                                            excludeCampaginIds={this.state.results.entries}
                                            reloadCampaign={(campaignName, campaignId)=>{
                                                    this.setState({
                                                        current: 'spot',
                                                        campaign: Object.assign(
                                                            {},
                                                            this.state.campaign, {
                                                                value: campaignName,
                                                                selectedId: campaignId
                                                            }
                                                        ),
                                                        spot: Object.assign(
                                                            {},
                                                            this.state.spot, {
                                                                value: '',
                                                                selectedId: null
                                                            }
                                                        ),
                                                        version: Object.assign(
                                                            {},
                                                            this.state.version, {
                                                                value: '',
                                                                selectedId: null
                                                            }
                                                        )
                                                    }, ()=>{
                                                        this.loadResultsFromServer('spot', 1);
                                                    });
                                                }
                                            }
                                        />
                                    )}

                                    {this.state.current==='spot' && (
                                        <CreateSpotPicker
                                            label='Create new spot'
                                            projectId = {this.state.project.selectedId}
                                            campaignId = {this.state.campaign.selectedId}
                                            projectName = {this.state.project.value}
                                            campaignName = {this.state.campaign.value}
                                            reloadSpot={(spotName, spotId)=>{
                                                    this.setState({
                                                        current: 'version',
                                                        spot: Object.assign({}, this.state.spot, {
                                                            value: spotName,
                                                            selectedId: spotId
                                                        }),
                                                        version: Object.assign(
                                                            {},
                                                            this.state.version, {
                                                                value: '',
                                                                selectedId: null
                                                            }
                                                        )
                                                    }, ()=>{
                                                        this.loadResultsFromServer('version', 1);
                                                    });
                                                }
                                            }
                                        />
                                    )}

                                    {(
                                        this.state.current==='version' &&
                                        this.state.results.type==='version'
                                    ) && (
                                        <CreateVersionPicker
                                            label='Create new version'
                                            projectId = {this.state.project.selectedId}
                                            campaignId = {this.state.campaign.selectedId}
                                            spotId = {this.state.spot.selectedId}
                                            spotName = {this.state.spot.value}
                                            excludeVersionIds = {this.state.results.entries}
                                            reloadVersion={()=>{
                                                    this.loadResultsFromServer('version', 1);
                                                }
                                            }
                                        />
                                    )}
                                </div>
                            );
                        }
                    }
                </Col>
            */}

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
                            start={this.resultsCountFrom > 0 ? this.resultsCountFrom : 1}
                        >
                            {currentResults && currentResults.results ? this.renderEntries(currentResults) : null}

                            {(currentResults === null || currentResults.results.length <= 0) && (
                                <li className={s.noEntries} key="noEntries">
                                    <p>No available results</p>
                                </li>
                            )}
                        </ol>

                        <Pagination
                            edgesCount={3}
                            currentPage={this.resultsPage}
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
                                <LoadingSpinner size={48} color="#5A4D3F" />
                            </LoadingShade>
                        )}
                    </Col>
                </Row>
            </AnimateHeight>
        );
    }

    private renderEntries(currentResults: ProjectsResult | CampaignsResult | SpotsResult | VersionsResult | null) {
        let entries: Array<{
            section: ProjectPickerSections;
            id: number;
            campaignId?: number;
            name: string;
            clientId: number | null;
            clientName: string | null;
        }> = [];

        if (currentResults) {
            if (this.props.sectionOpen === 'project') {
                const results = currentResults.results as ProjectsResultsEntry[];
                entries = results.map(result => {
                    let name = '';
                    if (this.props.userCanViewProjectCodeName && this.props.userCanViewProjectName) {
                        name = result.projectCode
                            ? `(${result.projectCode})` + (result.projectName ? ' - ' + result.projectName : '')
                            : result.projectName
                                ? result.projectName
                                : '';
                    } else {
                        name = result.projectCode ? result.projectCode : result.projectName ? result.projectName : '';
                    }

                    return {
                        section: 'project' as ProjectPickerSections,
                        id: result.id,
                        name: name,
                        clientId: result.customerId,
                        clientName: result.customerName,
                    };
                });
            } else if (this.props.sectionOpen === 'projectCampaign') {
                const results = currentResults.results as CampaignsResultsEntry[];
                entries = results.map(result => {
                    return {
                        section: 'projectCampaign' as ProjectPickerSections,
                        id: result.campaignId,
                        name:
                            (result.campaignName || '') +
                            (result.note && result.note !== result.campaignName
                                ? ' - ' + truncate(result.note, { length: 32 })
                                : ''),
                        clientId: null,
                        clientName: null,
                    };
                });
            } else if (this.props.sectionOpen === 'spot') {
                const results = currentResults.results as SpotsResultsEntry[];
                entries = results.map(result => {
                    return {
                        section: 'spot' as ProjectPickerSections,
                        id: result.id,
                        name: result.spotName,
                        clientId: null,
                        clientName: null,
                    };
                });
            } else if (this.props.sectionOpen === 'version') {
                const results = currentResults.results as VersionsResultsEntry[];
                entries = results.map(result => {
                    return {
                        section: 'version' as ProjectPickerSections,
                        id: result.id,
                        name: result.versionName,
                        clientId: null,
                        clientName: null,
                    };
                });
            }
        }

        return entries.map((result, ind: number) => (
            <li key={`li-${result.id}-${ind}`}>
                <Button
                    onClick={this.handleResultPick(
                        result.section,
                        result.id,
                        result.name,
                        result.clientId,
                        result.clientName
                    )}
                    label={{
                        text: result.name,
                        size: 'small',
                        color: 'blue',
                        onLeft: true,
                    }}
                />
            </li>
        ));
    }

    private handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onSearchQueryChange(e.target.value);
    };

    private handlePickerCollapse = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onSectionClose();
    };

    private handleResultPick = (
        section: ProjectPickerSections,
        id: number,
        name: string,
        clientId: number | null,
        clientName: string | null
    ) => (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onResultPicked({
            section: section,
            id: id,
            name: name,
            clientId: clientId,
            clientName: clientName,
        });
    };

    private handleResultsPageChange = (newPage: number) => {
        this.resultsPage = newPage;
    };

    private fetchResultsDebounced = (
        forUserId: number,
        section: ProjectPickerSections,
        search: string = '',
        page: number = 1,
        entriesPerPage: number = 16,
        value: ProjectPickerValues | null = null,
        forceFetch: boolean = false
    ) => {
        this.fetchResults(forUserId, section, search, page, entriesPerPage, value, forceFetch);
    };

    private fetchResults = async (
        forUserId: number,
        section: ProjectPickerSections,
        search: string = '',
        page: number = 1,
        entriesPerPage: number = 16,
        value: ProjectPickerValues | null = null,
        forceFetch: boolean = false
    ): Promise<boolean> => {
        try {
            if (section) {
                if (section === 'project') {
                    await ProjectsCampaignsSpotsActions.fetchProjects(
                        forUserId,
                        search,
                        page,
                        entriesPerPage,
                        forceFetch
                    );
                } else if (section === 'projectCampaign') {
                    await ProjectsCampaignsSpotsActions.fetchCampaigns(
                        forUserId,
                        value && value.project ? value.project.id : null,
                        search,
                        page,
                        entriesPerPage,
                        forceFetch
                    );
                } else if (section === 'spot') {
                    await ProjectsCampaignsSpotsActions.fetchSpots(
                        forUserId,
                        value
                            ? {
                                  projectId: value.project ? value.project.id : null,
                                  projectCampaignId: value.projectCampaign ? value.projectCampaign.id : null,
                              }
                            : null,
                        search,
                        page,
                        entriesPerPage,
                        forceFetch
                    );
                } else if (section === 'version') {
                    await ProjectsCampaignsSpotsActions.fetchVersions(
                        forUserId,
                        value
                            ? {
                                  projectId: value.project ? value.project.id : null,
                                  projectCampaignId: value.projectCampaign ? value.projectCampaign.id : null,
                                  spotId: value.spot ? value.spot.id : null,
                              }
                            : null,
                        search,
                        page,
                        entriesPerPage,
                        forceFetch
                    );
                }
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchResults(forUserId, section, search, page, entriesPerPage, value, true);
            }, 1024);
            throw error;
        }
    };
}
