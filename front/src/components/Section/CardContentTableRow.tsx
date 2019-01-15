import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import * as React from 'react';

const s = require('./CardContentTable.css');

interface Props {
    className?: string;
    design?: 'default' | 'compact';
}

@observer
export class CardContentTableRow extends React.Component<Props, {}> {
    static get defaultProps(): Props {
        return {
            className: undefined,
            design: 'default',
        };
    }

    public render() {
        return (
            <div className={classNames(s.row, { [s.compact]: this.props.design === 'compact' }, this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}
