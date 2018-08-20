import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { isEqual as _isEqual } from 'lodash';
import { OptionsListValuePropType, OptionsListOptionProp } from './OptionsList';

// Styles
const s = require('./OptionsList.css');

// Props
interface OptionsListOptionProps {
    option: OptionsListOptionProp;
    selectedValue: OptionsListValuePropType;
    selectedIcon: JSX.Element | null;
    onSelected: (
        option: { value: OptionsListValuePropType; label: string }
    ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Component
export const OptionsListOption: React.SFC<OptionsListOptionProps> = observer((props: OptionsListOptionProps) => {
    // Check if result is active
    let resultIsActive: boolean = false;
    if (typeof props.option.value !== 'undefined' && props.option.value !== null) {
        if (props.option.value === null) {
            resultIsActive = props.selectedValue === null;
        } else if (
            typeof props.option.value === 'object' &&
            props.option.value !== null &&
            Array.isArray(props.option.value) &&
            typeof props.option.value.some !== 'undefined'
        ) {
            resultIsActive = props.option.value.some(val => props.selectedValue === val);
        } else if (
            (typeof props.option.value === 'string' || typeof props.option.value === 'number') &&
            (typeof props.selectedValue === 'string' || typeof props.selectedValue === 'number') &&
            props.selectedValue !== null
        ) {
            resultIsActive =
                typeof props.selectedValue === 'number'
                    ? props.option.value === props.selectedValue
                    : typeof props.selectedValue === 'string' && typeof props.option.value === 'string'
                        ? props.selectedValue.indexOf(props.option.value) !== -1
                        : false;
        } else {
            resultIsActive = _isEqual(props.option.value, props.selectedValue);
        }
    }

    // Render
    return (
        <li
            className={classNames({
                activeResult: resultIsActive,
            })}
        >
            <button onClick={props.onSelected({ value: props.option.value, label: props.option.label })}>
                {resultIsActive && props.selectedIcon && <div className={s.optionIcon}>{props.selectedIcon}</div>}
                {typeof props.option.label !== 'undefined' && props.option.label
                    ? props.option.label
                    : typeof props.option.value === 'string' ? props.option.value : ''}
            </button>
        </li>
    );
});
