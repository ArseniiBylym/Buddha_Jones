import { ProjectBoardSpotVersion } from '.';
import { formatMoney } from 'accounting';
import { ProjectsDetailsActions, ProjectsVersionsActions } from 'actions';
import * as classNames from 'classnames';
import {
    Button,
    ButtonClose,
    ButtonEdit,
    ButtonIcon,
    ButtonLabel
    } from 'components/Button';
import { Paragraph, Tag } from 'components/Content';
import {
    DropdownContainer,
    OptionsList,
    OptionsListOptionProp,
    OptionsListValuePropType
    } from 'components/Form';
import { Col, Row } from 'components/Section';
import * as dateFormat from 'date-fns/format';
import upperFirst from 'lodash-es/upperFirst';
import { action, computed, observable, reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import AnimateHeight from 'react-animate-height';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotDetails } from 'types/projectDetails';
import { Tooltip } from '../../../../../components/Content';
import { IconArrowTopBlue, IconDropdownArrow } from '../../../../../components/Icons';
import { SpotHandler } from '../../../../../helpers/SpotHandler';
import { VersionDetails, VersionEditors } from '../../../../../types/projectDetails';
import { ProjectBoardSpotForm } from './ProjectBoardSpotForm';

// Styles
const s = require('./ProjectBoardSpot.css');

// Props
interface ProjectBoardSpotProps {
    userCanEditSpotCore: boolean;
    userCanViewV1InternalDeadline: boolean;
    userCanEditV1InternalDeadline: boolean;
    userCanViewV1ClientDeadline: boolean;
    userCanEditV1ClientDeadline: boolean;
    userCanViewFirstRevisionRate: boolean;
    userCanEditFirstRevisionRate: boolean;
    userCanViewNumberOfRevisionsAndVersions: boolean;
    userCanEditNumberOfRevisionsAndVersions: boolean;
    userCanViewGraphicsRevisions: boolean;
    userCanEditGraphicsRevisions: boolean;
    projectId: number;
    projectCampaignId: number;
    campaignId: number;
    spot: SpotDetails;
    showSeparator?: boolean;
    removeBottomPadding?: boolean;
}

