import * as React from 'react';
import * as classNames from 'classnames';
import capitalize from 'lodash-es/capitalize';
import { observer, inject } from 'mobx-react';
import { Section, Row, Col, SectionElement } from '../Section';
import { computed, observable, action } from 'mobx';
import { ProjectPickerSelectionRequirementLabel } from '.';
import { Button } from '../Button';
import { ProjectPickerContent, ProjectPickerResult } from './ProjectPickerContent';
import { AppOnlyStoreState } from 'store/AllStores';
import { ProjectPermissionsActions } from 'actions';
import { UserPermissionKey } from 'types/projectPermissions';

// Styles
const s = require('./ProjectPicker.css');

type ProjectPickerLevels =
    | 'all'
    | 'project-campaign-spot'
    | 'project-campaign'
    | 'project'
    | 'campaign-spot-version'
    | null;

export enum ProjectPickerSections {
    project = 'project',
    projectCampaign = 'projectCampaign',
    spot = 'spot',
    version = 'version'
}

type ProjectPickerColumn = {
    section: ProjectPickerSections;
    isDisabled: boolean;
    classNames: string[];
    label: string;
};

export type ProjectPickerValues = {
    project: ProjectPickerGroupValues | null;
    projectCampaign: ProjectPickerGroupValues | null;
    spot: ProjectPickerGroupValues | null;
    version: ProjectPickerGroupValues | null;
    customerId: number | null;
};

export interface ProjectPickerGroupValues {
    id: number;
    name: string;
    campaignId?: number | null;
}

interface Props {
    onChange?: (values: ProjectPickerValues | null, type?: ProjectPickerSections | null) => void;
    title?: string;
    subTitle?: string;
    noSeparator?: boolean;
    show?: ProjectPickerLevels;
    requiredSelection?: ProjectPickerLevels;
    userCanCreateNew?: boolean;
    openOn?: ProjectPickerSections | null;
    openWithAutoFocus?: boolean;
    forUserId: number;
    readOnly?: boolean;
    value: ProjectPickerValues | null;
    headerElements?: Array<{
        element: JSX.Element;
        minWidth?: number;
        maxWidth?: number;
    }>;
}

declare type ComponentProps = Props & AppOnlyStoreState;

@inject('store')
@observer
export class ProjectPicker extends React.Component<ComponentProps, {}> {
    static get defaultProps(): Props {
        return {
            forUserId: 0,
            onChange: undefined,
            title: '',
            subTitle: '',
            noSeparator: false,
            show: 'all',
            requiredSelection: null,
            userCanCreateNew: false,
            openOn: null,
            openWithAutoFocus: false,
            readOnly: false,
            value: null,
            headerElements: [],
        };
    }

    private ENTRIES_PER_PAGE: number = 16;

    @observable private sectionOpen: ProjectPickerSections | null = null;

    @observable
    private search: {
        project: string;
        campaign: string;
        spot: string;
        version: string;
    } = {
        project: '',
        campaign: '',
        spot: '',
        version: '',
    };

    @computed
    private get openSectionSearch(): string {
        switch (this.sectionOpen) {
            case ProjectPickerSections.project:
                return this.search.project;
            case ProjectPickerSections.projectCampaign:
                return this.search.campaign;
            case  ProjectPickerSections.spot:
                return this.search.spot;
            case ProjectPickerSections.version:
                return this.search.version;
            default:
                return '';
        }
    }

