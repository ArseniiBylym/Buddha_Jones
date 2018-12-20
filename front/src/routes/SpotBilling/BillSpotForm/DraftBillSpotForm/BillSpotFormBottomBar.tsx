import { ButtonClose } from 'components/Button';
import { Paragraph } from 'components/Content';
import { BottomBar } from 'components/Layout';
import { LoadingIndicator } from 'components/Loaders';
import { Col, Row } from 'components/Section';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

const s = require('./BillSpotFormBottomBar.css');

enum DeleteStatus {
    None = 0,
    Deleting = 1,
    Success = 2,
    Error = -1,
}

interface Props {
    isSaving: boolean;
}

@observer
export class BillSpotFormBottomBar extends React.Component<Props, {}> {
    @observable private deleteStatus: DeleteStatus = DeleteStatus.None;

    @computed
    private get isEmpty(): boolean {
        return true;

        // return (
        //     this.props.bill === null ||
        //     (this.props.bill.firstStage.length <= 0 && this.props.bill.activities.length <= 0)
        // );
    }

    public render() {
        return (
            <BottomBar classNameInner={s.bottomBarInner} show={true}>
                <Row alignContent="center" alignItems="center">
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

                    <Col style={{ textAlign: 'right' }}>
                        <Paragraph type="dim" size="small">
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
