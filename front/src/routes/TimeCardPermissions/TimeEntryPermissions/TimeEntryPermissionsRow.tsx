import * as React from 'react';
import { AppState } from 'store/AllStores';
import { inject, observer } from 'mobx-react';
import { history } from 'App';
import { TableCell, TableRow } from '../../../components/Table';
import { ButtonEdit } from '../../../components/Button';
import { Checkmark } from '../../../components/Form';
import { TimeEntryPermissionsActions } from '../../../actions';

interface Props {
    id: number;
    name: string;
    isChecked: boolean;
}

interface State {

}

@inject('store')
@observer
class TimeEntryPermissionsRow extends React.Component<Props & AppState, State> {
    public render() {
        const { name } = this.props;
        return(
            <TableRow>
                <TableCell align="left">
                    {name}
                </TableCell>
                <TableCell align="left">
                    <ButtonEdit
                        onClick={this.onEditClick}
                        label="Edit time card approval permissions"
                        labelOnLeft={true}
                        float="left"
                    />
                </TableCell>
                <TableCell align="right">
                    <Checkmark
                        onClick={this.handlePermissionChange}
                        checked={this.props.isChecked}
                        label={this.props.isChecked ? 'Allowed' : 'Not allowed'}
                        labelOnLeft={true}
                        type={'blue'}
                    />
                </TableCell>
            </TableRow>
        );
    }

    private handlePermissionChange = () => {
        TimeEntryPermissionsActions.changeTimeEntryPermission(this.props.id);
    }

    private onEditClick = () => history.push(`/portal/configuration/user-management/time-approval-permissions/${this.props.id}`);
}

export default TimeEntryPermissionsRow;