    @computed
    private get subTitleLabel(): string {
        if (this.props.subTitle) {
            return this.props.subTitle;
        }

        switch (this.props.requiredSelection) {
            case 'all':
                if (this.props.show === 'project-campaign-spot') {
                    return ProjectPickerSelectionRequirementLabel.CampaignAndSpotAreRequired;
                } else if (this.props.show === 'project-campaign') {
                    return ProjectPickerSelectionRequirementLabel.ProjectAndCampaignAreRequired;
                } else if (this.props.show === 'project') {
                    return ProjectPickerSelectionRequirementLabel.ProjectIsRequired;
                }

                return ProjectPickerSelectionRequirementLabel.SpotAndVersionAreRequired;

            case 'campaign-spot-version':
                if (this.props.show === 'campaign-spot-version') {
                    return ProjectPickerSelectionRequirementLabel.SpotAndVersionAreRequired;
                } else if (this.props.show === 'project-campaign-spot') {
                    return ProjectPickerSelectionRequirementLabel.ProjectAndCampaignAreRequired;
                } else if (this.props.show === 'project-campaign') {
                    return ProjectPickerSelectionRequirementLabel.ProjectAndCampaignAreRequired;
                } else if (this.props.show === 'project') {
                    return ProjectPickerSelectionRequirementLabel.ProjectIsRequired;
                }

                return ProjectPickerSelectionRequirementLabel.SpotAndVersionAreRequired;

            case 'project-campaign-spot':
                if (this.props.show === 'project-campaign') {
                    return ProjectPickerSelectionRequirementLabel.ProjectAndCampaignAreRequired;
                } else if (this.props.show === 'project') {
                    return ProjectPickerSelectionRequirementLabel.ProjectIsRequired;
                } else if (this.props.show === 'campaign-spot-version') {
                    return ProjectPickerSelectionRequirementLabel.SpotAndVersionAreRequired;
                }

                return ProjectPickerSelectionRequirementLabel.CampaignAndSpotAreRequired;

            case 'project-campaign':
                if (this.props.show === 'project') {
                    return ProjectPickerSelectionRequirementLabel.ProjectIsRequired;
                }

                return ProjectPickerSelectionRequirementLabel.ProjectAndCampaignAreRequired;

            case 'project':
                return ProjectPickerSelectionRequirementLabel.ProjectIsRequired;

            default:
                return 'optional';
        }
    }

    @computed
    private get isVersionVisible(): boolean {
        return this.props.show === 'all' || this.props.show === 'campaign-spot-version';
    }

    @computed
    private get isSpotVisible(): boolean {
        return (
            this.props.show === 'all' ||
            this.props.show === 'campaign-spot-version' ||
            this.props.show === 'project-campaign-spot'
        );
    }

    @computed
    private get isCampaignVisible(): boolean {
        return (
            this.props.show === 'all' ||
            this.props.show === 'campaign-spot-version' ||
            this.props.show === 'project-campaign-spot' ||
            this.props.show === 'project-campaign'
        );
    }

    @computed
    private get isProjectVisible(): boolean {
        return (
            this.props.show === 'all' ||
            this.props.show === 'project-campaign-spot' ||
            this.props.show === 'project-campaign' ||
            this.props.show === 'project'
        );
    }

    @computed
    private get isVersionRequired(): boolean {
        return this.props.requiredSelection === 'all' || this.props.requiredSelection === 'campaign-spot-version';
    }

    @computed
    private get isSpotRequired(): boolean {
        return (
            this.props.requiredSelection === 'all' ||
            this.props.requiredSelection === 'campaign-spot-version' ||
            this.props.requiredSelection === 'project-campaign-spot'
        );
    }

    @computed
    private get isCampaignRequired(): boolean {
        return (
            this.props.requiredSelection === 'all' ||
            this.props.requiredSelection === 'campaign-spot-version' ||
            this.props.requiredSelection === 'project-campaign-spot' ||
            this.props.requiredSelection === 'project-campaign'
        );
    }

    @computed
    private get isProjectRequired(): boolean {
        return (
            this.isVersionRequired ||
            this.isSpotRequired ||
            this.isCampaignRequired ||
            this.props.requiredSelection === 'project'
        );
    }

    @computed
    private get areProjectPermissionsLoading(): boolean {
        return (
            this.props.store!.projectPermissions.loadingCount > 0 ||
            Object.keys(this.props.store!.projectPermissions.loggedInUserPermissions).length <= 0
        );
    }

