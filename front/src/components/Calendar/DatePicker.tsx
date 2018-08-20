import * as React from 'react';
import * as classNames from 'classnames';
import * as dateIsValidDate from 'date-fns/is_valid';
import * as dateFormat from 'date-fns/format';
import { observer } from 'mobx-react';
import { DropdownContainerTypeProp, DropdownContainer, DropdownContainerAlignProp } from '../Form';
import { DayPickerCalendar } from '.';
import { IconTickWhite } from '../Icons';
import { Button } from '../Button';

// Styles
const s = require('./DatePicker.css');

// Props
interface DatePickerProps {
    onChange?: ((date: Date | null) => void) | null;
    closeOnChange?: boolean;
    className?: string | null;
    align?: DropdownContainerAlignProp;
    type?: DropdownContainerTypeProp;
    label?: string;
    value: Date | null;
    maxDate?: Date;
    minDate?: Date;
    noValueText?: string;
    isAmerican?: boolean;
    isWhite?: boolean;
    minWidth?: number;
    maxWidth?: number;
}

@observer
export class DatePicker extends React.Component<DatePickerProps, {}> {
    private dropdownContainer: DropdownContainer | null = null;

    static get defaultProps(): DatePickerProps {
        return {
            onChange: null,
            closeOnChange: false,
            className: null,
            align: 'left',
            type: 'oneline',
            label: '',
            value: null,
            noValueText: '',
            isAmerican: true,
            isWhite: false,
            minWidth: 318,
            maxWidth: 318,
        };
    }

    public render() {
        return (
            <DropdownContainer
                ref={this.referenceDropdownContainer}
                className={classNames(this.props.className)}
                minWidth={this.props.minWidth}
                maxWidth={this.props.maxWidth}
                maxLabelOnlyWidth={1152}
                align={this.props.align}
                type={this.props.type}
                label={this.props.label || ''}
                isWhite={this.props.isWhite}
                value={
                    this.props.value !== null && dateIsValidDate(this.props.value)
                        ? this.props.isAmerican
                            ? dateFormat(this.props.value, 'MM/DD/YYYY')
                            : dateFormat(this.props.value, 'DD.MM.YYYY')
                        : this.props.noValueText || ''
                }
            >
                <DayPickerCalendar
                    onChange={this.handleDateChange}
                    value={this.props.value}
                    maxDate={this.props.maxDate}
                    minDate={this.props.minDate}
                />

                <div className={s.summary}>
                    <Button
                        onClick={this.handleDropdownConfirmation}
                        label={{
                            text:
                                this.props.value !== null && dateIsValidDate(this.props.value)
                                    ? dateFormat(this.props.value, 'MMMM D, YYYY')
                                    : '',
                            size: 'large',
                            color: 'blue',
                            onLeft: true,
                        }}
                        icon={{
                            element: <IconTickWhite width={12} height={9} />,
                            size: 'small',
                            background: 'green',
                        }}
                    />
                </div>
            </DropdownContainer>
        );
    }

    private referenceDropdownContainer = (ref: DropdownContainer) => (this.dropdownContainer = ref);

    private handleDropdownConfirmation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (this.dropdownContainer && typeof this.dropdownContainer.closeDropdown === 'function') {
            this.dropdownContainer.closeDropdown();
        }
    };

    private handleDateChange = (date: Date | null) => {
        if (this.props.onChange) {
            this.props.onChange(date);
        }

        if (
            this.props.closeOnChange &&
            this.dropdownContainer &&
            typeof this.dropdownContainer.closeDropdown === 'function'
        ) {
            this.dropdownContainer.closeDropdown();
        }
    };
}
