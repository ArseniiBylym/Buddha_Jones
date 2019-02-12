import * as classNames from 'classnames';
import { DateHandler } from 'helpers/DateHandler';
import { observer } from 'mobx-react';
import * as React from 'react';
import { computed } from 'mobx';

const s = require('./AdjustedMinutesAboveOrBelow.css');

interface Props {
    className?: string;
    style?: React.CSSProperties;
    minutes: number;
}

@observer
export class AdjustedMinutesAboveOrBelow extends React.Component<Props, {}> {
    @computed private get isPositive(): boolean {
        return this.props.minutes >= 0 ? true : false;
    }

    @computed private get adjustedMinutes(): number {
        return this.isPositive ? this.props.minutes : (this.props.minutes * -1);
    }

    public render() {
        return (
            <p
                style={this.props.style}
                className={classNames(
                    s.label,
                    {
                        [s.positive]: this.isPositive,
                        [s.negative]: this.isPositive === false,
                    },
                    this.props.className
                )}
            >
                <strong>
                    {(this.isPositive ? '+' : '-') +
                        DateHandler.convertTotalMinutesToHM(this.adjustedMinutes)}
                </strong>
            </p>
        );
    }
}
