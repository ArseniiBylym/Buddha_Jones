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
                        { title: 'Date', align: 'center' },
                        { title: 'Project', align: 'center' },
                        { title: 'Spot type', align: 'center', colSpan: 2 },
                        { title: 'Trt', align: 'center', colSpan: 1 },
                        { title: 'Title', align: 'center', colSpan: 1 },
                        { title: 'Ver', align: 'center' },
                        { title: 'Status', align: 'center' },
                        { title: 'Editor', align: 'center' },
                        { title: 'To', align: 'center', colSpan: 2 },
                        { title: 'Time', align: 'center' },
                        { title: 'Notes', align: 'center', colSpan: 2 },
                    ]}
                >
                    {this.props.config && this.props.config.length > 0 && this.getTable()}
                </Table>
            </div>
        );
    }

    private getEditors = (editors) => {
        if (editors.length > 3) {
            editors = editors.slice(0, 3);
            // editors[2].name = editors[2].name + '...';
            editors.push({name: '...'});
        }
        return editors.map(item => <div key={item.name}>{item.name}</div>);
    }

    private getCustomerContacts = (contacts) => {
        if (contacts.length > 3) {
            contacts = contacts.slice(0, 3);
            // contacts[2].name = contacts[2].name + '...';
            contacts.push({name: '...'});
        }
        return contacts.map(item => <div key={item.name}>{item.name}</div>);
    }

    private spotClickHandler = (id) => e =>  {
        // console.log(id);
        history.push('/portal/studio/producer-spot-sent-details/' + id + '/spotPost');
    }

    private getTable = () => {
        return this.props.config.map(spot => (
            
                <TableRow className="spotPost__finishRequest" key={spot.spotSentId} onClick={this.spotClickHandler(spot.spotSentRequestId)}>
                    <TableCell colSpan={1} align="center">{spot.spotSentDate && moment(spot.spotSentDate.date).format('DD/MM/YYYY')}</TableCell>
                    <TableCell colSpan={1} align="center">{spot.projectName}</TableCell>
                    <TableCell colSpan={2} align="center">{spot.campaignName} ({spot.runtime})</TableCell>
                    <TableCell colSpan={1} align="center">({spot.runtime})</TableCell>
                    <TableCell colSpan={1} align="center">{spot.spotName} {spot.finishRequest && <span>FINISH</span>}</TableCell>
                    <TableCell colSpan={1} align="center">{spot.versionName}</TableCell>
                    <TableCell colSpan={1} align="center">{spot.spotLineStatus}</TableCell>
                    <TableCell colSpan={1} align="center"><div className={s.editorsContainer}>{this.getEditors(spot.editors)}</div></TableCell>
                    <TableCell colSpan={2} align="center"><div className={s.editorsContainer}>{this.getCustomerContacts(spot.customerContacts)}</div></TableCell>
                    <TableCell colSpan={1} align="center">{spot.spotSentDate && moment(spot.spotSentDate.date).format('HH:mm')}</TableCell>
                    <TableCell colSpan={2} align="center">{spot.internalNote}</TableCell>
                </TableRow>
        ));
    }
}

export default SpotsPostTable;