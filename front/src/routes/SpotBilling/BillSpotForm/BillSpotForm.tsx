import { HeaderActions, SpotsBillingActions } from 'actions';
import { history } from 'App';
import { Button, ButtonBack } from 'components/Button';
import { IconArrowRightYellow } from 'components/Icons';
import { Col, HeaderSection, Row } from 'components/Section';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppState } from 'store/AllStores';

@inject('store')
@observer
export default class BillSpotForm extends React.Component<AppState, {}> {
    componentDidMount() {
        HeaderActions.replaceMainHeaderContent({
            title: 'Mowgli',
            subTitle: 'Netflix',
            elements: [
                <ButtonBack
                    key="back-button"
                    label="Back to billing"
                    onClick={this.handleNavigatingBackToSpotsToBillList}
                />,
            ],
        });
    }

    public render() {
        return (
            <React.Fragment>
                <HeaderSection hasMarginOnBottom={true}>
                    <Row>
                        <Col>
                            <p>
                                Project's previous bills: <strong>2</strong>
                            </p>
                        </Col>
                        <Col>
                            <Button
                                onClick={this.handleNavigatingToProjectBillsHistory}
                                float="right"
                                label={{
                                    text: `View project's billing history`,
                                    onLeft: true,
                                    color: 'yellow',
                                    size: 'small',
                                }}
                                icon={{
                                    size: 'nopadding',
                                    background: 'none',
                                    element: <IconArrowRightYellow width={15} height={11} />,
                                }}
                            />
                        </Col>
                    </Row>
                </HeaderSection>
            </React.Fragment>
        );
    }

    handleNavigatingBackToSpotsToBillList = e => {
        history.push(SpotsBillingActions.constructSpotsToBillUrl());
    };

    handleNavigatingToProjectBillsHistory = e => {
        // TODO
    };
}
