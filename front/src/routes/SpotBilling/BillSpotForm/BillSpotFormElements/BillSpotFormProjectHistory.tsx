import { formatMoney } from 'accounting';
import { SpotsBillingActions } from 'actions';
import { history } from 'App';
import { Person } from 'components/Buddha';
import { Button } from 'components/Button';
import { Paragraph } from 'components/Content';
import { IconArrowLeftYellow, IconArrowRightYellow } from 'components/Icons';
import { Col, HeaderSection, Row } from 'components/Section';
import { DateHandler } from 'helpers/DateHandler';
import { StringHandler } from 'helpers/StringHandler';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import AnimateHeight from 'react-animate-height';
import { ProjectBillsHistoryEntry } from 'types/spotBilling';

const s = require('./BillSpotFormProjectHistory.css');

interface Props {
    projectHistory: ProjectBillsHistoryEntry[];
}

@observer
export class BillSpotFormProjectHistory extends React.Component<Props, {}> {
    @observable private historyIsExpanded: boolean = false;

    public render() {
        const { projectHistory } = this.props;

        return (
            <HeaderSection hasMarginOnBottom={true}>
                <Row>
                    <Col>
                        <p>
                            Project's other bills: <strong>{projectHistory.length}</strong>
                        </p>
                    </Col>
                    <Col>
                        {(projectHistory.length > 0 || this.historyIsExpanded) && this.renderToggleHistoryButton()}
                    </Col>
                </Row>

                <AnimateHeight height={this.historyIsExpanded ? 'auto' : 0}>
                    <div>
                        <hr className={s.separator} />

                        <Row>
                            <Col>
                                <table>
                                    <tbody>
                                        {projectHistory.map(entry => (
                                            <tr key={entry.billId}>
                                                <td>
                                                    <Paragraph bold={true}>Bill #{entry.billId}</Paragraph>
                                                </td>
                                                <td>
                                                    <Paragraph>{entry.billStatusName}</Paragraph>
                                                </td>
                                                <td>
                                                    <Person
                                                        textOfLabelOnLeft="by"
                                                        personName={StringHandler.constructUserName(
                                                            entry.createdByUsername,
                                                            entry.createdByUserFirstName,
                                                            entry.createdByUserLastName
                                                        )}
                                                        personImage={entry.createdByUserImage}
                                                        showPersonNameOnLeft={false}
                                                        showSmallPersonImage={true}
                                                        showDarkPersonImage={true}
                                                    />
                                                </td>
                                                <td>
                                                    <Paragraph align="right">
                                                        {'Created ' +
                                                            DateHandler.printAsTimeAgoFromNow(
                                                                DateHandler.parseDateStringAsDateObject(entry.createdAt)
                                                            ) +
                                                            ' ago'}
                                                    </Paragraph>
                                                </td>
                                                <td>
                                                    <Paragraph align="right">
                                                        {'Amount: ' + formatMoney(entry.billTotal)}
                                                    </Paragraph>
                                                </td>
                                                <td>
                                                    <Button
                                                        float="right"
                                                        onClick={this.goToOtherBill(entry.billId)}
                                                        label={{
                                                            text: 'View bill',
                                                            color: 'white',
                                                            size: 'large',
                                                            isBold: false,
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </div>
                </AnimateHeight>
            </HeaderSection>
        );
    }

    private renderToggleHistoryButton = () => {
        return (
            <Button
                onClick={this.handleNavigatingToProjectBillsHistory}
                float="right"
                label={{
                    text: (this.historyIsExpanded ? 'Hide' : 'View') + ` project's billing history`,
                    onLeft: !this.historyIsExpanded,
                    color: 'yellow',
                    size: 'small',
                }}
                icon={{
                    size: 'nopadding',
                    background: 'none',
                    element: this.historyIsExpanded ? (
                        <IconArrowLeftYellow width={15} height={11} />
                    ) : (
                        <IconArrowRightYellow width={15} height={11} />
                    ),
                }}
            />
        );
    };

    @action
    private handleNavigatingToProjectBillsHistory = e => {
        this.historyIsExpanded = !this.historyIsExpanded;
    };

    private goToOtherBill = (billId: number) => e => {
        history.push(SpotsBillingActions.constructSpotToBillFormUrl(billId));
    };
}
