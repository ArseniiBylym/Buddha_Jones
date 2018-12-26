import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const SpotsToGraphicsAsync = Loadable({
    loader: () => import('./SpotsToGraphics'),
    loading: () => <LoadingPage />,
});
