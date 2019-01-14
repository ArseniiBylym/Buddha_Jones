import { ButtonClose } from 'components/Button';
import { Paragraph } from 'components/Content';
import { BottomBar } from 'components/Layout';
import { LoadingIndicator } from 'components/Loaders';
import { Col, Row } from 'components/Section';
import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';

const s = require('./BillSpotFormBottomBar.css');

enum DeleteStatus {
    None = 0,
    Deleting = 1,
    Success = 2,
    Error = -1,
}

interface Props extends AppOnlyStoreState {
    isSaving: boolean;
}

@inject('store')
@observer
export class BillSpotFormBottomBar extends React.Component<Props, {}> {
    @observable private deleteStatus: DeleteStatus = DeleteStatus.None;

    @computed
    private get isEmpty(): boolean {
        return (
            !this.props.store ||
            (this.props.store.spotToBillForm.firstStage.length <= 0 &&
                this.props.store.spotToBillForm.activities.length <= 0)
        );
    }

    @computed
    private get isAnythingSelected(): boolean {
        return this.props.store!.spotToBillForm.selectedActivitiesIds.length > 0;
    }

    public render() {
        return (
            <BottomBar
                classNameInner={s.bottomBarInner}
                show={true}
                showHeader={this.isAnythingSelected}
                header={
                    <Row justifyContent="center" alignContent="center" alignItems="center">
                        <Col flex="0 1 auto">
                            <p>Test</p>
                        </Col>
                    </Row>
                }
            >
                <Row className={s.baseRow} alignContent="center" alignItems="center">
                    <Col>
                        {(this.props.isSaving && <LoadingIndicator label="Saving bill draft" labelOnRight={true} />) ||
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
                        <Paragraph align="right" type="dim" size="small">
                            Bill is empty. To save the bill add some items to it.
                        </Paragraph>
                    </Col>
                </Row>
            </BottomBar>
        );
    }

    private handleDeletingBill = e => {
        // tslint:disable-next-line:no-console
        console.log('TODO');

        if (!this.props.isSaving && this.deleteStatus < 1) {
            // TODO: Delete bill
        }
    };
}
