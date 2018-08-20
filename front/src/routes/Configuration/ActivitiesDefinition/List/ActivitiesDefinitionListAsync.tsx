import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../../Loading/LoadingPage';

export const ActivitiesDefinitionListAsync = Loadable({
    loader: () => import('./ActivitiesDefinitionList'),
    loading: () => <LoadingPage />,
});
