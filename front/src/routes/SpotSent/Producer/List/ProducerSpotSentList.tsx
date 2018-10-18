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
import * as dateFormat from 'date-fns/format';

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
                onClick={this.handleCreateSpotSentCreate}
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
            let spotTitles: string[] = Object.keys(SpotSentStore.spotSentAllSpots[0]);
            spotTitles.map((objectKey: string, ind: number) => {
                tableHeaders.push({
                    title: (SpotSentStore.spotSentAllSpots) ? SpotSentStore.spotSentAllSpots[0][objectKey].title : 'N/A',
                    align: (ind === 0) ? 'left' : (ind === (spotTitles.length - 1)) ? 'right' : 'center'
                });
            });
            let tableRowsArr: JSX.Element[] = SpotSentStore.spotSentAllSpots.map((spot: SpotSentAllSpotsSentSpotData, index: number) => {
                let tableCellsArr: JSX.Element[] = Object.keys(spot).map((objectKey: string, ind: number) => {
                    let checkMark: JSX.Element = (
                        <Checkmark
                            checked={(spot[objectKey].name === 1) ? true : false}
                            type={'no-icon'}
                        />
                    );
                    let editBlock: JSX.Element = (
                        <ButtonEdit
                            onClick={this.handleSpotSentDetails.bind(this, parseInt(spot[objectKey].name, 0))}
                            label="Edit"
                            labelOnLeft={false}
                        />
                    );
                    return (
                        <TableCell
                            key={`${objectKey}-${ind}`}
                            align={(ind === 0) ? 'left' : 'center'}
                        >
                            {objectKey === 'finishRequest' ? (
                                checkMark
                            ) : objectKey === 'changed' ? (
                                dateFormat(spot[objectKey].name, 'MM/DD/YY hh:ss')
                            ) : objectKey === 'edit' ? (
                                editBlock
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
                    columnsWidths={['15%', '15%', '15%', '10%', '10%', '15%', '15%', '5%']}
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

    private handleCreateSpotSentCreate = (e: React.MouseEvent<HTMLButtonElement>): void => {
        history.push('/portal/studio/producer-spot-sent-details/create');
    };

    private handleSpotSentDetails = (id: number, e: React.MouseEvent<HTMLButtonElement>): void => {
        history.push('/portal/studio/producer-spot-sent-details/' + id);
    };

}

export default ProducerSpotSentList;
