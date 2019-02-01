import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import * as React from 'react';

const s = require('./ButtonPlusOrMinus.css');

interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    isPlus?: boolean;
    isDisabled?: boolean;
}

@observer
export class ButtonPlusOrMinus extends React.Component<Props, {}> {
    static get defaultProps(): Props {
        return {
            onClick: () => undefined,
            className: undefined,
            isPlus: true,
            isDisabled: false,
        };
    }

    public render() {
        return (
            <button
                onClick={this.props.onClick}
                tabIndex={!this.props.isDisabled ? undefined : -1}
                className={classNames(
                    s.button,
                    {
                        [s.plus]: this.props.isPlus,
                        [s.minus]: !this.props.isPlus,
                        [s.enabled]: !this.props.isDisabled,
                    },
                    this.props.className
                )}
            >
                <svg width={7} height={7}>
                    <rect x={0} y={3} width={7} height={1} />

                    {this.props.isPlus && <rect x={3} y={0} width={1} height={7} />}
                </svg>
            </button>
        );
    }
}
