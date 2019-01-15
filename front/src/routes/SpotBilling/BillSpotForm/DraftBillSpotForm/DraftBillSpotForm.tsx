import { BillSpotFormBottomBar } from '.';
import { HeaderActions, SpotToBillFormActions } from 'actions';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry, SpotBillFormSpot, SpotBillFormSummary } from 'types/spotBilling';
import { BillSpotFormProjectHistory, BillSpotFormSpotsGrid, BillSpotPreview } from '../BillSpotFormElements';
import { BillSpotFormActivities } from './BillSpotFormActivities';

interface Props extends AppOnlyStoreState {
    billData: SpotBillFormSummary;
}

@inject('store')
@observer
export class DraftBillSpotForm extends React.Component<Props, {}> {
    @computed
    private get isAnyActivitySelected(): boolean {
        return this.props.store!.spotToBillForm.selectedActivitiesIds.length > 0;
    }

    @computed
    private get filteredUnbilledProjectTimeEntries(): BillTimeEntry[] {
        return this.props.billData.unbilledProjectTimeEntries.filter(
            timeEntry => SpotToBillFormActions.checkIfTimeEntryIsInBill(timeEntry.timeEntryId) === false
        );
    }

    @computed
    private get filteredUnbilledProjectCampaignTimeEntries(): BillTimeEntry[] {
        return this.props.billData.unbilledProjectCampaignTimeEntries.filter(
            timeEntry => SpotToBillFormActions.checkIfTimeEntryIsInBill(timeEntry.timeEntryId) === false
        );
    }

    @computed
    private get filteredSpots(): SpotBillFormSpot[] {
        return this.props.billData.spots.filter(spot => {
            spot.timeEntries = spot.timeEntries.filter(
                timeEntry => SpotToBillFormActions.checkIfTimeEntryIsInBill(timeEntry.timeEntryId) === false
            );

            if (spot.timeEntries.length > 0) {
                return true;
            }

            return false;
        });
    }

    constructor(props: Props) {
        super(props);

        if (this.props.billData) {
            SpotToBillFormActions.initialize(this.props.billData.bill);

            HeaderActions.replaceMainHeaderContent({
                title: this.props.billData.projectName,
                subTitle: this.props.billData.studioName,
            });
        }
    }

    public render() {
        const { billData } = this.props;
        const { addingActivityToBillStatus } = this.props.store!.spotToBillForm;

        return (
            <React.Fragment>
                <BillSpotFormProjectHistory projectHistory={billData.projectBillsHistory} />

                <BillSpotFormSpotsGrid
                    spots={billData.spots}
                    unbilledProjectTimeEntries={this.filteredUnbilledProjectTimeEntries}
                    unbilledProjectCampaignTimeEntries={this.filteredUnbilledProjectCampaignTimeEntries}
                    campaignName={billData.campaignName}
                    projectCampaignName={billData.projectCampaignName}
                    projectCampaignId={billData.projectCampaignId}
                    editable={true}
                />

                <BillSpotFormActivities
                    spots={this.filteredSpots}
                    marginBottom={this.isAnyActivitySelected || addingActivityToBillStatus !== 'none' ? 64 : 24}
                />

                <BillSpotFormBottomBar isBillSaving={false} spots={billData.spots} />

                <BillSpotPreview
                    billId={billData.billId}
                    spots={billData.spots}
                    unbilledProjectTimeEntries={this.filteredUnbilledProjectTimeEntries}
                    unbilledProjectCampaignTimeEntries={this.filteredUnbilledProjectCampaignTimeEntries}
                    projectName={billData.projectName}
                    campaignName={billData.campaignName}
                    projectCampaignName={billData.projectCampaignName}
                    projectCampaignId={billData.projectCampaignId}
                    studioName={billData.studioName}
                    editable={true}
                />
            </React.Fragment>
        );
    }
}
