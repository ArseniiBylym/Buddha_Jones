import * as React from 'react';
import { AppState } from 'store/AllStores';
import {ClientsActions, HeaderActions, UsersActions} from 'actions';
import { inject, observer } from 'mobx-react';
import { action, computed } from 'mobx';
import { Table, TableCell, TableRow } from '../../../../components/Table';
import { ButtonEdit } from '../../../../components/Button';
import { Paragraph } from '../../../../components/Content';
import { LoadingSpinner } from '../../../../components/Loaders';
import { Col, Row, Section } from '../../../../components/Section';
import {NewClientRequest} from "../../../../types/clients";

@inject('store')
@observer
class NewClientRequestList extends React.Component<AppState, {}> {

    @computed
    private get essentialDataIsLoading(): boolean {
        if (this.props.store) {
            return this.props.store.clients.newClientsRequestListLoading;
        }

        return true;
    }

    public componentDidMount(): void {
        this.setHeaderAndInitialData();
    }

    public render() {
        if (!this.props.store) {
            return null;
        }
        return this.essentialDataIsLoading === false ? (
            <Section
                noSeparator={true}
                title="New clients"
                headerElements={[]}
            >
                {this.getTableWithData()}
            </Section>
        ) : (
            <>
                {this.getTableWithLoadingSpinner()}
            </>
        );
    }

    private setHeaderAndInitialData = (): void => {
        // Fetch required data
        ClientsActions.fetchNewClientList();

/*        // Set header
        HeaderActions.setMainHeaderTitlesAndElements(
            'User Management',
            'Configuration',
            null,
            null
        );*/
    };

    private isTableTitles(title: string): boolean {
        if (
            title === 'studio_name'
            ||
            title === 'name'
            ||
            title === 'email'
            ||
            title === 'phone'
        ) {
            return true;
        } else {
            return false;
        }
    }

    private getTableWithLoadingSpinner(): JSX.Element {
        return (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner size={64}/>
                </Col>
            </Row>
        );
    }

    // render table data
    private getTableWithData(): JSX.Element {
        if (this.props.store) {
            let tableRowsArr: JSX.Element[] = this.props.store.clients.newClientsRequestList.map((clientRequest: NewClientRequest, ind: number) => {
                let tableCellsArr: JSX.Element[] = Object.keys(clientRequest).map((key: string) => {
                    if (this.isTableTitles(key)) {
                        return (
                            <TableCell align="left">
                                {clientRequest[key]}
                            </TableCell>
                        );
                    } else {
                        return null;
                    }
                });
                return (
                    <TableRow key={`user-type-${ind}`}>
                        
                    </TableRow>
                );
            });
            return (
                <Table
                    header={[
                        { title: 'Studio', align: 'left' },
                        { title: 'Client Name', align: 'left' },
                        { title: 'Email', align: 'left' },
                        { title: 'Phone', align: 'left' },
                        { title: '', align: 'left' },
                    ]}
                    columnsWidths={['22%', '22%', '22%', '22%', '12%']}
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

export default NewClientRequestList;
