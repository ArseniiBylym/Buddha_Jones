import { SpotToBillFormActions } from 'actions';
import { Paragraph } from 'components/Content';
import { Modal } from 'components/Modals';
import { StringHandler } from 'helpers/StringHandler';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry, SpotBillFormSpot } from 'types/spotBilling';

const s = require('./BillSpotPreview.css');

interface Props extends AppOnlyStoreState {
    billId: number;
    spots: SpotBillFormSpot[];
    unbilledProjectTimeEntries: BillTimeEntry[];
    unbilledProjectCampaignTimeEntries: BillTimeEntry[];
    editable: boolean;
    projectName: string;
    campaignName: string;
    projectCampaignName: string | null;
    projectCampaignId: number;
    studioName: string;
}

@inject('store')
@observer
export class BillSpotPreview extends React.Component<Props, {}> {
    public render() {
        const { billId, spots, projectName, campaignName, projectCampaignName, studioName } = this.props;
        const { showBillPreview } = this.props.store!.spotToBillForm;

        return (
            <Modal
                show={showBillPreview}
                closeButton={true}
                closeButtonLabel="Close preview"
                onClose={this.closeBillPreview}
                noPadding={true}
                size="content-wide"
                forceLongContent={true}
                topBarTitle={'Preview of bill #' + billId}
                classNameForTopBar={s.topBar}
            >
                <div className={s.summary}>
                    <div className={s.left}>
                        {spots.length > 0 && (
                            <Paragraph className={s.spots}>
                                <span>{spots.length > 1 ? 'Spots: ' : 'Spot: '}</span>
                                {spots.map(spot => (
                                    <strong key={spot.spotId}>{spot.spotName}</strong>
                                ))}
                            </Paragraph>
                        )}

                        <Paragraph className={s.campaign}>
                            <span>Campaign: </span>
                            <strong>
                                {StringHandler.constructProjectCampaignName(campaignName, projectCampaignName)}
                            </strong>
                            <span> — </span>
                            <strong>{projectName}</strong>
                        </Paragraph>
                    </div>

                    <Paragraph className={s.studio}>
                        <em>for </em>
                        <strong>{studioName}</strong>
                    </Paragraph>
                </div>
            </Modal>
        );
    }

    private closeBillPreview = () => {
        SpotToBillFormActions.toggleBillPreview(false);
    };
}
