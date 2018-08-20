import * as React from 'react';
import { observer } from 'mobx-react';

// Props
interface ClearFixProps {}

// Component
@observer
export class ClearFix extends React.Component<ClearFixProps, {}> {
    public render() {
        return <br style={{ clear: 'both' }} />;
    }
}
