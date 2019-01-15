import * as React from 'react';
import { AppState } from 'store/AllStores';
import { inject, observer } from 'mobx-react';
import { TableCell, TableRow } from '../../../components/Table';
import { Checkmark } from '../../../components/Form';
import { TimeApprovalPermissionsActions } from '../../../actions';

interface Props {
    id: number;
    submitterId: number;
    name: string;
    isChecked: boolean;
}

interface State {

}

@inject('store')
@observer
class TimeApprovalPermissionsRow extends React.Component<Props & AppState, State> {
    public render() {
        const { name } = this.props;
        return(
            <TableRow>
                <TableCell align="left">
                    {name}
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
        TimeApprovalPermissionsActions.changeTimeApprovalPermission(this.props.submitterId * 1, this.props.id);
    }
}

export default TimeApprovalPermissionsRow;