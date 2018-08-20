import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const ProjectsBoardAsync = Loadable({
    loader: () => import('./ProjectBoard'),
    loading: () => <LoadingPage />,
});
