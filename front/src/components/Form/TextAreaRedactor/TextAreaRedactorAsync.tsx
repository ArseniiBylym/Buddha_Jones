import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../../routes/Loading/LoadingPage';

export const TextAreaRedactorAsync = Loadable({
    loader: () => import('./TextAreaRedactor'),
    loading: () => <LoadingPage />,
});