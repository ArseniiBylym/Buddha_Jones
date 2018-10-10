import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderActions, SpotSentActions } from 'actions';
import { ButtonAdd, ButtonEdit } from 'components/Button';
import { history } from 'App';
import { computed } from 'mobx';
import { SpotSentStore } from '../../../../store/AllStores';
import { Col, Row, Section } from '../../../../components/Section';
import { LoadingSpinner } from '../../../../components/Loaders';
import { UserType } from '../../../../types/users';
import { Table, TableCell, TableRow } from '../../../../components/Table';
import { Paragraph } from '../../../../components/Content';

// Styles
require('./ProducerSpotSentList.css');

// Props
interface ProducerSpotSentListProps {
}

// Component
@inject('store')
@observer
class ProducerSpotSentList extends React.Component<ProducerSpotSentListProps, {}> {

    /*@observable private userTypesArrFiltered: UserType[] | null = null;*/

    @computed
    private get essentialDataIsLoading(): boolean {
        if (SpotSentStore && SpotSentStore.spotSentAllSpotsLoading) {
            return SpotSentStore.spotSentAllSpotsLoading;
        }
        return true;
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
        return this.essentialDataIsLoading === false ? (
            <Section
                noSeparator={true}
                title="Spots sent"
            >
                {this.getTableWithData()}
            </Section>
        ) : (SpotSentStore.spotSentAllSpots && SpotSentStore.spotSentAllSpots.length) === 0 ? (
            <Paragraph type="dim">No spots sent exist yet.</Paragraph>
        ) : (
            <>
                {this.getTableWithLoadingSpinner()}
            </>
        );
        /*return <Paragraph type="dim">No spots sent exist yet.</Paragraph>;*/
    }

    private handleCreateSpotSentReport = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            /*let userTypesArr = (this.userTypesArrFiltered === null) ? this.props.store.users.types : this.userTypesArrFiltered;*/
            let tableRowsArr: JSX.Element[] = SpotSentStore.spotSentAllSpots.map((userType: UserType, ind: number) => {
                return (
                    <TableRow key={`user-type-${ind}`}>
                        <TableCell align="left">
                            {userType.name}
                        </TableCell>
                        <TableCell align="right">
                            <ButtonEdit
                                onClick={this.handlePermissionEdit(userType.id, userType.name)}
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
                        { title: 'User type', align: 'left' },
                        { title: 'Set permissions', align: 'right' }
                    ]}
                    columnsWidths={['70%', '30%']}
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
