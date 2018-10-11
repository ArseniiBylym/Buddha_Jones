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
            let tableRowsArr: JSX.Element[] = SpotSentStore.spotSentAllSpots.map((spot: SpotSentAllSpotsSentSpotData, index: number) => {
                return (
                    <TableRow key={`spot-${index}`}>
                        <TableCell align="left">
                            {spot.project.name}
                        </TableCell>
                        <TableCell align="center">
                            {spot.campaign.name}
                        </TableCell>
                        <TableCell align="center">
                            {spot.spot.name}
                        </TableCell>
                        <TableCell align="center">
                            {spot.version.name}
                        </TableCell>
                        <TableCell align="center">
                            {spot.finishRequest.name}
                        </TableCell>
                        <TableCell align="center">
                            {spot.status.name}
                        </TableCell>
                        <TableCell align="right">
                            {spot.changed.name}
                            <ButtonEdit
                                label="Edit"
                                labelOnLeft={false}
                                float="right"
                            />
                        </TableCell>
                    </TableRow>
                );
            });
            return (
                <Table
                    header={[
                        { title: 'Project', align: 'left' },
                        { title: 'Campaign', align: 'center' },
                        { title: 'Spot', align: 'center' },
                        { title: 'Version', align: 'center' },
                        { title: 'Finish Request', align: 'center' },
                        { title: 'Status', align: 'center' },
                        { title: 'Last update', align: 'right' },
                    ]}
                    columnsWidths={['14%', '14%', '14%', '14%', '14%', '14%', '14%']}
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
