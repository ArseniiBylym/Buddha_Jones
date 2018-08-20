import * as React from 'react';
import * as classNames from 'classnames';
import capitalize from 'lodash-es/capitalize';
import { observer, inject } from 'mobx-react';
import { Section, Row, Col } from '../Section';
import { computed, observable, action } from 'mobx';
import { ProjectPickerSelectionRequirementLabel } from '.';
import { Button } from '../Button';
import { ProjectPickerContent, ProjectPickerResult } from './ProjectPickerContent';
import { AppOnlyStoreState } from 'store/AllStores';
import { ProjectPermissionsActions } from 'actions';
import { UserPermissionKey } from 'types/projectPermissions';

// Styles
const s = require('./ProjectPicker.css');

// Types
type ProjectPickerPropsTypes = ProjectPickerProps & AppOnlyStoreState;
type ProjectPickerLevels =
    | 'all'
    | 'project-campaign-spot'
    | 'project-campaign'
    | 'project'
    | 'campaign-spot-version'
    | null;
export type ProjectPickerSections = 'project' | 'projectCampaign' | 'spot' | 'version';
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
}

// Props
interface ProjectPickerProps {
    onChange?: (values: ProjectPickerValues | null) => void;
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

// Component
@inject('store')
@observer
export class ProjectPicker extends React.Component<ProjectPickerPropsTypes, {}> {
    static get defaultProps(): ProjectPickerProps {
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
        return this.sectionOpen === 'project'
            ? this.search.project
            : this.sectionOpen === 'projectCampaign'
                ? this.search.campaign
                : this.sectionOpen === 'spot'
                    ? this.search.spot
                    : this.sectionOpen === 'version'
                        ? this.search.version
                        : '';
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
                section: 'project',
                isDisabled: false,
                classNames: this.getSectionButtonClassName('project'),
                label:
                    this.props.value && this.props.value.project
                        ? this.props.value.project.name
                        : 'Project' + (this.isProjectRequired ? '' : ' (optional)'),
            });
        }

        if (this.isCampaignVisible) {
            cols.push({
                section: 'projectCampaign',
                isDisabled:
                    this.props.value === null || (this.props.value && this.props.value.project === null) ? true : false,
                classNames: this.getSectionButtonClassName('projectCampaign'),
                label:
                    this.props.value && this.props.value.projectCampaign
                        ? this.props.value.projectCampaign.name
                        : 'Campaign' + (this.isCampaignRequired ? '' : ' (optional)'),
            });
        }

        if (this.isSpotVisible) {
            cols.push({
                section: 'spot',
                isDisabled:
                    this.props.value === null ||
                    ((this.props.value && this.props.value.project === null) ||
                        (this.props.value && this.props.value.projectCampaign === null))
                        ? true
                        : false,
                classNames: this.getSectionButtonClassName('spot'),
                label:
                    this.props.value && this.props.value.spot
                        ? this.props.value.spot.name
                        : 'Spot' + (this.isSpotRequired ? '' : ' (optional)'),
            });
        }

        if (this.isVersionVisible) {
            cols.push({
                section: 'version',
                isDisabled:
                    this.props.value === null ||
                    ((this.props.value && this.props.value.project === null) ||
                        (this.props.value && this.props.value.projectCampaign === null) ||
                        (this.props.value && this.props.value.spot === null))
                        ? true
                        : false,
                classNames: this.getSectionButtonClassName('version'),
                label:
                    this.props.value && this.props.value.version
                        ? this.props.value.version.name
                        : 'Version' + (this.isVersionRequired ? '' : ' (optional)'),
            });
        }

        return cols;
    }

    @computed
    private get showClearValuesButton(): boolean {
        if (this.props.value) {
            return this.isProjectVisible && this.props.value.project
                ? true
                : this.isCampaignVisible && this.props.value.projectCampaign
                    ? true
                    : this.isSpotVisible && this.props.value.spot
                        ? true
                        : this.isVersionVisible && this.props.value.version
                            ? true
                            : false;
        }

        return false;
    }

    public componentDidMount() {
        const areProjectsOpenByDefaultAllowed: boolean = this.isProjectVisible ? true : false;
        const areCampaignsOpenByDefaultAllowed: boolean =
            areProjectsOpenByDefaultAllowed &&
            this.isCampaignVisible &&
            this.props.value &&
            this.props.value.project !== null
                ? true
                : false;
        const areSpotsOpenByDefaultAllowed: boolean =
            areCampaignsOpenByDefaultAllowed &&
            this.isSpotVisible &&
            this.props.value &&
            this.props.value.projectCampaign !== null
                ? true
                : false;
        const areVersionsOpenByDefaultAllowed: boolean =
            areSpotsOpenByDefaultAllowed && this.isVersionVisible && this.props.value && this.props.value.spot !== null
                ? true
                : false;

        if (this.props.openOn) {
            this.sectionOpen =
                this.props.openOn === 'version'
                    ? areVersionsOpenByDefaultAllowed
                        ? 'version'
                        : areSpotsOpenByDefaultAllowed
                            ? 'spot'
                            : areCampaignsOpenByDefaultAllowed
                                ? 'projectCampaign'
                                : areProjectsOpenByDefaultAllowed
                                    ? 'project'
                                    : null
                    : this.props.openOn === 'spot'
                        ? areSpotsOpenByDefaultAllowed
                            ? 'spot'
                            : areCampaignsOpenByDefaultAllowed
                                ? 'projectCampaign'
                                : areProjectsOpenByDefaultAllowed
                                    ? 'project'
                                    : null
                        : this.props.openOn === 'projectCampaign'
                            ? areCampaignsOpenByDefaultAllowed
                                ? 'projectCampaign'
                                : areProjectsOpenByDefaultAllowed
                                    ? 'project'
                                    : null
                            : this.props.openOn === 'project'
                                ? areProjectsOpenByDefaultAllowed
                                    ? 'project'
                                    : null
                                : null;
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
                subTitle={
                    this.subTitleLabel
                        ? this.props.title && this.subTitleLabel
                            ? this.subTitleLabel
                            : capitalize(this.subTitleLabel)
                        : undefined
                }
                noSeparator={this.props.noSeparator}
                headerElements={[
                    ...(this.props.headerElements || []),
                    ...(this.showClearValuesButton
                        ? [
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
                          ]
                        : []),
                ]}
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
                    readOnly={this.props.readOnly ? true : false}
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

    private handleClearingSelectedValues = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.clearSelectedValues();
    };

    @action
    private handleOpeningSection = (section: ProjectPickerSections | null) => (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        this.sectionOpen = this.sectionOpen === section ? null : section;

        if (section === null) {
            this.handleSectionClose();
        }
    };

    private handleSearchQueryChange = (query: string) => {
        if (this.sectionOpen) {
            if (this.sectionOpen === 'project') {
                this.search.project = query;
            } else if (this.sectionOpen === 'projectCampaign') {
                this.search.campaign = query;
            } else if (this.sectionOpen === 'spot') {
                this.search.spot = query;
            } else if (this.sectionOpen === 'version') {
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
                if (result && result.section === 'project') {
                    this.sectionOpen = this.isCampaignVisible ? 'projectCampaign' : null;
                } else if (result && result.section === 'projectCampaign') {
                    this.sectionOpen = this.isSpotVisible ? 'spot' : null;
                } else if (result && result.section === 'spot') {
                    this.sectionOpen = this.isVersionVisible ? 'version' : null;
                } else if (result && result.section === 'version') {
                    this.sectionOpen = null;
                }
            }

            const { value } = this.props;

            this.props.onChange(
                result === null
                    ? null
                    : {
                          project:
                              result.section === 'project'
                                  ? {
                                        id: result.id,
                                        name: result.name,
                                    }
                                  : value && value.project
                                      ? value.project
                                      : null,
                          projectCampaign:
                              result.section === 'projectCampaign'
                                  ? {
                                        id: result.id,
                                        name: result.name,
                                    }
                                  : result.section === 'project'
                                      ? null
                                      : value && value.projectCampaign
                                          ? value.projectCampaign
                                          : null,
                          spot:
                              result.section === 'spot'
                                  ? {
                                        id: result.id,
                                        name: result.name,
                                    }
                                  : result.section === 'project' || result.section === 'projectCampaign'
                                      ? null
                                      : value && value.spot
                                          ? value.spot
                                          : null,
                          version:
                              result.section === 'version'
                                  ? {
                                        id: result.id,
                                        name: result.name,
                                    }
                                  : result.section === 'project' ||
                                    result.section === 'projectCampaign' ||
                                    result.section === 'spot'
                                      ? null
                                      : value && value.version
                                          ? value.version
                                          : null,
                          customerId: result.clientId,
                      }
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