    @computed
    private get columns(): ProjectPickerColumn[] {
        const cols: ProjectPickerColumn[] = [];

        if (this.isProjectVisible) {
            cols.push({
                section: ProjectPickerSections.project,
                isDisabled: false,
                classNames: this.getSectionButtonClassName(ProjectPickerSections.project),
                label: this.props.value && this.props.value.project ?
                    this.props.value.project.name :
                    'Project' + (this.isProjectRequired ? '' : ' (optional)'),
            });
        }

        if (this.isCampaignVisible) {
            cols.push({
                section: ProjectPickerSections.projectCampaign,
                isDisabled: Boolean(
                    this.props.value === null ||
                    (this.props.value && this.props.value.project === null)
                ),
                classNames: this.getSectionButtonClassName(ProjectPickerSections.projectCampaign),
                label: this.props.value && this.props.value.projectCampaign ?
                    this.props.value.projectCampaign.name :
                    'Campaign' + (this.isCampaignRequired ? '' : ' (optional)'),
            });
        }

        if (this.isSpotVisible) {
            cols.push({
                section: ProjectPickerSections.spot,
                isDisabled: Boolean(
                    this.props.value === null ||
                    (
                        (this.props.value && this.props.value.project === null) ||
                        (this.props.value && this.props.value.projectCampaign === null)
                    )
                ),
                classNames: this.getSectionButtonClassName(ProjectPickerSections.spot),
                label:
                    this.props.value && this.props.value.spot ?
                        this.props.value.spot.name :
                        'Spot' + (this.isSpotRequired ? '' : ' (optional)'),
            });
        }

        if (this.isVersionVisible) {
            cols.push({
                section: ProjectPickerSections.version,
                isDisabled: Boolean(
                    this.props.value === null ||
                    (
                        (this.props.value && this.props.value.project === null) ||
                        (this.props.value && this.props.value.projectCampaign === null) ||
                        (this.props.value && this.props.value.spot === null)
                    )
                ),
                classNames: this.getSectionButtonClassName(ProjectPickerSections.version),
                label: this.props.value && this.props.value.version
                    ? this.props.value.version.name
                    : 'Version' + (this.isVersionRequired ? '' : ' (optional)'),
            });
        }

        return cols;
    }

    @computed
    private get showClearValuesButton(): boolean {
        if (this.props.value) {
            return Boolean(
                this.isProjectVisible && this.props.value.project ||
                this.isCampaignVisible && this.props.value.projectCampaign ||
                this.isSpotVisible && this.props.value.spot ||
                this.isVersionVisible && this.props.value.version
            );
        }

        return false;
    }

