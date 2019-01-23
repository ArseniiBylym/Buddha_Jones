import { BillSpotFormBottomBar } from '.';
import { HeaderActions, SpotToBillFormActions } from 'actions';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry, SpotBillFormSummary } from 'types/spotBilling';
import { BillSpotFormProjectHistory, BillSpotFormSpotsGrid, BillSpotPreview } from '../BillSpotFormElements';

interface Props extends AppOnlyStoreState {
    billData: SpotBillFormSummary;
}

@inject('store')
@observer
export class DraftBillSpotForm extends React.Component<Props, {}> {
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
