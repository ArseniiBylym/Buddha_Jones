import { SpotToBillFormActions } from 'actions';
import { ButtonDelete } from 'components/Button';
import { Paragraph } from 'components/Content';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { SpotHandler } from 'helpers/SpotHandler';
import { StringHandler } from 'helpers/StringHandler';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillFormSpot } from 'types/spotBilling';

const s = require('./BillSpotFormSpotsGrid.css');

interface Props extends AppOnlyStoreState {
    spots: SpotBillFormSpot[];
    areSpotsInEditMode: boolean;
    campaignName: string;
    projectCampaignName: string | null;
}

@inject('store')
@observer
export class BillSpotFormSpotsGridTable extends React.Component<Props, {}> {
    @computed
    private get addedSpots(): SpotBillFormSpot[] {
        const spots =
            this.props.store && this.props.store.spotToBillForm.spotsAddedToBill
                ? this.props.store.spotToBillForm.spotsAddedToBill
                : [];

        return this.props.spots.filter(spot => spots.findIndex(spotId => spotId === spot.spotId) !== -1);
    }

    public render() {
        return (
            <React.Fragment>
                {this.addedSpots.map(spot => (
                    <React.Fragment key={spot.spotId}>
                        <div className={s.titles}>
                            <h3>{spot.spotName}</h3>

                            <h4>
                                {StringHandler.constructProjectCampaignName(
                                    this.props.campaignName,
                                    this.props.projectCampaignName
                                )}
                            </h4>

                            <Paragraph type="dim" size="small">
                                {StringHandler.constructSpotRevisionsAndGraphicsIncludedDescription(
                                    spot.numberOfRevisions,
                                    spot.graphicsIncluded
                                )}
                            </Paragraph>
                        </div>

                        <div className={s.titles}>
                            <h3>
                                {spot.firstRevisionCost
                                    ? MoneyHandler.formatAsDollars(spot.firstRevisionCost)
                                    : 'Not defined'}
                            </h3>

                            <h4>First stage rate</h4>

                            <Paragraph type={spot.firstRevisionIsBilled ? 'brown' : 'alert'} size="small">
                                {spot.firstRevisionIsBilled ? 'Submitted on earlier bill' : 'Unbilled'}
                            </Paragraph>

                            {this.props.areSpotsInEditMode &&
                                this.props.store!.spotToBillForm.spotsAddedToBill.length > 1 && (
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

                            <Paragraph type="brown" size="small">
                                {spot.billingNote ? 'Note: ' + spot.billingNote : 'No billing note'}
                            </Paragraph>
                        </div>
                    </React.Fragment>
                ))}
            </React.Fragment>
        );
    }

    private handleRemovingSpotFromTheBill = (spotId: number) => e => {
        SpotToBillFormActions.removeSpotFromBill(spotId);
    };
}
