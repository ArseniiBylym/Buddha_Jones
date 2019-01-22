import * as React from 'react';
import { Table, TableRow, TableCell } from 'components/Table';
import * as moment from 'moment';
import { history } from 'App';

const s = require('./SpotsPost.css');

class SpotsPostTable extends React.Component<any, any> {
    render() {
        return (
            <div className={s.tableContainer}>
                <Table
                    header={[
                        { title: 'Date', align: 'left' },
                        { title: 'Project', align: 'left' },
                        { title: 'Campaign', align: 'left'},
                        { title: 'Trt', align: 'left' },
                        { title: 'Title', align: 'left' },
                        { title: 'Ver', align: 'left' },
                        { title: 'Editor', align: 'left' },
                        { title: 'To', align: 'left'},
                        { title: 'Time', align: 'left' },
                        { title: 'Notes', align: 'left'},
                        { title: 'Status', align: 'left' },
                    ]}
                >
                    {this.props.config && this.props.config.length > 0 && this.getTable()}
                </Table>
            </div>
        );
    }

    private getEditors = (editors) => {
        if (editors.length > 2) {
            editors = editors.slice(0, 2);
            editors.push({name: '...'});
        }
        return editors.map(item => <div key={item.name}>{item.name}</div>);
    }

    private getCustomerContacts = (contacts) => {
        if (contacts.length > 2) {
            contacts = contacts.slice(0, 2);
            contacts.push({name: '...'});
        }
        return contacts.map(item => <div key={item.name}>{item.name}</div>);
    }

    private spotClickHandler = (id) => e =>  {
        history.push('/portal/studio/producer-spot-sent-details/' + id + '/spotPost');
    }

    private getTable = () => {
        return this.props.config.map(spot => (
                <TableRow className="spotPost__finishRequest" key={spot.spotSentId} onClick={this.spotClickHandler(spot.spotSentRequestId)}>
                    <TableCell colSpan={1} align="left">{spot.spotSentDate && moment(spot.spotSentDate.date).format('DD/MM/YYYY')}</TableCell>
                    <TableCell colSpan={1} align="left">{spot.projectName}</TableCell>
                    <TableCell colSpan={1} align="left">{spot.campaignName}</TableCell>
                    <TableCell colSpan={1} align="left">({spot.runtime})</TableCell>
                    <TableCell colSpan={1} align="left">{spot.spotName} {spot.finishRequest && <span>F</span>}</TableCell>
                    <TableCell colSpan={1} align="left">{spot.versionName}</TableCell>
                    <TableCell colSpan={1} align="left"><div className={s.editorsContainer}>{this.getEditors(spot.editors)}</div></TableCell>
                    <TableCell colSpan={1} align="left"><div className={s.editorsContainer}>{this.getCustomerContacts(spot.customerContacts)}</div></TableCell>
                    <TableCell colSpan={1} align="left">{spot.spotSentDate && moment(spot.spotSentDate.date).format('HH:mm')}</TableCell>
                    <TableCell colSpan={1} align="left">{spot.internalNote}</TableCell>
                    <TableCell colSpan={1} align="left">{spot.spotLineStatus}</TableCell>
                </TableRow>
        ));
    }
}

export default SpotsPostTable;