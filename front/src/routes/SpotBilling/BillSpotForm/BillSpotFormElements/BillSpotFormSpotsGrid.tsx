import { SpotToBillFormActions } from 'actions';
import { Paragraph } from 'components/Content';
import { Card, Section } from 'components/Section';
import { DateHandler } from 'helpers/DateHandler';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import {
    ActivityInBillWithBaseTime,
    BillTimeEntry,
    SpotBillFormSpot,
    SpotTimeEntryDuration
    } from 'types/spotBilling';
import { BillSpotFormActivities } from '../DraftBillSpotForm';
import { BillSpotFormSpotsGridTable } from './BillSpotFormSpotsGridTable';
import {
    BillSpotFormProjectCampaignActivities,
    BillActivitiesSectionSelectionTotal,
    BillTimeEntriesSelectionTotals,
    BillSpotFormSpotsToAdd,
} from '.';

const s = require('./BillSpotFormSpotsGrid.css');

interface Props extends AppOnlyStoreState {
    spots: SpotBillFormSpot[];
    unbilledDailiesTimeEntries: BillTimeEntry[];
    unbilledNonBillableTimeEntries: BillTimeEntry[];
    unbilledBillableTimeEntries: BillTimeEntry[];
    editable: boolean;
    campaignName: string;
    projectCampaignName: string | null;
    projectCampaignId: number;
}

@inject('store')
@observer
export class BillSpotFormSpotsGrid extends React.Component<Props, {}> {
    @computed private get unbilledDailiesTotalMinutes(): number {
        return this.calculateTotalMinutesOfTimeEntries(this.props.unbilledDailiesTimeEntries);
    }

    @computed private get unbilledNonBillableTotalMinutes(): number {
        return this.calculateTotalMinutesOfTimeEntries(this.props.unbilledNonBillableTimeEntries);
    }

    @computed private get selectedDailiesEntries(): ActivityInBillWithBaseTime[] {
        return this.props.unbilledDailiesTimeEntries.reduce((activities: ActivityInBillWithBaseTime[], timeEntry) => {
            const inSelection = this.props.store!.spotToBillForm.selectedActivitiesIds.indexOf(timeEntry.timeEntryId);
            if (inSelection !== -1) {
                const selection = this.props.store!.spotToBillForm.selectedActivities[inSelection];

                activities.push({
                    timeEntryId: selection.timeEntryId,
                    hoursAreSplit: selection.hoursAreSplit,
                    totalHoursInMinutes: selection.totalHours,
                    regularHoursInMinutes: selection.regularHours,
                    overtimeHoursInMinutes: selection.overtimeHours,
                    doubletimeHoursInMinutes: selection.doubletimeHours,
                    baseHoursInMinutes: DateHandler.convertHoursDotMinutesToTotalMinutes(timeEntry.duration),
                });
            }

            return activities;
        }, []);
    }

    @computed private get selectedEntriesHoursDifference(): {
        dailies: BillTimeEntriesSelectionTotals;
    } {
        let base: number = 0;
        let adjusted: number = 0;

        this.selectedDailiesEntries.forEach(entry => {
            base += entry.baseHoursInMinutes;
            adjusted += entry.totalHoursInMinutes;
        });

        const dailies: BillTimeEntriesSelectionTotals = {
            selectedBaseMinutes: base,
            selectedAdjustedMinutes: adjusted,
        };

        return {
            dailies: dailies,
        };
    }

    @computed private get remainingSpotsToBill(): SpotBillFormSpot[] {
        const spotsAddedToBill: number[] =
            this.props.store && this.props.store.spotToBillForm.spotsIdsAddedToBill
                ? this.props.store.spotToBillForm.spotsIdsAddedToBill
                : [];

        return this.props.spots.filter(spot => spotsAddedToBill.findIndex(spotId => spotId === spot.spotId) === -1);
    }

    @computed
    private get filteredSpots(): Array<{
        timeEntries: BillTimeEntry[];
        spotInfo: SpotBillFormSpot;
        duration: SpotTimeEntryDuration;
    }> {
        return this.props.spots
            .filter(spot => SpotToBillFormActions.checkIfSpotIsInBill(spot.spotId))
            .sort((spotA, spotB) => {
                const spotIndexInBillA = this.props.store!.spotToBillForm.spotsIdsAddedToBill.indexOf(spotA.spotId);
                const spotIndexInBillB = this.props.store!.spotToBillForm.spotsIdsAddedToBill.indexOf(spotB.spotId);
                return spotIndexInBillA < spotIndexInBillB ? -1 : spotIndexInBillA > spotIndexInBillB ? 1 : 0;
            })
            .map(spot => {
                const timeEntries = this.props.unbilledBillableTimeEntries.filter(
                    timeEntry => timeEntry.spotId !== null && timeEntry.spotId === spot.spotId
                );

                return {
                    spotInfo: spot,
                    timeEntries: timeEntries,
                    duration: timeEntries.reduce(
                        (sum: SpotTimeEntryDuration, timeEntry) => {
                            const timeEntryDuration = DateHandler.convertHoursDotMinutesToTotalMinutes(
                                timeEntry.duration
                            );

                            const timeEntryInSelection = this.props.store!.spotToBillForm.selectedActivities.find(
                                a => a.timeEntryId === timeEntry.timeEntryId
                            );
                            if (timeEntryInSelection) {
                                sum.selectedBaseMinutes += timeEntryDuration;
                                sum.selectedAdjustedMinutes += timeEntryInSelection.totalHours;
                            }

                            sum.totalUnbilledMinutes += timeEntryDuration;

                            return sum;
                        },
                        {
                            totalUnbilledMinutes: 0,
                            selectedBaseMinutes: 0,
                            selectedAdjustedMinutes: 0,
                        }
                    ),
                };
            });
    }

