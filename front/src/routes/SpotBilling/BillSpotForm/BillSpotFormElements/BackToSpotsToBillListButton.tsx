import { SpotsBillingActions } from 'actions';
import { ButtonBack } from 'components/Button';
import { observer } from 'mobx-react';
import * as React from 'react';
import { history } from '../../../../App';

// Props
interface BackToSpotsToBillListButtonProps {}

// Component
@observer
export class BackToSpotsToBillListButton extends React.Component<BackToSpotsToBillListButtonProps, {}> {
    constructor(props: BackToSpotsToBillListButtonProps) {
        super(props);
    }

    public render() {
        return <ButtonBack key="back-button" label="Back to billing" onClick={this.handleNavigating} />;
    }

    private handleNavigating = e => {
        history.push(SpotsBillingActions.constructSpotsToBillUrl());
    };
}
