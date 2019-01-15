import { SpotToBillFormActions } from 'actions';
import { Paragraph, Tag } from 'components/Content';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillFormSpot } from 'types/spotBilling';

const s = require('./BillSpotFormSpotsToAdd.css');

interface SpotBillFormSpotAdded extends SpotBillFormSpot {
    justAdded: boolean;
}

interface BillSpotFormSpotsToAddProps extends AppOnlyStoreState {
    projectCampaignId: number;
    remainingSpotsToBill: SpotBillFormSpot[];
}

@inject('store')
@observer
export class BillSpotFormSpotsToAdd extends React.Component<BillSpotFormSpotsToAddProps, {}> {
    @observable added: SpotBillFormSpotAdded[] = [];

    @computed private get combinedRemainingAndAddedSpots(): SpotBillFormSpotAdded[] {
        return this.added
            .map(addedSpot => ({
                ...addedSpot,
                justAdded: true,
            }))
            .concat(
                this.props.remainingSpotsToBill
                    .filter(
                        remainingSpot =>
                            this.added.findIndex(addedSpot => addedSpot.spotId === remainingSpot.spotId) === -1
                    )
                    .map(remainingSpot => ({
                        ...remainingSpot,
                        justAdded: false,
                    }))
            )
            .sort((spotA, spotB) => {
                if (spotA.spotId > spotB.spotId) {
                    return -1;
                } else if (spotA.spotId < spotB.spotId) {
                    return 1;
                } else {
                    return 0;
                }
            });
    }

    public render() {
        if (this.props.remainingSpotsToBill.length <= 0 && this.added.length <= 0) {
            return <Paragraph type="dim">No spots are available to be added to this bill.</Paragraph>;
        }

        return (
            <div className={s.list}>
                {this.combinedRemainingAndAddedSpots.map(spot => (
                    <Tag
                        key={spot.spotId}
                        onTagClick={this.handleAddSpot(spot)}
                        title={spot.spotName}
                        isTitleDim={spot.justAdded}
                        otherLabels={
                            spot.justAdded
                                ? [
                                      {
                                          text: 'In bill',
                                      },
                                  ]
                                : []
                        }
                    />
                ))}
            </div>
        );
    }

    @action
    private handleAddSpot = (spot: SpotBillFormSpotAdded) => e => {
        if (this.added.findIndex(addedSpot => addedSpot.spotId === spot.spotId) === -1) {
            SpotToBillFormActions.addSpotToBill(spot.spotId);
            this.added.push(spot);
        }
    };
}
