import { SpotToBillFormActions } from 'actions';
import { Paragraph } from 'components/Content';
import { Card, Section } from 'components/Section';
import { DateHandler } from 'helpers/DateHandler';
import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { ActivityInBillWithBaseTime, BillTimeEntry, SpotBillFormSpot } from 'types/spotBilling';
import { BillSpotFormActivities } from '../DraftBillSpotForm';
import { BillSpotFormSpotsGridTable } from './BillSpotFormSpotsGridTable';
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

    @computed private get unbilledProjectCampaignTimeEntriesTotalMinutes(): number {
        return this.calculateTotalMinutesOfTimeEntries(this.props.unbilledProjectCampaignTimeEntries);
    }

    @computed private get selectedProjectEntries(): ActivityInBillWithBaseTime[] {
        return this.props.unbilledProjectTimeEntries.reduce((activities: ActivityInBillWithBaseTime[], timeEntry) => {
            const inSelection = this.props.store!.spotToBillForm.selectedActivitiesIds.indexOf(timeEntry.timeEntryId);
            if (inSelection !== -1) {
                const selection = this.props.store!.spotToBillForm.selectedActivities[inSelection];

                activities.push({
                    timeEntryId: selection.timeEntryId,
                    hoursAreSplit: selection.hoursAreSplit,
                    regularHoursInMinutes: selection.regularHours,
                    overtimeHoursInMinutes: selection.overtimeHours,
                    doubletimeHoursInMinutes: selection.doubletimeHours,
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
                        timeEntryId: selection.timeEntryId,
                        hoursAreSplit: selection.hoursAreSplit,
                        regularHoursInMinutes: selection.regularHours,
                        overtimeHoursInMinutes: selection.overtimeHours,
                        doubletimeHoursInMinutes: selection.doubletimeHours,
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

    @computed
    private get filteredSpots(): SpotBillFormSpot[] {
        return this.props.spots.filter(spot => {
            spot.timeEntries = spot.timeEntries.filter(
                timeEntry => SpotToBillFormActions.checkIfTimeEntryIsInBill(timeEntry.timeEntryId) === false
            );

            if (spot.timeEntries.length > 0) {
                return true;
            }

            return false;
        });
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
                                            {this.props.projectCampaignName
                                                ? this.props.projectCampaignName
                                                : this.props.campaignName}
                                        </h3>
                                        <h4>{this.props.projectCampaignName ? this.props.campaignName : 'Campaign'}</h4>
                                    </div>
                                </div>

                                <div>
                                    <div className={s.titles}>
                                        <h3>
                                            {this.unbilledProjectTimeEntriesTotalMinutes > 0
                                                ? DateHandler.convertTotalMinutesToHM(
                                                      this.unbilledProjectTimeEntriesTotalMinutes
                                                  )
                                                : '0h 0min'}
                                        </h3>
                                        <h4>Unbilled project activities</h4>
                                    </div>
                                </div>

                                <div>
                                    <div className={s.titles}>
                                        <h3>
                                            {this.unbilledProjectCampaignTimeEntriesTotalMinutes > 0
                                                ? DateHandler.convertTotalMinutesToHM(
                                                      this.unbilledProjectCampaignTimeEntriesTotalMinutes
                                                  )
                                                : '0h 0min'}
                                        </h3>
                                        <h4>Unbilled campaign activities</h4>
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
                                        totalMinutes={this.unbilledProjectTimeEntriesTotalMinutes}
                                        areTotalMinutesUnbilled={false}
                                    />
                                </div>

                                <BillSpotFormProjectCampaignActivities
                                    timeEntries={this.props.unbilledProjectTimeEntries}
                                    options={{
                                        showBillable: true,
                                        showDate: true,
                                    }}
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
                                        totalMinutes={this.unbilledProjectCampaignTimeEntriesTotalMinutes}
                                        areTotalMinutesUnbilled={false}
                                    />
                                </div>

                                <BillSpotFormProjectCampaignActivities
                                    timeEntries={this.props.unbilledProjectCampaignTimeEntries}
                                    options={{
                                        showBillable: true,
                                        showDate: true,
                                    }}
                                />
                            </React.Fragment>
                        )}
                    </Card>
                </Section>

                {this.filteredSpots.map((spot, spotIndex) => (
                    <Section key={spot.spotId} title={spotIndex === 0 ? 'Spots to be billed' : undefined}>
                        <Card
                            isExpandable={true}
                            title="View unbilled spot activities"
                            titleWhenExpanded="Hide spot activities"
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
                            noPadding={true}
                        >
                            <BillSpotFormActivities spot={spot} />
                        </Card>
                    </Section>
                ))}
            </React.Fragment>
        );
    }

    private calculateTotalMinutesOfTimeEntries = (timeEntries: BillTimeEntry[]): number => {
        return timeEntries.reduce((total: number, entry) => {
            const minutes = DateHandler.convertHoursDotMinutesToTotalMinutes(entry.duration);
            total += minutes;

            return total;
        }, 0);
    };
}