    public componentDidMount() {
        const areProjectsOpenByDefaultAllowed: boolean = this.isProjectVisible;

        const areCampaignsOpenByDefaultAllowed: boolean = Boolean(
            areProjectsOpenByDefaultAllowed &&
            this.isCampaignVisible &&
            this.props.value &&
            this.props.value.project !== null
        );

        const areSpotsOpenByDefaultAllowed: boolean = Boolean(
            areCampaignsOpenByDefaultAllowed &&
            this.isSpotVisible &&
            this.props.value &&
            this.props.value.projectCampaign !== null
        );

        const areVersionsOpenByDefaultAllowed: boolean = Boolean(
            areSpotsOpenByDefaultAllowed &&
            this.isVersionVisible &&
            this.props.value &&
            this.props.value.spot !== null
        );

        if (this.props.openOn) {
            switch (this.props.openOn) {
                case ProjectPickerSections.version: {
                    if (areVersionsOpenByDefaultAllowed) {
                        this.sectionOpen = ProjectPickerSections.version;
                    } else if (areSpotsOpenByDefaultAllowed) {
                        this.sectionOpen = ProjectPickerSections.spot;
                    } else if (areCampaignsOpenByDefaultAllowed) {
                        this.sectionOpen = ProjectPickerSections.projectCampaign;
                    } else if (areProjectsOpenByDefaultAllowed) {
                        this.sectionOpen = ProjectPickerSections.project;
                    } else {
                        this.sectionOpen = null;
                    }

                    break;
                }

                case ProjectPickerSections.spot: {
                    if (areSpotsOpenByDefaultAllowed) {
                        this.sectionOpen = ProjectPickerSections.spot;
                    } else if (areCampaignsOpenByDefaultAllowed) {
                        this.sectionOpen = ProjectPickerSections.projectCampaign;
                    } else if (areProjectsOpenByDefaultAllowed) {
                        this.sectionOpen = ProjectPickerSections.project;
                    } else {
                        this.sectionOpen = null;
                    }

                    break;
                }

                case ProjectPickerSections.projectCampaign: {
                    if (areCampaignsOpenByDefaultAllowed) {
                        this.sectionOpen = ProjectPickerSections.projectCampaign;
                    } else if (areProjectsOpenByDefaultAllowed) {
                        this.sectionOpen = ProjectPickerSections.project;
                    } else {
                        this.sectionOpen = null;
                    }

                    break;
                }

                case ProjectPickerSections.project: {
                    if (areProjectsOpenByDefaultAllowed) {
                        this.sectionOpen = ProjectPickerSections.project;
                    } else {
                        this.sectionOpen = null;
                    }

                    break;
                }

                default:
                    this.sectionOpen = null;
                    break;
            }
        }

        if (this.props.store && this.props.store.user.data) {
            ProjectPermissionsActions.fetchLoggedInUserPermissions();
        }
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { projectsCampaignsSpots, projectPermissions } = this.props.store;

        return (
            <Section
                title={this.props.title}
                subTitle={this.getSectionSubtitle()}
                noSeparator={this.props.noSeparator}
                headerElements={this.getHeaderElementsArray()}
            >
                <Row removeGutter={true}>
                    {this.columns.map((col, colIndex) => (
                        <Col className="dots" key={col.section ? col.section : colIndex} size={1}>
                            <Button
                                onClick={this.handleOpeningSection(col.section)}
                                className={classNames(col.classNames)}
                                disabled={this.props.readOnly || col.isDisabled}
                                isInBox={true}
                                label={{
                                    text: col.label,
                                }}
                            />
                        </Col>
                    ))}
                </Row>

                <ProjectPickerContent
                    onResultPicked={this.handleResultPick}
                    onSearchQueryChange={this.handleSearchQueryChange}
                    onSectionClose={this.handleSectionClose}
                    entriesPerPage={this.ENTRIES_PER_PAGE}
                    readOnly={Boolean(this.props.readOnly)}
                    sectionOpen={this.sectionOpen}
                    forUserId={this.props.forUserId}
                    value={this.props.value}
                    searchQuery={this.openSectionSearch}
                    projects={projectsCampaignsSpots.projects}
                    campaigns={projectsCampaignsSpots.campaigns}
                    spots={projectsCampaignsSpots.spots}
                    versions={projectsCampaignsSpots.versions}
                    openWithAutoFocus={this.props.openWithAutoFocus!}
                    areProjectPermissionsLoading={this.areProjectPermissionsLoading}
                    userCanViewProjectName={
                        projectPermissions.loggedInUserPermissions[UserPermissionKey.ProjectName]
                            ? projectPermissions.loggedInUserPermissions[UserPermissionKey.ProjectName].canView
                            : false
                    }
                    userCanViewProjectCodeName={
                        projectPermissions.loggedInUserPermissions[UserPermissionKey.ProjectCodeName]
                            ? projectPermissions.loggedInUserPermissions[UserPermissionKey.ProjectCodeName].canView
                            : false
                    }
                />
            </Section>
        );
    }

    public clearSelectedValues = () => {
        if (this.props.onChange) {
            this.props.onChange(
                this.isProjectVisible
                    ? null
                    : this.isCampaignVisible && this.props.value && this.props.value.project
                    ? {
                        project: this.props.value.project,
                        projectCampaign: null,
                        spot: null,
                        version: null,
                        customerId: this.props.value.customerId,
                    }
                    : this.isSpotVisible && this.props.value && this.props.value.projectCampaign
                        ? {
                            project: this.props.value.project,
                            projectCampaign: this.props.value.projectCampaign,
                            spot: null,
                            version: null,
                            customerId: this.props.value.customerId,
                        }
                        : this.isVersionVisible && this.props.value && this.props.value.spot
                            ? {
                                project: this.props.value.project,
                                projectCampaign: this.props.value.projectCampaign,
                                spot: this.props.value.spot,
                                version: null,
                                customerId: this.props.value.customerId,
                            }
                            : null
            );
        }
    };

    private getSectionSubtitle(): string | undefined {
        if (!this.subTitleLabel) {
            return undefined;
        }

        return this.props.title && this.subTitleLabel ? this.subTitleLabel : capitalize(this.subTitleLabel);
    }

