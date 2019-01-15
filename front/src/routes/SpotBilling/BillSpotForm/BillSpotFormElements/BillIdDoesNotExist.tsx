import { SpotsBillingActions } from 'actions';
import { DataFetchError } from 'components/Errors/DataFetchError';
import { observer } from 'mobx-react';
import * as React from 'react';
import { history } from '../../../../App';

// Props
interface BillIdDoesNotExistProps {}

// Component
@observer
export class BillIdDoesNotExist extends React.Component<BillIdDoesNotExistProps, {}> {
    constructor(props: BillIdDoesNotExistProps) {
        super(props);
    }

    public render() {
        return (
            <DataFetchError
                errorLabel="No bill of provided identifier exists"
                buttonLabel="Go back to spots to bill list and try again"
                onRefetch={this.handleNavigating}
            />
        );
    }

    private handleNavigating = () => {
        history.push(SpotsBillingActions.constructSpotsToBillUrl());
    };
}
