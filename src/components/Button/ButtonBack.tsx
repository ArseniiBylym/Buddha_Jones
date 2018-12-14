import * as React from 'react';
import { observer } from 'mobx-react';
import { history } from '../../App';
import { Button, ButtonOnClickPropType } from '.';

// Styles
import { IconArrowLeftYellow } from '../Icons';

// Props
interface ButtonBackProps {
    onClick?: ButtonOnClickPropType;
    label?: string;
    labelOnLeft?: boolean;
}

// Component
@observer
export class ButtonBack extends React.Component<ButtonBackProps, {}> {
    static get defaultProps(): ButtonBackProps {
        return {
            onClick: null,
            label: 'Back',
            labelOnLeft: false,
        };
    }

    public render() {
        return (
            <Button
                onClick={this.handleClick}
                label={{
                    text: typeof this.props.label !== 'undefined' ? this.props.label : '',
                    color: 'white',
                    size: 'large',
                    onLeft: this.props.labelOnLeft,
                }}
                icon={{
                    size: 'small',
                    background: 'none-alt',
                    element: <IconArrowLeftYellow width={15} height={11} />,
                }}
            />
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (typeof this.props.onClick === 'function' && this.props.onClick) {
            this.props.onClick(e);
        } else {
            history.goBack();
        }
    };
}
