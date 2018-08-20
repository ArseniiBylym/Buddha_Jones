import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../../Loading/LoadingPage';

export const ProducerSpotSentFormAsync = Loadable({
    loader: () => import('./ProducerSpotSentForm'),
    loading: () => <LoadingPage />,
});
