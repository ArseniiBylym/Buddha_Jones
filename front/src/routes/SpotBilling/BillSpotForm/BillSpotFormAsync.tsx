import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from 'routes/Loading/LoadingPage';

export const BillSpotFormAsync = Loadable({
    loader: () => import('./BillSpotForm'),
    loading: () => <LoadingPage />,
});
