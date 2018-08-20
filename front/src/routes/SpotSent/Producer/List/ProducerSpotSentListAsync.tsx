import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../../Loading/LoadingPage';

export const ProducerSpotSentListAsync = Loadable({
    loader: () => import('./ProducerSpotSentList'),
    loading: () => <LoadingPage />,
});
