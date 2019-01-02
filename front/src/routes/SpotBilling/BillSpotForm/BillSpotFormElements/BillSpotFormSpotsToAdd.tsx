import { SpotToBillFormActions } from 'actions';
import { Paragraph, Tag } from 'components/Content';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillFormSpot } from 'types/spotBilling';

const s = require('./BillSpotFormSpotsToAdd.css');

interface BillSpotFormSpotsToAddProps extends AppOnlyStoreState {
    projectCampaignId: number;
    remainingSpotsToBill: SpotBillFormSpot[];
}

@inject('store')
@observer
export class BillSpotFormSpotsToAdd extends React.Component<BillSpotFormSpotsToAddProps, {}> {
    public render() {
        if (this.props.remainingSpotsToBill.length <= 0) {
            return <Paragraph type="dim">No spots to bill remain at this project campaign</Paragraph>;
        }

        return (
            <div className={s.list}>
                {this.props.remainingSpotsToBill.map(spot => (
                    <Tag key={spot.spotId} onTagClick={this.handleAddSpot(spot.spotId)} title={spot.spotName} />
                ))}
            </div>
        );
    }

    private handleAddSpot = (spotId: number) => e => {
        SpotToBillFormActions.addSpotToBill(spotId);
    };
}
