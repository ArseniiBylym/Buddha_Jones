import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../../Loading/LoadingPage';

export const ActivityDefinitionFormAsync = Loadable({
    loader: () => import('./ActivityDefinitionForm'),
    loading: () => <LoadingPage />,
});
