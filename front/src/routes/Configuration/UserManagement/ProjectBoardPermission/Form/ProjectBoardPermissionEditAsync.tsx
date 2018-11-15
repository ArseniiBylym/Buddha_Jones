import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../../../Loading/LoadingPage';

export const ProjectBoardPermissionEditAsync = Loadable({
    loader: () => import('./ProjectBoardPermissionEdit'),
    loading: () => <LoadingPage />,
});
