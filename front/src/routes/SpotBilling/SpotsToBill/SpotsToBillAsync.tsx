import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const SpotsToBillAsync = Loadable({
    loader: () => import('./SpotsToBill'),
    loading: () => <LoadingPage />,
});
