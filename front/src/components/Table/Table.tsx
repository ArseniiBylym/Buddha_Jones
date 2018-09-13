import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import capitalize from 'lodash-es/capitalize';

// Styles
const s = require('./Table.css');

// Props
interface TableProps {
    className?: string | null;
    type?: 'default' | 'compact';
    title?: string | null;
    header?: Array<{
        title: string;
        align?: 'left' | 'center' | 'right';
        colSpan?: number;
    }> | null;
    columnsWidths?: string[] | null;
    footerRows?: JSX.Element[];
    removeFirstRowTopPadding?: boolean;
    removeLastRowBottomPadding?: boolean;
}

// Component
@observer
export class Table extends React.Component<TableProps, {}> {
    static get defaultProps(): TableProps {
        return {
            className: null,
            type: 'default',
            title: null,
            header: [],
            columnsWidths: [],
            footerRows: [],
            removeFirstRowTopPadding: false,
            removeLastRowBottomPadding: false,
        };
    }

    public render() {
        return (
            <div>
                {this.props.title && <h3 className={s.title}>{this.props.title}</h3>}

                <table
                    className={classNames(
                        {
                            [s.compact]: this.props.type === 'compact',
                            [s.noTopPadding]: this.props.removeFirstRowTopPadding,
                            [s.noBottomPadding]: this.props.removeLastRowBottomPadding,
                        },
                        this.props.className
                    )}
                >
                    {this.props.columnsWidths &&
                        this.props.columnsWidths.length > 0 && (
                            <colgroup>
                                {this.props.columnsWidths.map((colWidth, colIndex) => {
                                    return <col key={colIndex} width={colWidth} />;
                                })}
                            </colgroup>
                        )}

                    {this.props.header &&
                        this.props.header.length > 0 && (
                            <thead>
                                <tr>
                                    {this.props.header.map((theadCol, index) => {
                                        // Prepare thead column class
                                        let theadColClassName = '';
                                        if (typeof theadCol.align !== 'undefined') {
                                            theadColClassName += ' ' + s['align' + capitalize(theadCol.align)];
                                        }

                                        // Return thead column
                                        return (
                                            <th
                                                key={index}
                                                colSpan={theadCol.colSpan != null ? theadCol.colSpan : undefined}
                                                className={theadColClassName}
                                            >
                                                {theadCol.title}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                        )}

                    {typeof this.props.children !== 'undefined' &&
                        this.props.children !== null && <tbody>{this.props.children}</tbody>}

                    {this.props.footerRows &&
                        this.props.footerRows.length > 0 && <tfoot>{this.props.footerRows}</tfoot>}
                </table>
            </div>
        );
    }
}
