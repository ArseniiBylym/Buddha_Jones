import { BillSpotFormBottomBar } from '.';
import { HeaderActions, SpotToBillFormActions } from 'actions';
import { DAILIES_ACTIVITIES_IDS } from 'invariables';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry, SpotBillFormSummary } from 'types/spotBilling';
import { BillSpotPreview } from '../BillSpotPreview';
import {
    BillSpotFormProjectHistory,
    BillSpotFormSpotsGrid,
    BackToSpotsToBillListButton,
} from '../BillSpotFormElements';

interface FilteredTimeEntries {
    unbilledDailiesTimeEntries: BillTimeEntry[];
    unbilledNonBillableTimeEntries: BillTimeEntry[];
    unbilledBillableTimeEntries: BillTimeEntry[];
}

interface Props extends AppOnlyStoreState {
    billData: SpotBillFormSummary;
    showPreview: boolean;
}

@inject('store')
@observer
export class DraftBillSpotForm extends React.Component<Props, {}> {
    @computed
    private get unbilledTimeEntriesWihoutThoseInBill(): BillTimeEntry[] {
        return this.props.billData.unbilledTimeEntries.filter(
            timeEntry => SpotToBillFormActions.checkIfTimeEntryIsInBill(timeEntry.timeEntryId) === false
        );
    }

    @computed
    private get filteredTimeEntries(): FilteredTimeEntries {
        return this.unbilledTimeEntriesWihoutThoseInBill.reduce(
            (filtered: FilteredTimeEntries, timeEntry) => {
                // Check if activity is billable
                if (timeEntry.activityIsBillable) {
                    filtered.unbilledBillableTimeEntries.push(timeEntry);
                    return filtered;
                }

                // Check if activity is one of dailies
                if (DAILIES_ACTIVITIES_IDS.indexOf(timeEntry.activityId) !== -1) {
                    filtered.unbilledDailiesTimeEntries.push(timeEntry);
                    return filtered;
                }

                // Check if activity is non-billable but not part of dailies activities
                if (timeEntry.activityIsBillable === false) {
                    filtered.unbilledNonBillableTimeEntries.push(timeEntry);
                    return filtered;
                }

                return filtered;
            },
            {
                unbilledDailiesTimeEntries: [],
                unbilledNonBillableTimeEntries: [],
                unbilledBillableTimeEntries: [],
            }
        );
    }

    constructor(props: Props) {
        super(props);

        if (this.props.billData) {
            SpotToBillFormActions.initialize(this.props.billData.bill);

            HeaderActions.replaceMainHeaderContent({
                title: this.props.billData.projectName,
                subTitle: this.props.billData.studioName,
                elements: [<BackToSpotsToBillListButton key="back-to-spots-to-bill" />],
            });
        }
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.props.showPreview && nextProps.showPreview === false) {
            HeaderActions.setMainHeaderElements([<BackToSpotsToBillListButton key="back-to-spots-to-bill" />]);
        }
    }

    public render() {
        const { billData, showPreview } = this.props;

        if (showPreview) {
            return (
                <BillSpotPreview
                    billId={billData.billId}
                    spots={billData.unbilledSpots}
                    unbilledTimeEntries={this.props.billData.unbilledTimeEntries}
                    projectName={billData.projectName}
                    campaignName={billData.campaignName}
                    projectCampaignName={billData.projectCampaignName}
                    projectCampaignId={billData.projectCampaignId}
                    studioId={billData.studioId}
                    studioName={billData.studioName}
                    editable={true}
                />
            );
        }

        return (
            <React.Fragment>
                <BillSpotFormProjectHistory projectHistory={billData.projectBillsHistory} />

                <BillSpotFormSpotsGrid
                    spots={billData.unbilledSpots}
                    unbilledDailiesTimeEntries={this.filteredTimeEntries.unbilledDailiesTimeEntries}
                    unbilledNonBillableTimeEntries={this.filteredTimeEntries.unbilledNonBillableTimeEntries}
                    unbilledBillableTimeEntries={this.filteredTimeEntries.unbilledBillableTimeEntries}
                    campaignName={billData.campaignName}
                    projectCampaignName={billData.projectCampaignName}
                    projectCampaignId={billData.projectCampaignId}
                    editable={true}
                />

                <BillSpotFormBottomBar
                    billId={this.props.billData.billId}
                    isBillSaving={false}
                    spots={billData.unbilledSpots}
                />
            </React.Fragment>
        );
    }
}
