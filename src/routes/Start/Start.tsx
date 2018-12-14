import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { AppOnlyStoreState } from 'store/AllStores';
import { Redirect } from 'react-router';

// Props
interface StartProps {}

// Component
@inject('store')
@observer
export class Start extends React.Component<StartProps & AppOnlyStoreState, {}> {
    public render() {
        return <Redirect to="/portal" />;
    }
}
