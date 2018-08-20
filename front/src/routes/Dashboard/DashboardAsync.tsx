import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../Loading/LoadingPage';

export const DashboardAsync = Loadable({
    loader: () => import('./Dashboard'),
    loading: () => <LoadingPage />,
});
