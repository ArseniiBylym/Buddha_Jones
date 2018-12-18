import * as classNames from 'classnames';
import { capitalize as _capitalize } from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';

// Styles
const s = require('./Paragraph.css');

// Props
interface ParagraphProps {
    className?: string | null;
    style?: React.CSSProperties | null;
    align?: 'left' | 'center' | 'right' | null;
    float?: 'none' | 'left' | 'right';
    type?: 'default' | 'white' | 'brown' | 'dim' | 'blue' | 'alert' | 'success';
    size?: 'default' | 'normal' | 'small';
    bold?: boolean;
}

@observer
export class Paragraph extends React.Component<ParagraphProps, {}> {
    static get defaultProps(): ParagraphProps {
        return {
            className: null,
            style: null,
            align: null,
            float: 'none',
            type: 'default',
            size: 'default',
            bold: false,
        };
    }

    public render() {
        return (
            <p
                className={classNames(this.props.className, {
                    [s['type' + _capitalize(this.props.type)]]: this.props.type !== 'default',
                    [s['size' + _capitalize(this.props.size)]]: this.props.size !== 'default',
                    [s.styleBold]: this.props.bold,
                })}
                style={{
                    ...{
                        textAlign: this.props.align ? this.props.align : null,
                        float: this.props.float !== 'none' ? this.props.float : null,
                    },
                    ...(this.props.style && typeof this.props.style === 'object' && this.props.style),
                }}
            >
                {this.props.children}
            </p>
        );
    }
}
