import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../../Loading/LoadingPage';

export const ProjectBoardPermissionListAsync = Loadable({
    loader: () => import('./ProjectBoardPermissionList'),
    loading: () => <LoadingPage />,
});
