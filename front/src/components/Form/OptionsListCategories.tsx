import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { isEqual as _isEqual } from 'lodash';
import { CheckmarkSquare } from './CheckmarkSquare';

// Styles
// const s = require('./OptionsList.css');

@observer
class OptionsListCategories extends React.Component<any, any> {

    @observable private listChecked: boolean = false;
    @observable private optionsList: any = [];

    @action 
    private listCheckHandler = () => {
        if (this.listChecked) {
            let tempList = this.optionsList.slice();
            tempList.forEach(elem => {
                elem.selected = false;
            });
            this.optionsList = tempList;

        } else {
            let tempList = this.optionsList.slice();
            tempList.forEach(elem => {
                elem.selected = true;
            });
            this.optionsList = tempList;

        }
        this.listChecked = !this.listChecked;
    }

    @action 
    private optionClickHandler = (item, index) => e => {
        this.selectItem(item.key, index);
    }

    @action
    private initializeOptions = (list) => {
        this.optionsList = list;
    }

    @action
    private selectItem = (key, index) => {
        let tempList = this.optionsList.slice();
        tempList[index].selected = tempList[index].selected ? false : true;
        this.optionsList = tempList;
    }

    componentDidMount = () => {
        let options = this.props.config.options.slice();
        options.forEach(option => {
            option.selected = false;
        });
        this.initializeOptions(options);
    }
    
    componentWillUnmount = () => {
        let checkedOptions = this.optionsList.filter(item => {
            return item.selected === true;
        });

        if (checkedOptions && checkedOptions.length > 0) {
            this.props.addOptions(checkedOptions);
        }
    }
    
    // Render
    render() {

        if (!this.optionsList) {
            return null;
        }

        return (
            <div>
            <div className="optionsListCategories__label" >
                <CheckmarkSquare onClick={this.listCheckHandler} checked={this.listChecked} type="no-icon" label={this.props.config.categoryName} labelOnLeft={false}/>
            </div>
            <ul className="optionsListCategories__wrapper">
                {this.optionsList.map((item, i) => {
                    return (
                        <li key={item.label} className="optionsListCategories__item" onClick={this.optionClickHandler(item, i)}>
                            {item.selected && <div className="optionsListCategories__checkmark" />}
                            <div className="optionsListCategories__elem">{item.label}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
}

export default OptionsListCategories;
