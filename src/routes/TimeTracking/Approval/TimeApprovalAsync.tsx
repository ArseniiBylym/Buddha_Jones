import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const TimeApprovalAsync = Loadable({
    loader: () => import('./TimeApproval'),
    loading: () => <LoadingPage />,
});
