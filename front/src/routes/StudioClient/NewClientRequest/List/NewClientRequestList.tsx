import * as React from 'react';
import { AppState } from 'store/AllStores';
import { ClientsActions } from 'actions';
import { inject, observer } from 'mobx-react';
import { action, computed, observable } from 'mobx';
import { Table, TableCell, TableRow } from '../../../../components/Table';
import { ButtonEdit } from '../../../../components/Button';
import { Paragraph } from '../../../../components/Content';
import { LoadingSpinner } from '../../../../components/Loaders';
import { Col, Row, Section } from '../../../../components/Section';
import { NewClientRequest } from '../../../../types/clients';

@inject('store')
@observer
class NewClientRequestList extends React.Component<AppState, {}> {

    @observable private newClientRequestIsEdit: Array<{id: number, isEdit: boolean}> = [];

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

    @action
    private initNewClientRequestIsEdit = (): void => {
        if (this.props.store) {
            this.newClientRequestIsEdit = this.props.store.clients.newClientsRequestList.map((clientRequest: NewClientRequest, ind: number) => {
                newClientRequestIsEdit
            });
        }
    };

    private setHeaderAndInitialData = (): void => {
        // Fetch required data
        ClientsActions.fetchNewClientList();

        if (this.props.store) {
            this.newClientRequestIsEdit = this.props.store.clients.newClientsRequestList.map((clientRequest: NewClientRequest, ind: number) => {
                newClientRequestIsEdit
            });
        }

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

    // Render loading spinner
    private getTableWithLoadingSpinner(): JSX.Element {
        return (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner size={64}/>
                </Col>
            </Row>
        );
    }

    // Render no data message
    private getTableWithNoDataText(): JSX.Element {
        return (
            <TableRow>
                <TableCell colSpan={2} align="center">
                    <Paragraph type="dim" align="center">
                        There are no new client requests.
                    </Paragraph>
                </TableCell>
            </TableRow>
        );
    }

    // render table data
    private getTableWithData(): JSX.Element {
        if (this.props.store) {
            let tableRowsArr: JSX.Element[] = this.props.store.clients.newClientsRequestList.map((clientRequest: NewClientRequest, ind: number) => {
                let tableCellsArr: JSX.Element[] =
                    Object.keys(clientRequest)
                    .filter((key: string) => {
                        return this.isTableTitles(key);
                    })
                    .map((key: string) => {
                        return (
                            <TableCell key={`tablecell-${key}-${ind}`} align="left">
                                {clientRequest[key]}
                            </TableCell>
                        );
                });
                return (
                    <>
                        <TableRow key={`tablerow-${ind}`}>
                            {tableCellsArr}
                            <TableCell align="right">
                                <ButtonEdit
                                    onClick={this.handleNewClientRequestEdit}
                                    label="Edit"
                                    labelOnLeft={false}
                                    float="right"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow key={`tablerow-${ind}`}>
                            <TableCell colSpan={5}>

                            </TableCell>
                        </TableRow>
                    </>
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
                    {
                        (this.props.store.clients.newClientsRequestList && this.props.store.clients.newClientsRequestList.length > 0 )
                        ? tableRowsArr
                        : this.getTableWithNoDataText
                    }
                </Table>
            );
        } else {
            return (
                <></>
            );
        }
    }

    private handleNewClientRequestEdit = (): void => {
        debugger;
    };

}

export default NewClientRequestList;
