import * as React from 'react';
import { AppState } from 'store/AllStores';
import { ClientsActions, NewClientRequest } from 'actions';
import { inject, observer } from 'mobx-react';
import { action, computed, observable } from 'mobx';
import { Table, TableCell, TableRow } from '../../../../components/Table';
import { ButtonEdit } from '../../../../components/Button';
import { Paragraph } from '../../../../components/Content';
import { LoadingSpinner } from '../../../../components/Loaders';
import { Col, Row } from '../../../../components/Section';
import { NewCustomerForm } from '../../../Project/Board/CustomerSelector/CustomerForm';
import { HeaderActions, NewCustomerFormData } from '../../../../actions';

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
            <>
                {this.getTableWithData()}
            </>
        ) : (
            <>
                {this.getTableWithLoadingSpinner()}
            </>
        );
    }

    @action
    private initNewClientRequestIsEdit = (): void => {
        if (this.props.store) {
            this.newClientRequestIsEdit = this.props.store.clients.newClientsRequestList.map((clientRequest: NewClientRequest) => {
                return {
                    id: clientRequest.id as number,
                    isEdit: false
                };
            });
        }
    };

    @action
    private handleNewClientRequestEdit = (ind: number): void => {
        if (this.newClientRequestIsEdit && this.newClientRequestIsEdit[ind]) {
            this.newClientRequestIsEdit[ind].isEdit = !this.newClientRequestIsEdit[ind].isEdit;
        }
    };

    private setHeaderAndInitialData = async (forceFetch: boolean = false) => {

        // Fetch required data
        await ClientsActions.fetchNewClientList(forceFetch);

        // Assign default values for newClientRequestIsEdit
        this.initNewClientRequestIsEdit();

        // Set header
        HeaderActions.setMainHeaderTitlesAndElements(
            'New Clients',
            null,
            null
        );

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
                <TableCell colSpan={5} align="center">
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
                                {(clientRequest[key]) ? clientRequest[key] : 'N/A'}
                            </TableCell>
                        );
                });
                return (
                    <React.Fragment key={`tablerow-${ind}`}>
                        <TableRow>
                            {tableCellsArr}
                            {this.newClientRequestIsEdit.length > 0 && this.newClientRequestIsEdit[ind] && !this.newClientRequestIsEdit[ind].isEdit &&
                                <TableCell align="right">
                                    <ButtonEdit
                                        onClick={this.handleNewClientRequestEdit.bind(this, ind)}
                                        label="Edit"
                                        labelOnLeft={false}
                                        float="right"
                                    />
                                </TableCell>
                            }
                        </TableRow>
                        {this.newClientRequestIsEdit.length > 0 && this.newClientRequestIsEdit[ind] && this.newClientRequestIsEdit[ind].isEdit &&
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <NewCustomerForm
                                        onToggleEditMode={this.handleNewClientRequestEdit.bind(this, ind)}
                                        onSaved={(formData: NewCustomerFormData) => {
                                            Object.keys(formData).forEach((key: string) => {
                                                clientRequest[key] = formData[key];
                                            });
                                        }}
                                        studioId={null}
                                        mode={'approvalForm'}
                                        formData={clientRequest}
                                        isAddedToSap={(clientRequest.completed === 1) ? true : false}
                                    />
                                </TableCell>
                            </TableRow>
                        }
                    </React.Fragment>
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
                        : this.getTableWithNoDataText()
                    }
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
