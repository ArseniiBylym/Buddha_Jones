import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import * as React from 'react';

const s = require('./CardContentTable.css');

interface Props {
    className?: string;
}

@observer
export class CardContentTableRow extends React.Component<Props, {}> {
    public render() {
        return <div className={classNames(s.row, this.props.className)}>{this.props.children}</div>;
    }
}
