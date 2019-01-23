import { SpotToBillFormActions } from 'actions';
import { ButtonDelete } from 'components/Button';
import { Paragraph } from 'components/Content';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { SpotHandler } from 'helpers/SpotHandler';
import { StringHandler } from 'helpers/StringHandler';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillFormSpot } from 'types/spotBilling';

const s = require('./BillSpotFormSpotsGrid.css');

interface Props extends AppOnlyStoreState {
    spot: SpotBillFormSpot;
    isInEditMode: boolean;
    campaignName: string;
    projectCampaignName: string | null;
}

@inject('store')
@observer
export class BillSpotFormSpotsGridTable extends React.Component<Props, {}> {
    public render() {
        const { spot, isInEditMode } = this.props;

        return (
            <React.Fragment>
                <div className={s.titles}>
                    <h3>{spot.spotName}</h3>

                    <h4>
                        {StringHandler.constructProjectCampaignName(
                            this.props.campaignName,
                            this.props.projectCampaignName
                        )}
                    </h4>

                    <Paragraph type="brown" size="small">
                        {StringHandler.constructSpotRevisionsAndGraphicsIncludedDescription(
                            spot.numberOfRevisions,
                            spot.graphicsIncluded
                        )}
                    </Paragraph>
                </div>

                <div className={s.titles}>
                    <h3>
                        {spot.firstRevisionCost ? MoneyHandler.formatAsDollars(spot.firstRevisionCost) : 'Not defined'}
                    </h3>

                    <h4>First stage rate</h4>

                    <Paragraph type={spot.firstRevisionIsBilled ? 'brown' : 'alert'} size="small">
                        {spot.firstRevisionIsBilled ? 'Submitted on earlier bill' : 'Unbilled'}
                    </Paragraph>

                    {isInEditMode && this.props.store!.spotToBillForm.spotsAddedToBill.length > 1 && (
                        <ButtonDelete
                            className={s.removeSpotButton}
                            onClick={this.handleRemovingSpotFromTheBill(spot.spotId)}
                            label="Remove spot"
                            labelColor="orange"
                        />
                    )}
                </div>

                <div className={s.titles}>
                    <h3>{SpotHandler.getSpotBillingTypeName(spot.billingType)}</h3>

                    <h4>Spot billing</h4>

                    <Paragraph type={spot.billingNote ? 'brown' : 'dim'} size="small">
                        {spot.billingNote ? 'Note: ' + spot.billingNote : 'No billing note'}
                    </Paragraph>
                </div>
            </React.Fragment>
        );
    }

    private handleRemovingSpotFromTheBill = (spotId: number) => e => {
        SpotToBillFormActions.removeSpotFromBill(spotId);
    };
}
