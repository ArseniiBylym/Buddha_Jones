import { HeaderActions, SpotsBillingActions } from 'actions';
import { history } from 'App';
import { ButtonBack } from 'components/Button';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppState } from 'store/AllStores';

@inject('store')
@observer
export default class BillSpotForm extends React.Component<AppState, {}> {
    componentDidMount() {
        HeaderActions.replaceMainHeaderContent({
            title: 'Mowgli',
            subTitle: 'Netflix',
            elements: [
                <ButtonBack
                    key="back-button"
                    label="Back to projects board"
                    onClick={this.handleNavigatingBackToSpotsToBillList}
                />,
            ],
        });
    }

    public render() {
        return null;
    }

    handleNavigatingBackToSpotsToBillList = e => {
        history.push(SpotsBillingActions.constructSpotsToBillUrl());
    };
}
