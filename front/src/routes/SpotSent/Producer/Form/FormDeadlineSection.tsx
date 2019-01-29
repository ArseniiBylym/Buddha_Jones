import * as React from 'react';
// import { SpotSentActions } from 'actions';
// import { AppState } from '../../../../store/AllStores';
// import * as dateFormat from 'date-fns/format';
import { observer, inject } from 'mobx-react';
import { DatePicker, TimePicker } from 'components/Calendar';
import { observable, action } from 'mobx';

// Styles
const s = require('./ProducerSpotSentForm.css');

@inject('store')
@observer
class FormDeadlineSection extends React.PureComponent<any, any> {

    @observable deadlineDate: any = new Date();
    @observable deadlineTime: any = new Date().getHours() * 60 + new Date().getMinutes();

    @action
    private deadlineDateHandler = date => {
        this.props.dateHandler(date);
        this.deadlineDate = date;
    }

    @action
    private deadlineTimeHandler = date => {
        this.props.timeHandler(date);
        this.deadlineTime = date;
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        return (
            <div className={s.deadlineContainer} >
                <div className={s.deadlineContainer__date}>
                    <DatePicker
                        onChange={this.deadlineDateHandler}
                        type="field"
                        align="right"
                        value={this.deadlineDate}
                        noValueText="Unknown"
                        label="DATE"
                    />
                </div>
                <div className={s.deadlineContainer__time}>
                    <TimePicker
                        onChange={this.deadlineTimeHandler}
                        className={s.dateTimePicker}
                        label=""
                        totalMinutesValue={this.deadlineTime}
                        isOneLine={true}
                        isWhite={false}
                    />
                </div>
            </div>
        );
    }

}

export default FormDeadlineSection;
