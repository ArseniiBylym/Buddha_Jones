import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const ProjectCreateAsync = Loadable({
    loader: () => import('./ProjectCreate'),
    loading: () => <LoadingPage />,
});
