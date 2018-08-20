import * as React from 'react';
import { Provider } from 'mobx-react';
import { Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { store } from './store/AllStores';

// Styles
require('./App.css');

// Routes
import { Start } from './routes/Start';
import { Layout } from './components/Layout';
import { UserLogin, UserLogout } from './routes/User';
import { ErrorPage401, ErrorPage404 } from 'routes/ErrorPages';

// Initialize history
export const history = createBrowserHistory();

// Initialize application
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route path="/" exact={true} component={Start} />
                        <Route path="/portal" component={Layout} />
                        <Route path="/user/login" exact={true} component={UserLogin} />
                        <Route path="/user/logout" exact={true} component={UserLogout} />
                        <Route path="/not-allowed" exact={true} component={ErrorPage401} />
                        <Route component={ErrorPage404} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
