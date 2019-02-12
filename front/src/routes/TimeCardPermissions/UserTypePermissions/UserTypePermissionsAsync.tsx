import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const UserTypePermissionsAsync = Loadable({
    loader: () => import('./UserTypePermissions'),
    loading: () => <LoadingPage />,
});
