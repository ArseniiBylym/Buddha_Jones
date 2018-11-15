import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../../../Loading/LoadingPage';

export const UserManagementUsersListAsync = Loadable({
    loader: () => import('./UserManagementUsersList'),
    loading: () => <LoadingPage/>,
});