// Types
type ProjectBoardSpotPropsTypes = ProjectBoardSpotProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class ProjectBoardSpot extends React.Component<ProjectBoardSpotPropsTypes, {}> {
    static get defaultProps(): Partial<ProjectBoardSpotProps> {
        return {
            showSeparator: true,
            removeBottomPadding: false,
        };
    }

    componentDidMount = () => {
        if (this.props.store!.projectsVersions.filterVersionStatus.name !== 'All status') {
            // this.handleVersionExpandOrCollapse();
            this.isVersionsVisible = true;
        }
    }

    public constructor(props: any) {
        super(props);

        reaction(
            () => this.filterVersionName,
            filterName => {
                if (filterName !== 'All status' && this.isVersionsVisible === false) {
                    this.isVersionsVisible = true;
                }
            }
            );
    }

    @computed
    private get filterVersionName() {
        return this.props.store!.projectsVersions.filterVersionStatus.name;
    }

    componentDidUpdate = (prevProps) => {
        // console.log('this.props', this.props.store!.projectsVersions.filterVersionStatus.name);
        // console.log('prevProps', prevProps.store!.projectsVersions.filterVersionStatus.name);


        // if (this.props.store!.projectsVersions.filterVersionStatus.name !== 'All status' &&
        //     this.isVersionsVisible === false) {
        //         this.isVersionsVisible = true;
        //     }
    }

    @observable private isVersionsVisible: boolean = false;
    @observable private isEditFormVisible: boolean = false;
    @observable private removingSpotStatus: 'none' | 'removing' | 'success' | 'error' = 'none';
    @observable private addingNewVersionStatus: 'none' | 'adding' | 'success' | 'error' = 'none';

    @computed
    private get spotVersionsAddedFlatIds(): number[] {
        return this.props.spot.versions.map(v => v.value);
    }

    @computed
    private get availableToAddVersions(): OptionsListOptionProp[] {
        if (!this.props.store) {
            return [];
        }

        const searchQuery = this.versionDropdownSearch.trim().toLowerCase();

        return [
            ...this.props.store.projectsVersions.allStandardVersions,
            ...(searchQuery.length > 0 ? this.props.store.projectsVersions.allCustomVersions : []),
        ].filter(version => version.value !== null && this.spotVersionsAddedFlatIds.indexOf(version.value) === -1);
    }

    @computed
    private get filteredAvailableToAddVersions(): OptionsListOptionProp[] {
        return this.versionDropdownSearchTrimmedLowerCase.length > 0
            ? this.availableToAddVersions
                  .filter(
                      v =>
                          v.label
                              .toLowerCase()
                              .trim()
                              .indexOf(this.versionDropdownSearchTrimmedLowerCase) !== -1
                  )
                  .sort((resultA, resultB) => {
                      const matchA = resultA.label.toLowerCase().trim() === this.versionDropdownSearchTrimmedLowerCase;
                      const matchB = resultB.label.toLowerCase().trim() === this.versionDropdownSearchTrimmedLowerCase;
                      return matchA !== matchB ? (matchA && !matchB ? -1 : 1) : 0;
                  })
            : this.availableToAddVersions;
    }

    @observable private versionDropdownSearch: string = '';

    @computed
    private get versionDropdownSearchTrimmedLowerCase(): string {
        return this.versionDropdownSearch.trim().toLowerCase();
    }

    private versionDropdown: DropdownContainer | null = null;

    private static getVersionNameButtonLabel(): ButtonLabel {
        return {
            text: 'Versions',
            size: 'large',
            color: 'black',
            onLeft: true,
        };
    }

    public render() {
        const { spot } = this.props;

        return (
            <Row
                id={`project-board-spot-id-${this.props.spot.id}`}
                removeMargins={true}
                className={classNames(s.campaignSpot, {
                    [s.editing]: this.isEditFormVisible,
                    [s.noBottomPadding]: this.props.removeBottomPadding,
                })}
            >
                <Col removeGutter={true}>
                    <Row className={s.campaignSpotHeader}>
                        <Col>
                            <h5>{spot.name}</h5>

                            {spot.justAdded && (
                                <Button
                                    onClick={this.handleSpotRemoval}
                                    className={classNames(s.removeSpotButton, s.rotate45)}
                                    label={{
                                        color: 'orange',
                                        size: 'small',
                                        text:
                                            this.removingSpotStatus === 'none'
                                                ? '(Remove)'
                                                : this.removingSpotStatus === 'error'
                                                ? '(Issue removing, try again)'
                                                : this.removingSpotStatus === 'removing'
                                                ? '(Removing...)'
                                                : '(Removed)',
                                    }}
                                />
                            )}

                            {this.props.userCanEditSpotCore && (
                                <>
                                    {this.isEditFormVisible && (
                                        <ButtonClose
                                            className={s.editSpotButton}
                                            float="right"
                                            onClick={this.handleSpotEdit}
                                            label={'Cancel'}
                                        />
                                    )}
                                    {!this.isEditFormVisible && (
                                        <ButtonEdit
                                            className={s.editSpotButton}
                                            float="right"
                                            onClick={this.handleSpotEdit}
                                            label={'Edit spot'}
                                        />
                                    )}
                                </>
                            )}
                        </Col>
                    </Row>

                    <Row className={s.spotDetailsContainer}>
                        <Col className={s.spotDetailsContainerWrapper}>
                            {!this.isEditFormVisible && (
                                <div className={s.spotDetailsLeft}>
                                    {spot.trtId && (
                                        <Paragraph className={s.noMargin}>
                                            <span>TRT: </span>
                                            {this.getSpotTRTNameById(spot.trtId)}
                                        </Paragraph>
                                    )}

                                    {spot.notes && spot.notes.trim() && (
                                        <Paragraph className={s.noMargin}>
                                            <span>Notes: </span>
                                            {spot.notes}
                                        </Paragraph>
                                    )}

                                    {this.props.userCanViewV1InternalDeadline && spot.v1InternalDeadline && (
                                        <Paragraph>
                                            <span>V.1 internal deadline: </span>
                                            <strong>{dateFormat(spot.v1InternalDeadline, 'MM/DD/YYYY')}</strong>
                                        </Paragraph>
                                    )}

                                    {this.props.userCanViewV1ClientDeadline && spot.v1ClientDeadline && (
                                        <Paragraph className={s.noMargin}>
                                            <span>V.1 studio deadline: </span>
                                            <strong>{dateFormat(spot.v1ClientDeadline, 'MM/DD/YYYY')}</strong>
                                        </Paragraph>
                                    )}
                                </div>
                            )}
                            {!this.isEditFormVisible && (
                                <div className={s.spotDetailsRight}>
                                    {this.props.userCanViewNumberOfRevisionsAndVersions &&
                                        spot.numberOfRevisions !== 0 && (
                                            <Paragraph>
                                                <span>Number of revisions: </span>
                                                <strong>
                                                    {(spot.numberOfRevisions === null
                                                        ? 'Unlimited'
                                                        : spot.numberOfRevisions) +
                                                        ', ' +
                                                        (!this.props.userCanViewGraphicsRevisions
                                                            ? ''
                                                            : spot.graphicsIncluded
                                                            ? 'graphics included'
                                                            : 'graphics not included')}
                                                </strong>
                                            </Paragraph>
                                        )}

                                    {this.props.userCanViewGraphicsRevisions &&
                                        !this.props.userCanViewNumberOfRevisionsAndVersions && (
                                            <Paragraph>
                                                <strong>
                                                    {spot.graphicsIncluded
                                                        ? 'Graphics included'
                                                        : 'Graphics not included'}
                                                </strong>
                                            </Paragraph>
                                        )}

                                    {this.props.userCanViewFirstRevisionRate && spot.billingType && (
                                        <Paragraph className={s.noMargin}>
                                            <span>Spot billing: </span>
                                            <strong>{SpotHandler.getSpotBillingTypeName(spot.billingType)}</strong>
                                        </Paragraph>
                                    )}

                                    {this.props.userCanViewFirstRevisionRate && spot.numberOfRevisions !== 0 && (
                                        <Paragraph className={s.noMargin}>
                                            <span>First stage rate: </span>
                                            <strong>
                                                {spot.firstRevisionCost === null
                                                    ? 'not specified'
                                                    : formatMoney(spot.firstRevisionCost)}
                                            </strong>
                                        </Paragraph>
                                    )}

                                    {this.props.userCanViewFirstRevisionRate && spot.billingNotes && (
                                        <Paragraph className={s.noMargin}>
                                            <span>Spot billing notes: </span>
                                            <strong>{spot.billingNotes}</strong>
                                        </Paragraph>
                                    )}

                                    {this.props.userCanViewNumberOfRevisionsAndVersions &&
                                        (spot.numberOfRevisions === null || spot.numberOfRevisions <= 0) && (
                                            <Paragraph>
                                                <span>No revisions included</span>
                                            </Paragraph>
                                        )}
                                </div>
                            )}

                            {this.isEditFormVisible && (
                                <ProjectBoardSpotForm
                                    onFormHide={this.handleEditHide}
                                    projectId={this.props.projectId}
                                    projectCampaignId={this.props.projectCampaignId}
                                    campaignId={this.props.campaignId}
                                    spotId={this.props.spot.id}
                                    removeGutter={true}
                                    userCanEditSpot={this.props.userCanEditSpotCore}
                                    userCanEditFirstStateCost={this.props.userCanEditFirstRevisionRate}
                                    userCanEditV1ClientDueDate={this.props.userCanEditV1ClientDeadline}
                                    userCanEditV1InternalDueDate={this.props.userCanEditV1InternalDeadline}
                                    userCanEditRevisionsAndVersions={this.props.userCanEditNumberOfRevisionsAndVersions}
                                    userCanEditGraphicsRevisions={this.props.userCanEditGraphicsRevisions}
                                />
                            )}
                        </Col>
                    </Row>

                    <Row className={s.campaignSpotVersions}>
                        {this.props.userCanViewNumberOfRevisionsAndVersions && spot.versions.length > 0 && (
                            <Col style={{ marginTop: '10px' }}>
                                <Button
                                    onClick={this.handleVersionExpandOrCollapse}
                                    label={ProjectBoardSpot.getVersionNameButtonLabel()}
                                    icon={this.getVersionNameButtonIcon()}
                                />
                            </Col>
                        )}
                        {this.props.userCanViewNumberOfRevisionsAndVersions &&
                            spot.versions.length === 0 &&
                            this.isEditFormVisible && (
                                <Col style={{ marginTop: '10px' }}>
                                    <Button
                                        onClick={this.handleVersionExpandOrCollapse}
                                        label={ProjectBoardSpot.getVersionNameButtonLabel()}
                                        icon={this.getVersionNameButtonIcon()}
                                    />
                                </Col>
                            )}
                    </Row>

                    {this.props.showSeparator && <hr className={s.endSeparator} />}

                    <AnimateHeight height={this.isVersionsVisible ? 'auto' : 0} duration={500}>
                        {this.props.userCanViewNumberOfRevisionsAndVersions &&
                            spot.versions
                                .filter((version: VersionDetails) => {
                                    return !version.hidden;
                                })
                                .map((version: VersionDetails) => (
                                    <Row
                                        key={`version-${version.value}-from-spot-${spot.id}`}
                                        className={s.campaignSpotVersions}
                                        justifyContent="flex-start"
                                    >
                                        <ProjectBoardSpotVersion
                                            key={`version-${version.value}-from-spot-${spot.id}`}
                                            projectId={this.props.projectId}
                                            projectCampaignId={this.props.projectCampaignId}
                                            spotId={spot.id}
                                            id={version.value}
                                            name={version.label}
                                            note={version.note}
                                            status={version.status}
                                            isEditFormVisible={this.isEditFormVisible}
                                        />

                                        {version.editors && version.editors.length > 0 && (
                                            <Tooltip text={this.spotVersionsEditors(version.editors)}>
                                                <Tag
                                                    className={s.versionName}
                                                    title="Editors:"
                                                    isTitleDim={true}
                                                    isBig={true}
                                                    otherLabels={[
                                                        { text: version.editors[0].name.substring(0, 8) + '...' },
                                                    ]}
                                                />
                                            </Tooltip>
                                        )}

                                        <hr className={s.separator} />
                                    </Row>
                                ))}

                        <Row className={s.campaignSpotVersions} justifyContent="flex-start">
                            {this.props.userCanViewNumberOfRevisionsAndVersions &&
                                spot.numberOfRevisions !== 0 &&
                                (spot.versions === null || spot.versions.length <= 0) && (
                                    <>
                                        <Tag
                                            className={s.versionName}
                                            title="No spot versions added"
                                            isTitleDim={true}
                                        />
                                        <hr />
                                    </>
                                )}

                            {this.isEditFormVisible && this.addingNewVersionStatus !== 'none' && (
                                <Tag
                                    className={s.versionName}
                                    isTitleBold={true}
                                    isBig={true}
                                    title={
                                        this.addingNewVersionStatus === 'adding'
                                            ? 'Adding...'
                                            : this.addingNewVersionStatus === 'error'
                                            ? 'Error, try again'
                                            : 'Added'
                                    }
                                />
                            )}

                            {this.isEditFormVisible && (
                                <div className={s.addVersion}>
                                    <DropdownContainer
                                        ref={this.referenceVersionDropdown}
                                        label="Add version"
                                        minWidth={256}
                                        align="right"
                                    >
                                        <OptionsList
                                            onChange={this.handleNewVersionAdd}
                                            noOptionsLabel="No existing versions"
                                            search={{
                                                autoFocus: true,
                                                useExternalAlgorithm: true,
                                                label: 'Search or create version',
                                                value: this.versionDropdownSearch,
                                                onChange: this.handleVersionSearchChange,
                                            }}
                                            label="Select version"
                                            directHint={
                                                this.versionDropdownSearchTrimmedLowerCase.length > 0
                                                    ? {
                                                          value: 'createCustomVersion',
                                                          label: 'Create version: ' + this.versionDropdownSearch.trim(),
                                                      }
                                                    : null
                                            }
                                            options={this.filteredAvailableToAddVersions}
                                        />
                                    </DropdownContainer>
                                </div>
                            )}
                        </Row>
                    </AnimateHeight>
                </Col>
            </Row>
        );
    }

    private getSpotTRTNameById(trtId: number): string {
        if (this.props.store && this.props.store.projectsCampaignsSpots.trtList.length > 0) {
            const trtItem = this.props.store.projectsCampaignsSpots.trtList.find(item => item.id === trtId);

            return trtItem ? trtItem.runtime : 'no trt selected';
        }

        return 'loading...';
    }

    @action
    private handleVersionExpandOrCollapse = () => {
        this.isVersionsVisible = !this.isVersionsVisible;
    };

    private getVersionNameButtonIcon(): ButtonIcon {
        return {
            size: 'small',
            background: this.isVersionsVisible ? 'none-alt' : 'white',
            element: this.isVersionsVisible ? (
                <IconArrowTopBlue width={10} height={16} />
            ) : (
                <IconDropdownArrow width={12} height={8} />
            ),
        };
    }

    private referenceVersionDropdown = (ref: DropdownContainer) => (this.versionDropdown = ref);

    private handleSpotRemoval = async () => {
        try {
            this.removingSpotStatus = 'removing';

            await ProjectsDetailsActions.removeSpotFromProjectCampaign(
                this.props.projectId,
                this.props.projectCampaignId,
                this.props.spot.id
            );
        } catch (error) {
            this.removingSpotStatus = 'error';
            throw error;
        }
    };

    private handleVersionSearchChange = (query: string) => {
        this.versionDropdownSearch = query;
    };

    private handleNewVersionAdd = async (option: { value: OptionsListValuePropType; label: string }) => {
        try {
            if (this.versionDropdown) {
                this.versionDropdown.closeDropdown();
            }

            this.addingNewVersionStatus = 'adding';

            let versionId: number = option.value as number;
            let versionName: string = option.label;
            const createNewVersion = option.value === 'createCustomVersion';
            if (createNewVersion) {
                versionName = this.versionDropdownSearch
                    .trim()
                    .split(' ')
                    .map(word => upperFirst(word))
                    .join(' ');
                const version = await ProjectsVersionsActions.createNewVersion(versionName, this.props.spot.id);
                versionId = version.id;
            }

            await ProjectsDetailsActions.addVersionToProjectCampaignSpot(
                this.props.projectId,
                this.props.projectCampaignId,
                this.props.spot.id,
                versionId,
                versionName,
                createNewVersion
            );

            this.addingNewVersionStatus = 'none';
        } catch (error) {
            this.addingNewVersionStatus = 'error';
            throw error;
        }
    };

    private handleSpotEdit = () => {
        this.isEditFormVisible = !this.isEditFormVisible;
    };

    private handleEditHide = () => {
        this.isEditFormVisible = false;
    };

    private spotVersionsEditors = (editors: VersionEditors[]): string => {
        let names: string[] = editors.map((editor: VersionEditors) => {
            return editor.name;
        });
        return names.join(', ');
    };
}
