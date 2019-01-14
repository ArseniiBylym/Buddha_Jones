import * as React from 'react';
import * as classNames from 'classnames';
import capitalize from 'lodash-es/capitalize';
import { observer } from 'mobx-react';

// Styles
const s = require('./TableRow.css');

// Props
interface TableRowProps {
    id?: string;
    className?: string | null;
    type?: 'default' | 'highlight' | 'subrow' | 'border' | 'compact';
    onClick?: (id?: any) => void;
}

@observer
export class TableRow extends React.Component<TableRowProps, {}> {
    static get defaultProps(): TableRowProps {
        return {
            id: undefined,
            className: null,
            type: 'default',
        };
    }

    public render() {
        return (
            <tr
                id={this.props.id}
                className={classNames(s['row' + capitalize(this.props.type)], this.props.className)}
                onClick={this.props.onClick ? this.props.onClick : () => null}
            >
                {typeof this.props.children !== 'undefined' ? this.props.children : null}
            </tr>
        );
    }
}
