import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const TimeApprovalPermissionsAsync = Loadable({
    loader: () => import('./TimeApprovalPermissions'),
    loading: () => <LoadingPage />,
});
