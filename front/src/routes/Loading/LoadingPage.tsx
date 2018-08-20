import * as React from 'react';
import { LoadingBar } from '../../components/Loaders';

// Props
interface LoadingPageProps {}

// Component
export class LoadingPage extends React.Component<LoadingPageProps, {}> {
    public render() {
        return (
            <div>
                <LoadingBar size="big" />
            </div>
        );
    }
}
