import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../Loading/LoadingPage';

export const SpotsPostAsync = Loadable({
    loader: () => import('./SpotsPost'),
    loading: () => <LoadingPage />,
});
