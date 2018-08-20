import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const TimeEntryAsync = Loadable({
    loader: () => import('./TimeEntry'),
    loading: () => <LoadingPage />,
});
