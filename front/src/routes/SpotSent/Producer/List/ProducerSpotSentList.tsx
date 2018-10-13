import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderActions, SpotSentActions } from 'actions';
import { ButtonAdd, ButtonEdit } from 'components/Button';
import { history } from 'App';
import { computed } from 'mobx';
import { SpotSentStore } from '../../../../store/AllStores';
import { Col, Row, Section } from '../../../../components/Section';
import { LoadingSpinner } from '../../../../components/Loaders';
import { Table, TableCell, TableRow } from '../../../../components/Table';
import { Paragraph } from '../../../../components/Content';
import { SpotSentAllSpotsSentSpotData } from '../../../../types/spotSent';
import { Checkmark } from '../../../../components/Form';

// Styles
require('./ProducerSpotSentList.css');

// Props
interface ProducerSpotSentListProps {
}

// Component
@inject('store')
@observer
class ProducerSpotSentList extends React.Component<ProducerSpotSentListProps, {}> {

    @computed
    private get essentialDataIsLoading(): boolean {
        return SpotSentStore.spotSentAllSpotsLoading;
    }

    public componentDidMount() {
        this.fetchAllSpotSent();
        HeaderActions.setMainHeaderTitlesAndElements('Spots sent', null, null, null, [
            <ButtonAdd
                key="create-spot-sent"
                onClick={this.handleCreateSpotSentReport}
                label="Create new spot sent report"
                labelOnLeft={true}
                isWhite={true}
            />,
        ]);
    }

    public render() {
        return this.essentialDataIsLoading === true ? (
            <>
                {this.getTableWithLoadingSpinner()}
            </>
        ) : (SpotSentStore.spotSentAllSpots && SpotSentStore.spotSentAllSpots.length > 0) ? (
            <Section
                noSeparator={true}
                title="Spots sent"
            >
                {this.getTableWithData()}
            </Section>
        ) : (
            <Paragraph type="dim">No spots sent exist yet.</Paragraph>
        );
    }

    private handleCreateSpotSentReport = (e: React.MouseEvent<HTMLButtonElement>): void => {
        history.push('/portal/studio/producer-spot-sent/report');
    };

    private fetchAllSpotSent(): void {
        SpotSentActions.fetchAllSpots(true);
    }

    private getTableWithLoadingSpinner(): JSX.Element {
        return (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner size={64} />
                </Col>
            </Row>
        );
    }

    private getTableWithData(): JSX.Element {
        if (SpotSentStore.spotSentAllSpots && SpotSentStore.spotSentAllSpots.length > 0) {
            let tableHeaders: Array<{
                title: string;
                align?: 'left' | 'center' | 'right';
            }> = [];
            let tableColumnsWidths: string[] = [];
            let spotTitles: string[] = Object.keys(SpotSentStore.spotSentAllSpots[0]);
            spotTitles.map((objectKey: string, ind: number) => {
                let columnsWidth: number = 100 / spotTitles.length;
                tableHeaders.push({
                    title: (SpotSentStore.spotSentAllSpots) ? SpotSentStore.spotSentAllSpots[0][objectKey].title : 'N/A',
                    align: (ind === 0) ? 'left' : (ind === (spotTitles.length - 1)) ? 'right' : 'center'
                });
                tableColumnsWidths.push(Math.round(columnsWidth) + '%');
            });
            let tableRowsArr: JSX.Element[] = SpotSentStore.spotSentAllSpots.map((spot: SpotSentAllSpotsSentSpotData, index: number) => {
                let tableCellsArr: JSX.Element[] = Object.keys(spot).map((objectKey: string, ind: number) => {
                    let checkMark: JSX.Element = (
                        <Checkmark
                            checked={(spot[objectKey].name === 1) ? true : false}
                            type={'no-icon'}
                        />
                    );
                    let editButton: JSX.Element = (
                        <>
                            {spot[objectKey].name}
                            <ButtonEdit
                                label="Edit"
                                labelOnLeft={false}
                                float="right"
                            />
                        </>
                    );
                    return (
                        <TableCell
                            key={`${objectKey}-${ind}`}
                            align={(ind === 0) ? 'left' : (ind === (Object.keys(spot).length - 1)) ? 'right' : 'center'}
                        >
                            {objectKey === 'finishRequest' ? (
                                checkMark
                            ) : objectKey === 'changed' ? (
                                editButton
                            ) : (
                                spot[objectKey].name
                            )}
                        </TableCell>
                    );
                });
                return (
                    <TableRow key={`spot-${index}`}>
                        {tableCellsArr}
                    </TableRow>
                );
            });
            return (
                <Table
                    header={tableHeaders}
                    columnsWidths={tableColumnsWidths}
                >
                    {tableRowsArr}
                </Table>
            );
        } else {
            return (
                <></>
            );
        }
    }
}

export default ProducerSpotSentList;
