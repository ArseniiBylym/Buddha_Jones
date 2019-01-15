import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const TimeEntryPermissionsAsync = Loadable({
    loader: () => import('./TimeEntryPermissions'),
    loading: () => <LoadingPage />,
});
