import * as React from 'react';
import * as classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import { Input } from 'components/Form';
import { Button } from 'components/Button';
import { AppState } from 'store/AllStores';
import { LoginStatus } from 'types/statuses';
import { LoginField } from 'types/login';
import { UserActions } from 'actions';
import { history } from 'App';

// Styles
const s = require('../Authentication.css');
const buddhaJonesLogoLarge = require('./../../../assets/images/logos/buddha-jones-logo-large.png');

// Props
interface UserLoginProps {}

// Component
@inject('store')
@observer
export class UserLogin extends React.Component<UserLoginProps & AppState, {}> {
    public render() {
        if (!this.props.store) {
            return null;
        }

        const { login, user } = this.props.store;

        return (
            <div className={s.page}>
                <div className={s.container}>
                    <div className={s.wrapper}>
                        <div className={s.header}>
                            <img src={buddhaJonesLogoLarge} alt="Buddha Jones" />
                            <h1
                                className={classNames({
                                    [s.error]:
                                        login.status === LoginStatus.Error ||
                                        login.status === LoginStatus.ErrorBothFieldsRequired,
                                })}
                            >
                                {login.status === LoginStatus.ErrorBothFieldsRequired
                                    ? 'Both username and password are required'
                                    : login.status === LoginStatus.Error ? 'Could not login' : 'Login to Buddha Jones'}
                            </h1>
                        </div>

                        <form className={s.form}>
                            <Input
                                className={s.firstField}
                                maxWidth={768}
                                color={login.statusIsError ? 'red' : 'brown'}
                                type="text"
                                label="Username"
                                autoFocus={true}
                                value={login.username}
                                onChange={this.handleLoginFieldsChange('username')}
                            />
                            <Input
                                className={s.lastField}
                                maxWidth={768}
                                color={login.statusIsError ? 'red' : 'brown'}
                                type="password"
                                label="Password"
                                value={login.password}
                                onChange={this.handleLoginFieldsChange('password')}
                            />

                            <Button
                                onClick={this.handleSubmitLogin}
                                className={s.button}
                                isInBox={true}
                                label={{
                                    text: login.status === LoginStatus.SigningIn ? 'Signing in' : 'Sign in',
                                    size: 'large',
                                    color: 'blue',
                                }}
                            />
                        </form>

                        <div className={s.footer}>
                            {/*
                                <Button
                                    onClick={this.handleForgotPassword}
                                    align="center"
                                    label={{
                                        text: 'Forgot your password?',
                                        size: 'small',
                                        color: 'black',
                                        onLeft: false
                                    }}
                                />
                            */}
                        </div>
                    </div>
                </div>

                {user.isLoggedIn && (
                    <Redirect
                        to={
                            history &&
                            history.location &&
                            history.location.state &&
                            typeof history.location.state['from'] !== 'undefined' &&
                            history.location.state['from'] &&
                            history.location.state['from'] !== '/'
                                ? history.location.state['from']
                                : '/portal'
                        }
                    />
                )}
            </div>
        );
    }

    private handleLoginFieldsChange = (type: LoginField) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (
            this.props.store &&
            typeof e !== 'undefined' &&
            typeof e.target !== 'undefined' &&
            typeof e.target.value !== 'undefined' &&
            typeof type !== 'undefined'
        ) {
            this.props.store.login[type] = e.target.value;
        }
    };

    private handleSubmitLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!this.props.store) {
            return;
        }

        try {
            UserActions.login(this.props.store.login.username, this.props.store.login.password);
        } catch (error) {
            throw error;
        }
    };

    /*
    private handleForgotPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        // TODO: Implement forgot password login
    }
    */
}
