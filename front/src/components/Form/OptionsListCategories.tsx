import * as React from 'react';
import { observer } from 'mobx-react';
import { isEqual as _isEqual } from 'lodash';
import { CheckmarkSquare } from './CheckmarkSquare';

// Styles
const s = require('./OptionsList.css');

export const OptionsListCategories: any = observer((props: any) => {

    // Render
    return (
        <div>
            <div className="optionsListCategories__label">
                <CheckmarkSquare checked={false} label={props.config.categoryName} labelOnLeft={false}/>
            </div>
            <ul className="optionsListCategories__wrapper">
                {props.config.options.map((item, i) => {
                    return (
                        <li key={item.label} className="optionsListCategories__item">
                            <div className="optionsListCategories__elem">{item.label}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});
