import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const SpotsToQCAsync = Loadable({
    loader: () => import('./SpotsToQC'),
    loading: () => <LoadingPage />,
});
