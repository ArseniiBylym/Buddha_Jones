import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../../Loading/LoadingPage';

export const NewClientRequestListAsync = Loadable({
    loader: () => import('./NewClientRequestList'),
    loading: () => <LoadingPage />,
});
