import { BillSpotFormBottomBar } from '.';
import { HeaderActions, SpotToBillFormActions } from 'actions';
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

                <BillSpotFormActivities />

                <br />
                <br />

                <BillSpotFormBottomBar isSaving={false} />
            </React.Fragment>
        );
    }
}
