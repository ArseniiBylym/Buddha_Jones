import { BillSpotFormBottomBar } from '.';
import { HeaderActions, SpotToBillFormActions } from 'actions';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillFormSummary } from 'types/spotBilling';
import { BillSpotFormProjectHistory, BillSpotFormSpotsGrid } from '../BillSpotFormElements';
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

    constructor(props: Props) {
        super(props);

        if (this.props.billData) {
            SpotToBillFormActions.initialize(this.props.billData.bill);

            HeaderActions.setMainHeaderTitles(this.props.billData.projectName, this.props.billData.studioName);
        }
    }

    public render() {
        const { billData } = this.props;

        return (
            <React.Fragment>
                <BillSpotFormProjectHistory projectHistory={billData.projectBillsHistory} />

                <BillSpotFormSpotsGrid
                    spots={billData.spots}
                    unbilledProjectTimeEntries={billData.unbilledProjectTimeEntries}
                    unbilledProjectCampaignTimeEntries={billData.unbilledProjectCampaignTimeEntries}
                    campaignName={billData.campaignName}
                    projectCampaignName={billData.projectCampaignName}
                    projectCampaignId={billData.projectCampaignId}
                    editable={true}
                />

                <BillSpotFormActivities spots={billData.spots} marginBottom={this.isAnyActivitySelected ? 64 : 24} />

                <BillSpotFormBottomBar isSaving={false} />
            </React.Fragment>
        );
    }
}
