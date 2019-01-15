import * as classNames from 'classnames';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

const s = require('./CardContentTable.css');

interface Props {
    className?: string;
    classNameForHeader?: string;
    classNameForBody?: string;
    gridTemplateColumns?: string;
    header?: Array<{
        title: string;
        align?: 'left' | 'center' | 'right';
    }>;
}

@observer
export class CardContentTable extends React.Component<Props, {}> {
    @computed private get gridTemplateColumns(): string {
        if (this.props.gridTemplateColumns) {
            return this.props.gridTemplateColumns;
        }

        if (this.props.header && this.props.header.length > 0) {
            return this.props.header.map(col => 'auto').join(' ');
        }

        return 'auto';
    }

    public render() {
        return (
            <div
                className={classNames(s.table, this.props.className)}
                style={{ gridTemplateColumns: this.gridTemplateColumns }}
            >
                {this.props.header && this.props.header.length > 0 && (
                    <div className={classNames(s.header, this.props.classNameForHeader)}>
                        {this.props.header.map((headColumn, index) => (
                            <div key={index} style={headColumn.align ? { textAlign: headColumn.align } : undefined}>
                                <p>{headColumn.title}</p>
                            </div>
                        ))}
                    </div>
                )}

                {this.props.children && (
                    <div className={classNames(s.body, this.props.classNameForBody)}>{this.props.children}</div>
                )}
            </div>
        );
    }
}