    private getHeaderElementsArray(): SectionElement[] {
        return [
            ...(this.props.headerElements || []),
            ...(
                this.showClearValuesButton ? [
                    {
                        element: (
                            <Button
                                onClick={this.handleClearingSelectedValues}
                                className={s.clearButton}
                                label={{
                                    text: 'Clear selection',
                                    size: 'small',
                                    color: 'orange',
                                }}
                            />
                        ),
                    },
                ] : []
            ),
        ];
    }

    private handleClearingSelectedValues = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.clearSelectedValues();
    };

    @action
    private handleOpeningSection = (section: ProjectPickerSections | null) => () => {
        this.sectionOpen = this.sectionOpen === section ? null : section;

        if (section === null) {
            this.handleSectionClose();
        }
    };

    private handleSearchQueryChange = (query: string) => {
        if (this.sectionOpen) {
            if (this.sectionOpen === ProjectPickerSections.project) {
                this.search.project = query;
            } else if (this.sectionOpen === ProjectPickerSections.projectCampaign) {
                this.search.campaign = query;
            } else if (this.sectionOpen === ProjectPickerSections.spot) {
                this.search.spot = query;
            } else if (this.sectionOpen === ProjectPickerSections.version) {
                this.search.version = query;
            }
        }
    };

    private handleSectionClose = () => {
        this.sectionOpen = null;
    };

    @action
    private handleResultPick = (result: ProjectPickerResult | null) => {
        if (this.props.onChange) {
            if (result === null) {
                this.sectionOpen = null;
            } else {
                switch (result.section) {
                    case ProjectPickerSections.project:
                        this.sectionOpen = this.isCampaignVisible ? ProjectPickerSections.projectCampaign : null;
                        break;

                    case ProjectPickerSections.projectCampaign:
                        this.sectionOpen = this.isSpotVisible ? ProjectPickerSections.spot : null;
                        break;

                    case ProjectPickerSections.spot:
                        this.sectionOpen = this.isVersionVisible ? ProjectPickerSections.version : null;
                        break;

                    case ProjectPickerSections.version:
                        this.sectionOpen = null;
                        break;

                    default:
                        this.sectionOpen = null;
                        break;
                }
            }

            const { value } = this.props;

            this.props.onChange(
                result === null
                    ? null
                    : {
                        project:
                            result.section === ProjectPickerSections.project
                                ? {
                                    id: result.id,
                                    name: result.name,
                                }
                                : value && value.project
                                ? value.project
                                : null,
                        projectCampaign:
                            result.section === ProjectPickerSections.projectCampaign
                                ? {
                                    id: result.id,
                                    name: result.name,
                                    campaignId: result.campaignId
                                }
                                : result.section === ProjectPickerSections.project
                                ? null
                                : value && value.projectCampaign
                                    ? value.projectCampaign
                                    : null,
                        spot:
                            result.section === ProjectPickerSections.spot
                                ? {
                                    id: result.id,
                                    name: result.name,
                                }
                                : result.section === ProjectPickerSections.project ||
                                result.section === ProjectPickerSections.projectCampaign
                                ? null
                                : value && value.spot
                                    ? value.spot
                                    : null,
                        version:
                            result.section === ProjectPickerSections.version
                                ? {
                                    id: result.id,
                                    name: result.name,
                                }
                                : result.section === ProjectPickerSections.project ||
                                result.section === ProjectPickerSections.projectCampaign ||
                                result.section === ProjectPickerSections.spot
                                ? null
                                : value && value.version
                                    ? value.version
                                    : null,
                        customerId: result.clientId,
                    },
                (result && result.section) ? result.section : null
            );
        }
    };

    private getSectionButtonClassName = (
        section: ProjectPickerSections | null,
        current: ProjectPickerSections | null = null
    ): string[] => {
        const color = [s.pickerSectionButton];

        if (section && this.props.value && this.props.value[section]) {
            color.push(s.pickerSectionButtonGreen);
        }

        if (current && current !== section) {
            color.push(s.pickerSectionButtonBlue);
        }

        return color;
    };
}
