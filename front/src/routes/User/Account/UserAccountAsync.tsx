import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const UserAccountAsync = Loadable({
    loader: () => import('./UserAccount'),
    loading: () => <LoadingPage />,
});
