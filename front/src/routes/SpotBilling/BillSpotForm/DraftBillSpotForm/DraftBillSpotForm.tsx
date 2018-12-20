import { observer } from 'mobx-react';
import * as React from 'react';
import { SpotBillFormSummary } from 'types/spotBilling';
import { BillSpotFormProjectHistory } from '../BillSpotFormElements';

interface Props {
    bill: SpotBillFormSummary;
}

@observer
export class DraftBillSpotForm extends React.Component<Props, {}> {
    public render() {
        const { bill } = this.props;

        return (
            <React.Fragment>
                <BillSpotFormProjectHistory projectHistory={bill.projectBillsHistory} />

                {/* <BillSpotFormSpotsGrid /> */}

                {/* <BillSpotFormBottomBar isSaving={false} /> */}
            </React.Fragment>
        );
    }
}
