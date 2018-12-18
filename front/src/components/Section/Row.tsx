import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';

// Styles
require('./RowCol.css');

// Props
interface RowProps {
    innerRef?: (ref: HTMLDivElement) => void;
    id?: string | undefined;
    className?: string | null;
    style?: React.CSSProperties | null;
    removeMargins?: boolean;
    removeGutter?: boolean;
    doWrap?: boolean;
    justifyContent?:
    | 'inherit'
    | 'initial'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | null;
    alignContent?:
    | 'inherit'
    | 'initial'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'stretch'
    | null;
    alignItems?:
    | 'inherit'
    | 'initial'
    | 'stretch'
    | 'baseline'
    | 'center'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | null;
}

@observer
export class Row extends React.Component<RowProps, {}> {
    static get defaultProps(): RowProps {
        return {
            className: null,
            id: undefined,
            style: null,
            removeMargins: false,
            removeGutter: false,
            doWrap: false,
            justifyContent: null,
            alignContent: null,
            alignItems: null,
        };
    }

    public render() {
        return (
            <div
                ref={this.referenceRowDiv}
                id={this.props.id}
                className={classNames(
                    'row',
                    {
                        rowWrap: this.props.doWrap,
                        rowNoGutter: this.props.removeGutter,
                        rowNoMargins: this.props.removeMargins,
                    },
                    this.props.className
                )}
                style={{
                    ...((this.props.justifyContent || this.props.alignContent || this.props.alignItems) ? {
                        justifyContent: this.props.justifyContent || undefined,
                        alignContent: this.props.alignContent || undefined,
                        alignItems: this.props.alignItems || undefined,
                    } : {}),
                    ...(this.props.style ? this.props.style : {}),
                }}
            >
                {this.props.children}
            </div>
        );
    }

    private referenceRowDiv = (ref: HTMLDivElement) => {
        if (this.props.innerRef) {
            this.props.innerRef(ref);
        }
    };
}
