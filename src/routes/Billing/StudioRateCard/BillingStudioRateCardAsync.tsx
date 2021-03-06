import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const BillingStudioRateCardAsync = Loadable({
    loader: () => import('./BillingStudioRateCard'),
    loading: () => <LoadingPage />,
});