    @computed
    private get nonBillableLabel(): string {
        return (
            (this.unbilledDailiesTotalMinutes > 0 ? 'dailies' : '') +
            (this.unbilledDailiesTotalMinutes > 0 && this.unbilledNonBillableTotalMinutes > 0 ? ' and ' : '') +
            (this.unbilledNonBillableTotalMinutes > 0 ? 'non-billable' : '') +
            ' activities'
        );
    }

    public render() {
        return (
            <React.Fragment>
                <Section title="Project and campaign summary" noSeparator={true}>
                    <Card
                        isExpandable={true}
                        title={'View ' + this.nonBillableLabel}
                        titleWhenExpanded={'Hide ' + this.nonBillableLabel}
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
                                            {this.unbilledNonBillableTotalMinutes > 0
                                                ? DateHandler.convertTotalMinutesToHM(
                                                      this.unbilledNonBillableTotalMinutes
                                                  )
                                                : '0h 0min'}
                                        </h3>
                                        <h4>Non-billable activities</h4>
                                    </div>
                                </div>

                                <div>
                                    <div className={s.titles}>
                                        <h3>
                                            {this.unbilledDailiesTotalMinutes > 0
                                                ? DateHandler.convertTotalMinutesToHM(this.unbilledDailiesTotalMinutes)
                                                : '0h 0min'}
                                        </h3>
                                        <h4>Unbilled dailies</h4>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                        noPadding={true}
                    >
                        {this.unbilledDailiesTotalMinutes > 0 && (
                            <React.Fragment>
                                <div className={s.summarySectionHeadline}>
                                    <h3>Unbilled dailies:</h3>

                                    <BillActivitiesSectionSelectionTotal
                                        selectedBaseMinutes={
                                            this.selectedEntriesHoursDifference.dailies.selectedBaseMinutes
                                        }
                                        selectedAdjustedMinutes={
                                            this.selectedEntriesHoursDifference.dailies.selectedAdjustedMinutes
                                        }
                                        totalMinutes={this.unbilledDailiesTotalMinutes}
                                        showSelectedMinutes={true}
                                        showPlusMinusCalculation={true}
                                        areTotalMinutesUnbilled={false}
                                    />
                                </div>

                                <BillSpotFormProjectCampaignActivities
                                    timeEntries={this.props.unbilledDailiesTimeEntries}
                                    options={{
                                        showDate: true,
                                        showAddToBill: true,
                                    }}
                                />
                            </React.Fragment>
                        )}

                        {this.unbilledNonBillableTotalMinutes > 0 && (
                            <React.Fragment>
                                <div className={s.summarySectionHeadline}>
                                    <h3>Non-billable activities:</h3>

                                    <BillActivitiesSectionSelectionTotal
                                        selectedBaseMinutes={
                                            this.selectedEntriesHoursDifference.dailies.selectedBaseMinutes
                                        }
                                        selectedAdjustedMinutes={
                                            this.selectedEntriesHoursDifference.dailies.selectedAdjustedMinutes
                                        }
                                        totalMinutes={this.unbilledNonBillableTotalMinutes}
                                        areTotalMinutesUnbilled={false}
                                    />
                                </div>

                                <BillSpotFormProjectCampaignActivities
                                    timeEntries={this.props.unbilledNonBillableTimeEntries}
                                    options={{
                                        showBillable: false,
                                        showDate: true,
                                    }}
                                />
                            </React.Fragment>
                        )}
                    </Card>
                </Section>

                {this.filteredSpots.length <= 0 && (
                    <Section title="Spots to be billed">
                        <Card
                            isExpandable={false}
                            classNameForContentAboveTitleBar={s.spotsGrid}
                            contentAboveTitleBar={
                                <Paragraph type="dim" className={s.noSpots}>
                                    No spots added to the bill.
                                </Paragraph>
                            }
                        />
                    </Section>
                )}

                {this.filteredSpots.map((spot, spotIndex) => (
                    <Section key={spot.spotInfo.spotId} title={spotIndex === 0 ? 'Spots to be billed' : undefined}>
                        <Card
                            isExpandable={true}
                            noPadding={true}
                            title="View unbilled spot activities"
                            titleWhenExpanded="Hide unbilled spot activities"
                            classNameForContentAboveTitleBar={s.spotsGrid}
                            showHeaderElementsOnlyWhenExpanded={spot.duration.selectedBaseMinutes > 0 ? false : true}
                            headerElements={
                                <BillActivitiesSectionSelectionTotal
                                    totalMinutes={spot.duration.totalUnbilledMinutes}
                                    selectedBaseMinutes={spot.duration.selectedBaseMinutes}
                                    selectedAdjustedMinutes={spot.duration.selectedAdjustedMinutes}
                                    areTotalMinutesUnbilled={true}
                                    showPlusMinusCalculation={true}
                                    showSelectedMinutes={true}
                                />
                            }
                            contentAboveTitleBar={
                                <BillSpotFormSpotsGridTable
                                    spot={spot.spotInfo}
                                    isInEditMode={false}
                                    campaignName={this.props.campaignName}
                                    projectCampaignName={this.props.projectCampaignName}
                                />
                            }
                        >
                            <BillSpotFormActivities unbilledBillableTimeEntries={spot.timeEntries} />
                        </Card>
                    </Section>
                ))}

                <Section
                    key="add-spot"
                    title="Add other spot from campaign to the bill"
                    headerElements={[
                        {
                            key: 'dropdown',
                            element: (
                                <BillSpotFormSpotsToAdd
                                    projectCampaignId={this.props.projectCampaignId}
                                    remainingSpotsToBill={this.remainingSpotsToBill}
                                />
                            ),
                        },
                    ]}
                />

                <div style={{ height: '64px' }} />
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
