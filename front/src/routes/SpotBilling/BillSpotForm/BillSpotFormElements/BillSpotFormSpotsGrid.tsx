import { ButtonEdit } from 'components/Button';
import { Paragraph } from 'components/Content';
import { Card, Section } from 'components/Section';
import { DateHandler } from 'helpers/DateHandler';
import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { ActivityInBillWithBaseTime, BillTimeEntry, SpotBillFormSpot } from 'types/spotBilling';
import { BillSpotFormSpotsGridTable } from './BillSpotFormSpotsGridTable';
import { BillSpotFormSpotsToAdd } from './BillSpotFormSpotsToAdd';
import {
    BillSpotFormProjectCampaignActivities,
    BillActivitiesSectionSelectionTotal,
    BillTimeEntriesSelectionTotals,
} from '.';

const s = require('./BillSpotFormSpotsGrid.css');

interface Props extends AppOnlyStoreState {
    spots: SpotBillFormSpot[];
    unbilledProjectTimeEntries: BillTimeEntry[];
    unbilledProjectCampaignTimeEntries: BillTimeEntry[];
    editable: boolean;
    campaignName: string;
    projectCampaignName: string | null;
    projectCampaignId: number;
}

@inject('store')
@observer
export class BillSpotFormSpotsGrid extends React.Component<Props, {}> {
    @observable private areSpotsInEditMode: boolean = false;

    @computed private get unbilledProjectTimeEntriesTotalMinutes(): number {
        return this.calculateTotalMinutesOfTimeEntries(this.props.unbilledProjectTimeEntries);
    }

    @computed private get unbilledProjectNonBillableTimeEntriesTotalMinutes(): number {
        return this.calculateTotalMinutesOfTimeEntries(
            this.props.unbilledProjectTimeEntries.filter(e => e.activityIsBillable === false)
        );
    }

    @computed private get unbilledProjectCampaignTimeEntriesTotalMinutes(): number {
        return this.calculateTotalMinutesOfTimeEntries(this.props.unbilledProjectCampaignTimeEntries);
    }

    @computed private get unbilledProjectCampaignNonBillableTimeEntriesTotalMinutes(): number {
        return this.calculateTotalMinutesOfTimeEntries(
            this.props.unbilledProjectCampaignTimeEntries.filter(e => e.activityIsBillable === false)
        );
    }

    @computed private get remainingSpotsToBill(): SpotBillFormSpot[] {
        const spotsAddedToBill: number[] =
            this.props.store && this.props.store.spotToBillForm.spotsAddedToBill
                ? this.props.store.spotToBillForm.spotsAddedToBill
                : [];

        return this.props.spots.filter(spot => spotsAddedToBill.findIndex(spotId => spotId === spot.spotId) === -1);
    }

    @computed private get selectedProjectEntries(): ActivityInBillWithBaseTime[] {
        return this.props.unbilledProjectTimeEntries.reduce((activities: ActivityInBillWithBaseTime[], timeEntry) => {
            const inSelection = this.props.store!.spotToBillForm.selectedActivitiesIds.indexOf(timeEntry.timeEntryId);
            if (inSelection !== -1) {
                const selection = this.props.store!.spotToBillForm.selectedActivities[inSelection];

                activities.push({
                    ...selection,
                    baseHoursInMinutes: DateHandler.convertHoursDotMinutesToTotalMinutes(timeEntry.duration),
                });
            }

            return activities;
        }, []);
    }

    @computed private get selectedProjectCampaignEntries(): ActivityInBillWithBaseTime[] {
        return this.props.unbilledProjectCampaignTimeEntries.reduce(
            (activities: ActivityInBillWithBaseTime[], timeEntry) => {
                const inSelection = this.props.store!.spotToBillForm.selectedActivitiesIds.indexOf(
                    timeEntry.timeEntryId
                );
                if (inSelection !== -1) {
                    const selection = this.props.store!.spotToBillForm.selectedActivities[inSelection];

                    activities.push({
                        ...selection,
                        baseHoursInMinutes: DateHandler.convertHoursDotMinutesToTotalMinutes(timeEntry.duration),
                    });
                }

                return activities;
            },
            []
        );
    }

