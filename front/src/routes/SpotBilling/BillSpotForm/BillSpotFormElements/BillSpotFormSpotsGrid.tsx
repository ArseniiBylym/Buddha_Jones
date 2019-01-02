import { ButtonEdit } from 'components/Button';
import { Paragraph } from 'components/Content';
import { Card, Section } from 'components/Section';
import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillFormSpot } from 'types/spotBilling';
import { BillSpotFormSpotsGridTable } from './BillSpotFormSpotsGridTable';
import { BillSpotFormSpotsToAdd } from './BillSpotFormSpotsToAdd';

const s = require('./BillSpotFormSpotsGrid.css');

interface Props extends AppOnlyStoreState {
    spots: SpotBillFormSpot[];
    editable: boolean;
    campaignName: string;
    projectCampaignName: string | null;
    projectCampaignId: number;
}

@inject('store')
@observer
export class BillSpotFormSpotsGrid extends React.Component<Props, {}> {
    @observable private areSpotsInEditMode: boolean = false;

    @computed private get remainingSpotsToBill(): SpotBillFormSpot[] {
        const spotsAddedToBill: number[] =
            this.props.store && this.props.store.spotToBillForm.spotsAddedToBill
                ? this.props.store.spotToBillForm.spotsAddedToBill
                : [];

        return this.props.spots.filter(spot => spotsAddedToBill.findIndex(spotId => spotId === spot.spotId) === -1);
    }

    public render() {
        return (
            <React.Fragment>
                <Section title="Project and campaign summary" noSeparator={true}>
                    <Card
                        isExpandable={true}
                        title="View non-billable activities"
                        titleWhenExpanded="Hide non-billable activities"
                        classNameForContentAboveTitleBar={s.projectAndCampaignSummary}
                        contentAboveTitleBar={
                            <React.Fragment>
                                <div>
                                    <div className={s.titles}>
                                        <h3>14h 30min</h3>
                                        <h4>Non-billable project activities</h4>
                                    </div>
                                </div>

                                <div>
                                    <div className={s.titles}>
                                        <h3>6h 45min</h3>
                                        <h4>Non-billable campaign activities</h4>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                    />
                </Section>

                <Section
                    title="Spots to be billed"
                    headerElements={
                        this.props.editable
                            ? [
                                  {
                                      key: 'edit-button',
                                      element: (
                                          <ButtonEdit
                                              onClick={this.handleTogglingEditMode}
                                              label={this.areSpotsInEditMode ? 'Stop editing spots' : 'Edit spots'}
                                          />
                                      ),
                                  },
                              ]
                            : []
                    }
                >
                    <Card
                        isExpandable={false}
                        title={
                            this.areSpotsInEditMode && this.remainingSpotsToBill.length > 0
                                ? 'Pick spots to add to the bill from the list below:'
                                : undefined
                        }
                        classNameForContentAboveTitleBar={s.spotsGrid}
                        contentAboveTitleBar={
                            this.props.store!.spotToBillForm.spotsAddedToBill.length > 0 ? (
                                <BillSpotFormSpotsGridTable
                                    spots={this.props.spots}
                                    areSpotsInEditMode={this.areSpotsInEditMode}
                                    campaignName={this.props.campaignName}
                                    projectCampaignName={this.props.projectCampaignName}
                                />
                            ) : (
                                <Paragraph type="dim" className={s.noSpots}>
                                    No spots added to the bill. Edit spots to add at least single spot.
                                </Paragraph>
                            )
                        }
                    >
                        {this.areSpotsInEditMode && (
                            <BillSpotFormSpotsToAdd
                                projectCampaignId={this.props.projectCampaignId}
                                remainingSpotsToBill={this.remainingSpotsToBill}
                            />
                        )}
                    </Card>
                </Section>
            </React.Fragment>
        );
    }

    private handleTogglingEditMode = e => {
        this.areSpotsInEditMode = !this.areSpotsInEditMode;
    };
}
