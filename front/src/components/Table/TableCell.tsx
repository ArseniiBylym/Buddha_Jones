import * as React from 'react';
import * as classNames from 'classnames';
import capitalize from 'lodash-es/capitalize';
import { observer } from 'mobx-react';

// Styles
const s = require('./TableCell.css');

// Props
interface TableCellProps {
    className?: string | null;
    align?: 'left' | 'center' | 'right';
    colSpan?: number;
}

@observer
export class TableCell extends React.Component<TableCellProps, {}> {
    static get defaultProps(): TableCellProps {
        return {
            className: null,
            align: undefined,
            colSpan: 1,
        };
    }

    public render() {
        return (
            <td
                className={classNames({
                    [s['align' + capitalize(this.props.align)]]: this.props.align ? true : false,
                }, this.props.className)}
                colSpan={this.props.colSpan && this.props.colSpan > 1 ? this.props.colSpan : undefined}
            >
                {this.props.children}
            </td>
        );
    }
}
