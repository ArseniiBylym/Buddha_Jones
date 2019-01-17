import * as React from 'react';
import * as classNames from 'classnames';
import { observable, computed, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { SpotDetails } from 'types/projectDetails';
import { Section } from 'components/Section';
import { ButtonAdd, Button } from 'components/Button';
import { ProjectBoardSpot } from '../Spot';
import { ProjectBoardSpotForm } from '../Spot/ProjectBoardSpotForm';
import { AppOnlyStoreState } from 'store/AllStores';
import { UserPermissionKey, UserPermission } from 'types/projectPermissions';
import { Tag } from 'components/Content';

const zenscroll = require('zenscroll');

// Styles
const s = require('./ProjectBoardCampaignSpots.css');

// Props
interface ProjectBoardCampaignsSpotsProps {
    innerRef?: (ref: HTMLDivElement) => void;
    onExpansionToggle: () => void;
    userCanViewSpots: boolean;
    userCanCreateNewSpot: boolean;
    spotsAreExpanded: boolean;
    projectId: number;
    projectCampaignId: number;
    campaignId: number;
    spots: SpotDetails[];
    approvedByBilling?: boolean;
}

// Types
type ProjectBoardCampaignsSpotsPropsTypes = ProjectBoardCampaignsSpotsProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class ProjectBoardCampaignsSpots extends React.Component<ProjectBoardCampaignsSpotsPropsTypes, {}> {
    @observable private addingNewSpotFormVisible: boolean = false;
    @observable private visibleSpots: any[] = [];

    @action
    private addSpotToVisible = (spot) => {
        this.visibleSpots.push(spot);
    }

    @action
    private removeSpotFromVisible = (id) => {
        const spots = this.visibleSpots.filter(item => item.id !== id);
        this.visibleSpots = spots;
    }

    @action
    private clearAllSelectedSpots = () => {
        this.visibleSpots = [];
    }
    
    @action
    private spotVisibleToggleHandler = (spot) => {
        const matchedSpot = this.visibleSpots.find(item => item.id === spot.id);
        if (matchedSpot) {
            this.removeSpotFromVisible(spot.id);
        } else {
            this.addSpotToVisible(spot);
        }

    }

    @computed
    private get userPermissions(): { [key: string]: UserPermission } {
        if (this.props.store) {
            return this.props.store.projectPermissions.loggedInUserPermissions;
        }

        return {};
    }

    @computed
    private get userCanEditSpotCore(): boolean {
        if (this.userPermissions[UserPermissionKey.Spot]) {
            return this.userPermissions[UserPermissionKey.Spot].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewFirstRevisionRate(): boolean {
        if (this.userPermissions[UserPermissionKey.SpotFirstRevisionRate]) {
            return this.userPermissions[UserPermissionKey.SpotFirstRevisionRate].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditFirstRevisionRate(): boolean {
        if (this.userPermissions[UserPermissionKey.SpotFirstRevisionRate]) {
            return this.userPermissions[UserPermissionKey.SpotFirstRevisionRate].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewV1InternalDeadline(): boolean {
        if (this.userPermissions[UserPermissionKey.SpotInternalDueDate]) {
            return this.userPermissions[UserPermissionKey.SpotInternalDueDate].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditV1InternalDeadline(): boolean {
        if (this.userPermissions[UserPermissionKey.SpotInternalDueDate]) {
            return this.userPermissions[UserPermissionKey.SpotInternalDueDate].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewV1ClientDeadline(): boolean {
        if (this.userPermissions[UserPermissionKey.SpotClientDueDate]) {
            return this.userPermissions[UserPermissionKey.SpotClientDueDate].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditV1ClientDeadline(): boolean {
        if (this.userPermissions[UserPermissionKey.SpotClientDueDate]) {
            return this.userPermissions[UserPermissionKey.SpotClientDueDate].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewGraphicsRevisions(): boolean {
        if (this.userPermissions[UserPermissionKey.SpotGraphicsRevision]) {
            return this.userPermissions[UserPermissionKey.SpotGraphicsRevision].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditGraphicsRevisions(): boolean {
        if (this.userPermissions[UserPermissionKey.SpotGraphicsRevision]) {
            return this.userPermissions[UserPermissionKey.SpotGraphicsRevision].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewNumberOfRevisionsAndVersions(): boolean {
        if (this.userPermissions[UserPermissionKey.SpotRevision]) {
            return this.userPermissions[UserPermissionKey.SpotRevision].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditNumberOfRevisionsAndVersions(): boolean {
        if (this.userPermissions[UserPermissionKey.SpotRevision]) {
            return this.userPermissions[UserPermissionKey.SpotRevision].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get spotsFromColumn1(): SpotDetails[] {
        return this.props.spots
            .filter((spot: SpotDetails) => {
                return !spot.hidden;
            });
            // .filter((_spot, spotIndex) => {
            //         return spotIndex % 2 <= 0;
            //     }
            // );
    }

    // @computed
    // private get spotsFromColumn2(): SpotDetails[] {
    //     return this.props.spots
    //         .filter((spot: SpotDetails) => {
    //             return !spot.hidden;
    //         })
    //         .filter((_spot, spotIndex) => {
    //                 return spotIndex % 2 > 0;
    //             }
    //         );
    // }

    private spotForm: HTMLDivElement | null = null;

    public render() {
        return this.props.userCanViewSpots ? (
            <Section
                innerRef={this.referenceSpotsContainer}
                className={s.section}
                noSeparator={false}
                title="Spots"
                headerElements={
                    this.props.spots.length > 0
                        ? [
                            {
                                key: 'toggle-expansion-button',
                                element: (
                                    <Button
                                        onClick={this.handleToggleSpotsExpansion}
                                        className={s.spotsExpansionToggleButton}
                                        label={{
                                            size: 'small',
                                            color: this.props.spotsAreExpanded ? 'black' : 'blue',
                                            text: this.props.spotsAreExpanded ? 'Hide details' : 'Show details',
                                        }}
                                    />
                                ),
                            },
                        ]
                        : this.props.userCanCreateNewSpot
                        ? [
                            {
                                key: 'create-new-spot-button',
                                element: this.renderSpotNewButton('none'),
                            },
                        ]
                        : []
                }
            >
                {this.props.spotsAreExpanded ? this.renderExpandedSpots() : this.renderCollapsedSpots()}
               
            </Section>
        ) : null;
    }

    private getVisibleSpots = () => {
        if (!this.visibleSpots || this.visibleSpots.length === 0) {
            return null;
        }
        return this.visibleSpots.map((spot, spotIndex) => 
            this.renderSpot(spot, spotIndex + 1 < this.spotsFromColumn1.length, false)
        );

        // {this.spotsFromColumn1.map((spot, spotIndex) =>
        //     this.renderSpot(spot, spotIndex + 1 < this.spotsFromColumn1.length, false)
        // )}
    }

    private renderCollapsedSpots() {
        return (
            <React.Fragment>
                <div className={s.spotsInlineList}>
                    {this.renderSpotsList()}
                    {this.props.spots.length <= 0 && <Tag className={s.spotName} isBig={true} title="No spots"/>}
                </div>
                {this.getVisibleSpots()}
                {this.props.userCanCreateNewSpot && this.props.spots.length > 0
                    ? this.renderSpotNewButton('small')
                    : null}
            </React.Fragment>
        );
    }

    private renderExpandedSpots() {
        return (
            <div className={s.spotsContainer}>
                <div className={s.spotsColumn3}>
                    {this.spotsFromColumn1.map((spot, spotIndex) =>
                        this.renderSpot(spot, spotIndex + 1 < this.spotsFromColumn1.length, false)
                    )}
                    {(this.props.userCanCreateNewSpot &&
                        this.addingNewSpotFormVisible && (
                            <div className={s.createNewSpotFormContainer}>
                                <ProjectBoardSpotForm
                                    innerRef={this.referenceSpotForm}
                                    onFormHide={this.handleNewSpotFormHide}
                                    projectId={this.props.projectId}
                                    projectCampaignId={this.props.projectCampaignId}
                                    campaignId={this.props.campaignId}
                                    removeGutter={true}
                                    showTopSeparator={false}
                                    userCanEditSpot={this.userCanEditSpotCore}
                                    userCanEditFirstStateCost={this.userCanEditFirstRevisionRate}
                                    userCanEditV1ClientDueDate={this.userCanEditV1ClientDeadline}
                                    userCanEditV1InternalDueDate={this.userCanEditV1InternalDeadline}
                                    userCanEditRevisionsAndVersions={this.userCanEditNumberOfRevisionsAndVersions}
                                    userCanEditGraphicsRevisions={this.userCanEditGraphicsRevisions}
                                />
                            </div>
                        )) ||
                    (this.props.userCanCreateNewSpot && this.props.spots.length > 0
                        ? this.renderSpotNewButton('regular')
                        : null)}
                </div>
            </div>
        );
    }

    private renderSpot(spot: SpotDetails, showSeparator: boolean, removeBottomPadding: boolean) {
        return (
            <ProjectBoardSpot
                key={spot.id}
                projectId={this.props.projectId}
                projectCampaignId={this.props.projectCampaignId}
                campaignId={this.props.campaignId}
                spot={spot}
                showSeparator={showSeparator}
                removeBottomPadding={removeBottomPadding}
                userCanEditSpotCore={this.userCanEditSpotCore}
                userCanViewV1InternalDeadline={this.userCanViewV1InternalDeadline}
                userCanEditV1InternalDeadline={this.userCanEditV1InternalDeadline}
                userCanViewV1ClientDeadline={this.userCanViewV1ClientDeadline}
                userCanEditV1ClientDeadline={this.userCanEditV1ClientDeadline}
                userCanViewFirstRevisionRate={this.userCanViewFirstRevisionRate}
                userCanEditFirstRevisionRate={this.userCanEditFirstRevisionRate}
                userCanViewNumberOfRevisionsAndVersions={this.userCanViewNumberOfRevisionsAndVersions}
                userCanEditNumberOfRevisionsAndVersions={this.userCanEditNumberOfRevisionsAndVersions}
                userCanViewGraphicsRevisions={this.userCanViewGraphicsRevisions}
                userCanEditGraphicsRevisions={this.userCanEditGraphicsRevisions}
            />
        );
    }

    private renderSpotNewButton(padding: 'none' | 'small' | 'regular' = 'regular') {
        return (
            <div
                className={classNames(s.campaignAddSpot, {
                    [s.smallPadding]: padding === 'small',
                    [s.noPadding]: padding === 'none',
                })}
            >
                <ButtonAdd
                    onClick={this.handleNewSpotFormToggle}
                    className={classNames(s.campaignAddSpotButton, {
                        [s.rotate45]: this.addingNewSpotFormVisible,
                        [s.disabled]: this.props.approvedByBilling === false,
                    })}
                    label={this.addingNewSpotFormVisible ? 'Cancel adding new spot' : 'Add new spot'}
                    labelColor={this.addingNewSpotFormVisible ? 'orange' : 'blue'}
                    labelOnLeft={true}
                />
            </div>
        );
    }

    private referenceSpotsContainer = (ref: HTMLDivElement) => {
        if (this.props.innerRef) {
            this.props.innerRef(ref);
        }
    };

    private referenceSpotForm = (ref: HTMLDivElement) => (this.spotForm = ref);

    private handleToggleSpotsExpansion = () => {
        if (this.props.onExpansionToggle) {
            this.props.onExpansionToggle();
            this.clearAllSelectedSpots();
        }
    };

    private spotClickHandler = (spot: any) => () => {
        this.spotVisibleToggleHandler(spot);
    }

    // private handleExpandSpotsFromSpotClick = (spotId: number) => () => {
    //     if (this.props.onExpansionToggle) {
    //         this.props.onExpansionToggle();
    //     }

    //     setTimeout(() => {
    //         const spot = document.getElementById(`project-board-spot-id-${spotId}`);
    //         if (spot) {
    //             zenscroll.intoView(spot);
    //         }
    //     }, 128);
    // };

    private handleNewSpotFormToggle = () => {
        if (this.props.approvedByBilling === false ) {
            return;
        }
        if (this.addingNewSpotFormVisible) {
            this.addingNewSpotFormVisible = false;
        } else {
            this.addingNewSpotFormVisible = true;

            if (!this.props.spotsAreExpanded) {
                this.props.onExpansionToggle();

                setTimeout(() => {
                    if (this.spotForm) {
                        zenscroll.to(this.spotForm);
                    }
                }, 128);
            }
        }
    };

    private handleNewSpotFormHide = () => {
        this.addingNewSpotFormVisible = false;
    };

    private setClassName = (id) => {
        const isSpotInVisibleList = this.visibleSpots.find(item => item.id === id);
        return isSpotInVisibleList ? s.spotNameActive : s.spotName;
    }

    private renderSpotsList = (): JSX.Element[] => {
        let spotsList: SpotDetails[] = this.props.spots;
        return spotsList
            .filter((spot: SpotDetails) => {
                return !spot.hidden;
            })
            .map((spot: SpotDetails) => {
                    return (
                        <Tag
                            key={spot.id}
                            isBig={true}
                            title={spot.name}
                            className={classNames(this.setClassName(spot.id))}
                            onTagClick={this.spotClickHandler(spot)}
                        />
                    );
                }
            );
    };
}
