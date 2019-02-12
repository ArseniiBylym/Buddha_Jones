import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import * as React from 'react';

const s = require('./ButtonInBox.css');

interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    isDisabled?: boolean;
}

@observer
export class ButtonInBox extends React.Component<Props, {}> {
    static get defaultProps(): Props {
        return {
            onClick: () => undefined,
            className: undefined,
            isDisabled: false,
        };
    }

    public render() {
        return (
            <button
                tabIndex={!this.props.isDisabled ? undefined : -1}
                onClick={this.props.onClick}
                className={classNames(s.button, { [s.enabled]: !this.props.isDisabled }, this.props.className)}
            >
                {this.props.children}
            </button>
        );
    }
}
