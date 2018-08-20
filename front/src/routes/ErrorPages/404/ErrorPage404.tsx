import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { AppState } from 'store/AllStores';

// Styles
const s = require('../ErrorPages.css');
const buddhaJonesLogo = require('../../../assets/images/logos/buddha-jones-logo-large.png');

// Props
interface ErrorPage404Props extends AppState {}

// Component
@inject('store')
@observer
export class ErrorPage404 extends React.Component<ErrorPage404Props, {}> {
    constructor(props: ErrorPage404Props) {
        super(props);
    }

    public render() {
        return (
            <div className={s.wrapper}>
                <img className={s.logo} src={buddhaJonesLogo} />
                <div className={s.container}>
                    <h1>
                        <strong>404</strong>: Page not found
                    </h1>
                    <p>The page you have requested could not be retreived</p>
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
