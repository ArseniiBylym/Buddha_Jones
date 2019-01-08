import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const SpotsToEDLAsync = Loadable({
    loader: () => import('./SpotsToEDL'),
    loading: () => <LoadingPage />,
});
