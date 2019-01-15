import { observer } from 'mobx-react';
import * as React from 'react';
import { BillTimeEntry } from 'types/spotBilling';

interface Props {
    timeEntry: BillTimeEntry;
}

@observer
export class BillSpotTimeEntryRow extends React.Component<Props, {}> {
    public render() {
        return null;
    }
}