    @computed private get selectedEntriesHoursDifference(): {
        project: BillTimeEntriesSelectionTotals;
        projectCampaign: BillTimeEntriesSelectionTotals;
    } {
        let base: number = 0;
        let adjusted: number = 0;

        this.selectedProjectEntries.forEach(entry => {
            base += entry.baseHoursInMinutes;
            adjusted += entry.regularHoursInMinutes + entry.overtimeHoursInMinutes + entry.doubletimeHoursInMinutes;
        });

        const project: BillTimeEntriesSelectionTotals = {
            selectedBaseMinutes: base,
            selectedAdjustedMinutes: adjusted,
        };

        base = 0;
        adjusted = 0;

        this.selectedProjectCampaignEntries.forEach(entry => {
            base += entry.baseHoursInMinutes;
            adjusted += entry.regularHoursInMinutes + entry.overtimeHoursInMinutes + entry.doubletimeHoursInMinutes;
        });

        return {
            project,
            projectCampaign: {
                selectedBaseMinutes: base,
                selectedAdjustedMinutes: adjusted,
            },
        };
    }

    public render() {
        return (
            <React.Fragment>
                <Section title="Project and campaign summary" noSeparator={true}>
                    <Card
                        isExpandable={true}
                        title="View unbilled project and campaign activities"
                        titleWhenExpanded="Hide non-billable activities"
                        classNameForContentAboveTitleBar={s.projectAndCampaignSummary}
                        contentAboveTitleBar={
                            <React.Fragment>
                                <div>
                                    <div className={s.titles}>
                                        <h3>
                                            {this.unbilledProjectTimeEntriesTotalMinutes > 0
                                                ? DateHandler.convertTotalMinutesToHM(
                                                      this.unbilledProjectTimeEntriesTotalMinutes
                                                  )
                                                : 'None'}
                                        </h3>
                                        <h4>Unbilled project activities</h4>

                                        <Paragraph
                                            size="small"
                                            type={
                                                this.unbilledProjectNonBillableTimeEntriesTotalMinutes > 0
                                                    ? 'alert'
                                                    : 'dim'
                                            }
                                        >
                                            {(this.unbilledProjectNonBillableTimeEntriesTotalMinutes > 0 && (
                                                <React.Fragment>
                                                    <strong>
                                                        {DateHandler.convertTotalMinutesToHM(
                                                            this.unbilledProjectNonBillableTimeEntriesTotalMinutes
                                                        )}
                                                    </strong>
                                                    {' non-billable'}
                                                </React.Fragment>
                                            )) || <span>No non-billable hours</span>}
                                        </Paragraph>
                                    </div>
                                </div>

                                <div>
                                    <div className={s.titles}>
                                        <h3>
                                            {this.unbilledProjectCampaignTimeEntriesTotalMinutes > 0
                                                ? DateHandler.convertTotalMinutesToHM(
                                                      this.unbilledProjectCampaignTimeEntriesTotalMinutes
                                                  )
                                                : 'None'}
                                        </h3>
                                        <h4>Unbilled campaign activities</h4>

                                        <Paragraph
                                            size="small"
                                            type={
                                                this.unbilledProjectCampaignNonBillableTimeEntriesTotalMinutes > 0
                                                    ? 'alert'
                                                    : 'dim'
                                            }
                                        >
                                            {(this.unbilledProjectCampaignNonBillableTimeEntriesTotalMinutes > 0 && (
                                                <React.Fragment>
                                                    <strong>
                                                        {DateHandler.convertTotalMinutesToHM(
                                                            this
                                                                .unbilledProjectCampaignNonBillableTimeEntriesTotalMinutes
                                                        )}
                                                    </strong>
                                                    {' non-billable'}
                                                </React.Fragment>
                                            )) || <span>No non-billable hours</span>}
                                        </Paragraph>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                        noPadding={true}
                    >
                        {this.unbilledProjectTimeEntriesTotalMinutes > 0 && (
                            <React.Fragment>
                                <div className={s.summarySectionHeadline}>
                                    <h3>Project activities:</h3>

                                    <BillActivitiesSectionSelectionTotal
                                        selectedBaseMinutes={
                                            this.selectedEntriesHoursDifference.project.selectedBaseMinutes
                                        }
                                        selectedAdjustedMinutes={
                                            this.selectedEntriesHoursDifference.project.selectedAdjustedMinutes
                                        }
                                    />
                                </div>

                                <BillSpotFormProjectCampaignActivities
                                    timeEntries={this.props.unbilledProjectTimeEntries}
                                />
                            </React.Fragment>
                        )}

                        {this.unbilledProjectCampaignTimeEntriesTotalMinutes > 0 && (
                            <React.Fragment>
                                <div className={s.summarySectionHeadline}>
                                    <h3>Campaign activities:</h3>

                                    <BillActivitiesSectionSelectionTotal
                                        selectedBaseMinutes={
                                            this.selectedEntriesHoursDifference.projectCampaign.selectedBaseMinutes
                                        }
                                        selectedAdjustedMinutes={
                                            this.selectedEntriesHoursDifference.projectCampaign.selectedAdjustedMinutes
                                        }
                                    />
                                </div>

                                <BillSpotFormProjectCampaignActivities
                                    timeEntries={this.props.unbilledProjectCampaignTimeEntries}
                                />
                            </React.Fragment>
                        )}
                    </Card>
                </Section>

                <Section
                    title="Spots to be billed"
                    headerElements={
                        this.props.editable
                            ? [
                                  {
                                      key: 'edit-button',
                                      element: (
                                          <ButtonEdit
                                              onClick={this.handleTogglingEditMode}
                                              label={this.areSpotsInEditMode ? 'Stop editing spots' : 'Edit spots'}
                                          />
                                      ),
                                  },
                              ]
                            : []
                    }
                >
                    <Card
                        isExpandable={false}
                        title={
                            this.areSpotsInEditMode && this.remainingSpotsToBill.length > 0
                                ? 'Pick spots to add to the bill from the list below:'
                                : undefined
                        }
                        classNameForContentAboveTitleBar={s.spotsGrid}
                        contentAboveTitleBar={
                            this.props.store!.spotToBillForm.spotsAddedToBill.length > 0 ? (
                                <BillSpotFormSpotsGridTable
                                    spots={this.props.spots}
                                    areSpotsInEditMode={this.areSpotsInEditMode}
                                    campaignName={this.props.campaignName}
                                    projectCampaignName={this.props.projectCampaignName}
                                />
                            ) : (
                                <Paragraph type="dim" className={s.noSpots}>
                                    No spots added to the bill. Edit spots to add at least single spot.
                                </Paragraph>
                            )
                        }
                    >
                        {this.areSpotsInEditMode && (
                            <BillSpotFormSpotsToAdd
                                projectCampaignId={this.props.projectCampaignId}
                                remainingSpotsToBill={this.remainingSpotsToBill}
                            />
                        )}
                    </Card>
                </Section>
            </React.Fragment>
        );
    }

    private handleTogglingEditMode = e => {
        this.areSpotsInEditMode = !this.areSpotsInEditMode;
    };

    private calculateTotalMinutesOfTimeEntries = (timeEntries: BillTimeEntry[]): number => {
        return timeEntries.reduce((total: number, entry) => {
            const minutes = DateHandler.convertHoursDotMinutesToTotalMinutes(entry.duration);
            total += minutes;

            return total;
        }, 0);
    };
}
