import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { AppState } from 'store/AllStores';

// Styles
const s = require('../ErrorPages.css');
const buddhaJonesLogo = require('../../../assets/images/logos/buddha-jones-logo-large.png');

// Props
interface ErrorPage401Props extends AppState {}

// Component
@inject('store')
@observer
export class ErrorPage401 extends React.Component<ErrorPage401Props, {}> {
    constructor(props: ErrorPage401Props) {
        super(props);
    }

    public render() {
        return (
            <div className={s.wrapper}>
                <img className={s.logo} src={buddhaJonesLogo} />
                <div className={s.container}>
                    <h1>Page not allowed</h1>
                    <p>You are not authorized to access the request page</p>
                    <button onClick={this.handleBackButtonClick}>Go back to previous page</button>
                </div>
            </div>
        );
    }

    private handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!this.props.history) {
            return;
        }

        this.props.history.goBack();
    };
}
