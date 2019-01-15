import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { BillTimeEntry, SpotBillFormSpot } from 'types/spotBilling';

interface Props {
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
export class BillSpotPreview extends React.Component<Props, {}> {
    public render() {
        return (
            <div>
                <p>Test</p>
            </div>
        );
    }
}
