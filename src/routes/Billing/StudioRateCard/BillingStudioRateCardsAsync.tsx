import * as React from 'react';
import * as Loadable from 'react-loadable';
import { LoadingPage } from '../../Loading/LoadingPage';

export const BillingStudioRateCardsAsync = Loadable({
    loader: () => import('./BillingStudioRateCards'),
    loading: () => <LoadingPage />,
});
