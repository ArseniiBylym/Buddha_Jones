import * as React from 'react';
import { observer } from 'mobx-react';
import { HeaderSection } from 'components/Section';
import { TimeEntryCalendarHeader, TimeEntryCalendarColumns } from '.';

// Styles
const s = require('./TimeEntryCalendar.css');

interface TimeEntryCalendarProps {}

@observer
export class TimeEntryCalendar extends React.Component<TimeEntryCalendarProps, {}> {
    public render() {
        return (
            <HeaderSection className={s.headerSection} hasMarginOnBottom={true}>
                <TimeEntryCalendarHeader />
                <TimeEntryCalendarColumns />
            </HeaderSection>
        );
    }
}
