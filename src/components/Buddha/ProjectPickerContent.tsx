import * as React from 'react';
import * as classNames from 'classnames';
import AnimateHeight from 'react-animate-height';
import debounce from 'lodash-es/debounce';
import { observer } from 'mobx-react';
import { ProjectPickerSections, ProjectPickerValues } from '.';
import { action, computed, observable, reaction } from 'mobx';
import { Col, Row } from '../Section';
import { ProjectsCampaignsSpotsActions } from 'actions';
import { LoadingShade, LoadingSpinner } from '../Loaders';
import {
    CampaignResult,
    CampaignsResult,
    CampaignsResultsEntry,
    ProjectResult,
    ProjectsResult,
    ProjectsResultsEntry,
    SpotResult,
    SpotsResult,
    SpotsResultsEntry, TRTItem,
    VersionResult,
    VersionsResult,
    VersionsResultsEntry,
} from 'types/projectsCampaignsSpots';
import { Pagination } from '../Pagination';
import { InputSearch } from '../Form';
import { Button, ButtonClose } from '../Button';
import { truncate } from 'lodash-es';

// Styles
const s = require('./ProjectPicker.css');

export interface ProjectPickerResult {
    section: ProjectPickerSections;
    id: number;
    campaignId: number | null;
    name: string;
    clientId: number | null;
    clientName: string | null;
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
}

declare type ProjectPickerList = ProjectsResult | CampaignsResult | SpotsResult | VersionsResult | null;

@observer
export class ProjectPickerContent extends React.Component<Props, {}> {
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

    constructor(props: Props) {
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

    public componentWillReceiveProps(nextProps: Props) {
        if (nextProps.sectionOpen && this.props.value !== nextProps.value) {
            this.dropPaginator();
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
            this.dropPaginator();
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
            this.dropPaginator();
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
                                <LoadingSpinner size={48} color="#5A4D3F"/>
                            </LoadingShade>
                        )}
                    </Col>
                </Row>
            </AnimateHeight>
        );
    }

    private getCurrentResult(): ProjectPickerList {
        const { value, forUserId } = this.props;

        switch (this.props.sectionOpen) {
            case ProjectPickerSections.project: {
                return ProjectsCampaignsSpotsActions.getProjectResult(forUserId, this.search, this.resultsPage);
            }

            case ProjectPickerSections.projectCampaign: {
                const id: number | null = value && value.project ? value.project.id : null;

                return ProjectsCampaignsSpotsActions.getCampaignResult(forUserId, id, this.search, this.resultsPage);
            }

            case ProjectPickerSections.spot: {
                let ids: any = null;

                if (value && (value.project || value.projectCampaign)) {
                    const projectId: number | null = value.project ? value.project.id : null;
                    const projectCampaignId: number | null = value.projectCampaign && value.projectCampaign.campaignId ?
                        value.projectCampaign.campaignId : null;

                    ids = {
                        projectId,
                        projectCampaignId,
                    };
                }

                return ProjectsCampaignsSpotsActions.getSpotResult(forUserId, ids, this.search, this.resultsPage);
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

                return ProjectsCampaignsSpotsActions.getVersionResult(forUserId, ids, this.search, this.resultsPage);
            }

            default:
                return null;
        }
    }

    @action
    private dropPaginator = (): void => {
        this.resultsPage = 1;
    };

    private getSpotTRTNameById(trtId: number): string {
        if (this.props.trtList && this.props.trtList.length > 0) {
            const trtItem = this.props.trtList.find((item) => item.id === trtId);

            return trtItem ? trtItem.runtime : '';

        }

        return '';
    }

    private renderEntries(
        currentResults: ProjectsResult | CampaignsResult | SpotsResult | VersionsResult | null
    ): JSX.Element[] {
        let entries: Array<{
            section: ProjectPickerSections;
            id: number;
            campaignId?: number;
            name: string;
            clientId: number | null;
            clientName: string | null;
            trtId?: number | null;
        }> = [];

        if (currentResults) {
            if (this.props.sectionOpen === ProjectPickerSections.project) {
                const results = currentResults.results as ProjectsResultsEntry[];

                entries = results.map(result => {
                    let name = '';

                    if (this.props.userCanViewProjectCodeName && this.props.userCanViewProjectName) {
                        name = result.projectCode
                            ? `(${result.projectCode})` + (result.projectName ? ' - ' + result.projectName : '')
                            : result.projectName ? result.projectName : '';
                    } else {
                        name = result.projectCode ? result.projectCode : result.projectName ? result.projectName : '';
                    }

                    return {
                        section: ProjectPickerSections.project,
                        id: result.id,
                        name: name,
                        clientId: result.customerId,
                        clientName: result.customerName,
                    };
                });
            } else if (this.props.sectionOpen === ProjectPickerSections.projectCampaign) {
                const results = currentResults.results as CampaignsResultsEntry[];

                entries = results.map(result => {
                    return {
                        section: ProjectPickerSections.projectCampaign,
                        id: result.id,
                        campaignId: result.campaignId,
                        name:
                            (result.campaignName || '') +
                            (result.note && result.note !== result.campaignName
                                ? ' - ' + truncate(result.note, { length: 32 })
                                : ''),
                        clientId: null,
                        clientName: null,
                    };
                });
            } else if (this.props.sectionOpen === ProjectPickerSections.spot) {
                const results = currentResults.results as SpotsResultsEntry[];

                entries = results.map(result => {
                    return {
                        section: ProjectPickerSections.spot,
                        id: result.id,
                        name: result.spotName,
                        clientId: null,
                        clientName: null,
                        trtId: result.trtId
                    };
                });
            } else if (this.props.sectionOpen === ProjectPickerSections.version) {
                const results = currentResults.results as VersionsResultsEntry[];

                entries = results.map(result => {
                    return {
                        section: ProjectPickerSections.version,
                        id: result.id,
                        name: result.versionName,
                        clientId: null,
                        clientName: null,
                    };
                });
            }
        }

        return entries.map((result, index: number) => {
            let spotName: string = result.name;

            if (result.trtId) {
                spotName += ` (${this.getSpotTRTNameById(result.trtId)})`;
            }

            return (
                <li key={`li-${result.id}-${index}`}>
                    <Button
                        onClick={this.handleResultPick(
                            result.section,
                            result.id,
                            spotName,
                            result.clientId,
                            result.clientName,
                            result.campaignId ? result.campaignId : null
                        )}
                        label={{
                            text: spotName,
                            size: 'small',
                            color: 'blue',
                            onLeft: true,
                        }}
                    />
                </li>
            );
        });
    }

    private handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onSearchQueryChange(e.target.value);
    };

    private handlePickerCollapse = () => {
        this.props.onSectionClose();
    };

    private handleResultPick = (
        section: ProjectPickerSections,
        id: number,
        name: string,
        clientId: number | null,
        clientName: string | null,
        campaignId: number | null
    ) => () => {
        this.props.onResultPicked({
            section,
            id,
            campaignId,
            name,
            clientId,
            clientName,
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
                                projectCampaignId: value.projectCampaign && value.projectCampaign.campaignId ? value.projectCampaign.campaignId : null,
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
