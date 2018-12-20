import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Redirect } from 'react-router';
import { UserActions } from 'actions';

// Props
interface UserLogoutProps {}

// Component
@observer
export class UserLogout extends React.Component<UserLogoutProps, {}> {
    @observable private loggingOut: boolean = true;

    public componentDidMount() {
        this.logOut();
    }

    public render() {
        return this.loggingOut ? <div /> : <Redirect to="/user/login" />;
    }

    private logOut = async () => {
        try {
            await UserActions.logout();
            this.loggingOut = false;
        } catch (error) {
            // TODO fix this kind of error handling all over the project
            setTimeout(() => {
                this.logOut();
            }, 512);
            throw error;
        }
    };
}
