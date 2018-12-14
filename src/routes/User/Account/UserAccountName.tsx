import * as React from 'react';
import { observer } from 'mobx-react';
import { Col } from 'components/Section';

// Props
interface UserAccountNameProps {
    value: string;
    label: string;
}

// Component
@observer
export class UserAccountName extends React.Component<UserAccountNameProps, {}> {
    public render() {
        return (
            <Col size={0}>
                <p>
                    <span>{this.props.label}</span>
                    <br />
                    <strong>{this.props.value}</strong>
                </p>
            </Col>
        );
    }
}
