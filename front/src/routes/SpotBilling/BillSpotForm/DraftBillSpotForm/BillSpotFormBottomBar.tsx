import { SpotToBillFormActions } from 'actions';
import { ButtonAdd, ButtonClose, ButtonSave } from 'components/Button';
import { Paragraph } from 'components/Content';
import { BottomBar } from 'components/Layout';
import { LoadingIndicator } from 'components/Loaders';
import { Col, Row } from 'components/Section';
import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillFormActivityTimeEntry, SpotBillFormSpot } from 'types/spotBilling';

const s = require('./BillSpotFormBottomBar.css');

enum DeleteStatus {
    None = 0,
    Deleting = 1,
    Success = 2,
    Error = -1,
}

interface Props extends AppOnlyStoreState {
    isBillSaving: boolean;
    spots: SpotBillFormSpot[];
}

@inject('store')
@observer
export class BillSpotFormBottomBar extends React.Component<Props, {}> {
    @observable private deleteStatus: DeleteStatus = DeleteStatus.None;

    @computed
    private get isEmpty(): boolean {
        return this.props.store!.spotToBillForm.rows.length <= 0;
    }

    @computed
    private get selectedActivities(): SpotBillFormActivityTimeEntry[] {
        return this.props.store!.spotToBillForm.selectedActivities;
    }

    @computed
    private get selectedActivitiesCount(): number {
        return this.props.store!.spotToBillForm.selectedActivitiesIds.length;
    }

    @computed
    private get isAnythingSelected(): boolean {
        return this.selectedActivitiesCount > 0;
    }

    public render() {
        const { addingActivityToBillStatus } = this.props.store!.spotToBillForm;

        return (
            <BottomBar
                classNameInner={s.bottomBarInner}
                show={true}
                showHeader={this.isAnythingSelected || addingActivityToBillStatus !== 'none'}
                header={
                    <Row justifyContent="center" alignContent="center" alignItems="center">
                        {addingActivityToBillStatus !== 'none' && (
                            <Col flex="0 1 auto">
                                {(addingActivityToBillStatus === 'saving' && (
                                    <LoadingIndicator label="Adding time entries to the bill" />
                                )) || (
                                    <Paragraph type={addingActivityToBillStatus === 'success' ? 'success' : 'alert'}>
                                        {addingActivityToBillStatus === 'success'
                                            ? 'Added time entries to the bill'
                                            : 'Could not add time entries to the bill'}
                                    </Paragraph>
                                )}
                            </Col>
                        )}

                        {this.isAnythingSelected && (
                            <Col flex="0 1 auto">
                                <Paragraph type="brown" size="small">{`Selected ${this.selectedActivitiesCount} ${
                                    this.selectedActivitiesCount > 1 ? 'time entries' : 'time entry'
                                }`}</Paragraph>
                            </Col>
                        )}

                        {this.isAnythingSelected && (
                            <Col flex="0 1 auto">
                                <ButtonAdd
                                    onClick={this.handleAddingToBill}
                                    label={
                                        'Add selected time ' +
                                        (this.selectedActivitiesCount > 1 ? 'entries' : 'entry') +
                                        ' to the bill'
                                    }
                                />
                            </Col>
                        )}
                    </Row>
                }
            >
                <Row className={s.baseRow} alignContent="center" alignItems="center">
                    <Col>
                        {(this.props.isBillSaving && (
                            <LoadingIndicator label="Saving bill draft" labelOnRight={true} />
                        )) ||
                            (this.isEmpty && (
                                <ButtonClose
                                    onClick={this.handleDeletingBill}
                                    label={
                                        this.deleteStatus === DeleteStatus.Success
                                            ? 'Bill has been removed'
                                            : this.deleteStatus === DeleteStatus.Error
                                            ? 'Could not delete, try again'
                                            : this.deleteStatus === DeleteStatus.Deleting
                                            ? 'Deleting the bill...'
                                            : 'Cancel this bill'
                                    }
                                    labelOnLeft={false}
                                    labelIsBold={true}
                                />
                            )) || <Paragraph type="success">Draft saved</Paragraph>}
                    </Col>

                    <Col>
                        {(this.isEmpty && (
                            <Paragraph align="right" type="dim" size="small">
                                Bill is empty. To save the bill add some items to it.
                            </Paragraph>
                        )) || (
                            <ButtonSave
                                onClick={this.handleOpeningBill}
                                label="Preview and finalize"
                                isSaving={false}
                                float="right"
                            />
                        )}
                    </Col>
                </Row>
            </BottomBar>
        );
    }

    private handleDeletingBill = e => {
        // tslint:disable-next-line:no-console
        console.log('TODO');

        if (!this.props.isBillSaving && this.deleteStatus < 1) {
            // TODO: Delete bill
        }
    };

    private handleAddingToBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        SpotToBillFormActions.addSelectedActivitiesToBillAsNewRow(this.selectedActivities);
    };

    private handleOpeningBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        SpotToBillFormActions.toggleBillPreview(true);
    };
}
