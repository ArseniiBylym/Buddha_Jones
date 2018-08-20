import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const ProjectsListAsync = Loadable({
    loader: () => import('./ProjectsList'),
    loading: () => <LoadingPage />,
});
