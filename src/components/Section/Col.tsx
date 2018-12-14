import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';

// Styles
require('./RowCol.css');

// Props
interface ColProps {
    onClick?: ((e: React.MouseEvent<HTMLDivElement>) => void) | null;
    onClickCapture?: ((e: React.MouseEvent<HTMLDivElement>) => void) | null;
    className?: string | null;
    style?: React.CSSProperties | null;
    minWidth?: number | null;
    maxWidth?: number | null;
    width?: number | null;
    removeGutter?: boolean;
    flex?: string | null;
    size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | null;
}

@observer
export class Col extends React.Component<ColProps, {}> {
    static get defaultProps(): ColProps {
        return {
            onClick: null,
            onClickCapture: null,
            className: null,
            style: null,
            minWidth: 0,
            maxWidth: 0,
            width: null,
            removeGutter: false,
            flex: null,
            size: null,
        };
    }

    public render() {
        return (
            <div
                onClick={this.handleColumnClick}
                onClickCapture={this.handleColumnClickCapture}
                style={{
                    ...{
                        minWidth:
                            typeof this.props.minWidth !== 'undefined' &&
                            this.props.minWidth !== null &&
                            this.props.minWidth > 0
                                ? this.props.minWidth + 'px'
                                : undefined,
                        maxWidth:
                            typeof this.props.maxWidth !== 'undefined' &&
                            this.props.maxWidth !== null &&
                            this.props.maxWidth > 0
                                ? this.props.maxWidth + 'px'
                                : undefined,
                        width: this.props.width !== null ? this.props.width + 'px' : undefined,
                        flex:
                            this.props.flex !== null
                                ? this.props.flex
                                : this.props.width !== null
                                    ? '0 1 auto'
                                    : undefined,
                    },
                    ...(this.props.style && this.props.style),
                }}
                className={classNames(
                    'col',
                    {
                        ['col' + (this.props.size !== null ? this.props.size : '')]: this.props.size !== null,
                        colNoGutter: this.props.removeGutter,
                    },
                    this.props.className
                )}
            >
                {this.props.children}
            </div>
        );
    }

    private handleColumnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    };

    private handleColumnClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this.props.onClickCapture) {
            this.props.onClickCapture(e);
        }
    };
}
