import * as React from 'react';
import * as classNames from 'classnames';
import { capitalize as _capitalize } from 'lodash';
import { LoadingIndicator } from './../Loaders';
import { Input } from '.';
import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import { SearchHandler } from 'helpers/SearchHandler';
import { OptionsListOption } from './OptionsListOption';
import { ButtonSave } from 'components/Button';
import OptionsListCategories from './OptionsListCategories';

// Styles
const s = require('./OptionsList.css');

// Types
export type OptionsListValuePropType = boolean | string | number | null | Array<string | boolean | number> | object;
export type OptionsListAlignPropType = 'left' | 'center' | 'right';

export interface OptionsListOptionProp {
    key?: string;
    value: OptionsListValuePropType;
    label: string;
    typeName?: string;
}

// Props
interface OptionsListProps {
    className?: string | null;
    onChange?: ((option: { value: OptionsListValuePropType; label: string }) => void) | null;
    search?: {
        onChange?: (searchQuery: string) => void;
        useExternalAlgorithm?: boolean;
        autoFocus?: boolean;
        label?: string;
        value?: string;
    } | null;
    height?: number;
    align?: OptionsListAlignPropType;
    label?: string;
    value?: OptionsListValuePropType;
    specialOptionsBefore?: OptionsListOptionProp[];
    options?: OptionsListOptionProp[];
    specialOptionsAfter?: OptionsListOptionProp[];
    loadingOptions?: boolean;
    loadingOptionsLabel?: string;
    refreshingOptionsLabel?: string;
    noOptionsLabel?: string;
    highlightFirstOption?: boolean;
    selectedIcon?: JSX.Element | null;
    directHint?: {
        value: OptionsListValuePropType;
        label: string;
    } | null;
    multiselect?: boolean;
}

// Component
@observer
export class OptionsList extends React.Component<OptionsListProps, {}> {
    static get defaultProps(): OptionsListProps {
        return {
            className: null,
            onChange: null,
            search: null,
            height: 0,
            align: 'left',
            label: '',
            value: null,
            specialOptionsBefore: [],
            options: [],
            specialOptionsAfter: [],
            loadingOptions: false,
            loadingOptionsLabel: 'Loading',
            refreshingOptionsLabel: 'Refreshing',
            noOptionsLabel: 'No options',
            highlightFirstOption: false,
            selectedIcon: null,
            directHint: null,
            multiselect: false,
        };
    }

    private container: HTMLDivElement | null = null;

    @observable private height: number = 0;
    @observable private search: string = '';
    @observable private selectedList: any = [];
    @observable private saveStatus: boolean = false;

    @action
    private addToSelectedList = (item) => {
        this.selectedList.push(item);
    }

    @action
    private removeFromSelectedList = (item) => {
        const newList = this.selectedList.filter((elem: any, i) => {
            return elem.key !== item.key;
        });
        this.selectedList = newList;
    }

    @computed
    private get filteredOptions(): OptionsListOptionProp[] {
        if (this.props.search && this.props.search.useExternalAlgorithm) {
            return this.props.options || [];
        }

        const searchQuery = this.search.trim().toLowerCase();

        return typeof this.props.options !== 'undefined' && this.props.options
            ? searchQuery === ''
                ? this.props.options
                : this.props.options
                    .filter(option => {
                        return SearchHandler.searchPhraseInString(
                            typeof option.value === 'string'
                                ? option.value
                                : Array.isArray(option.value)
                                ? option.value.join(' ')
                                : option.label,
                            this.search,
                            true,
                            true
                        );
                    })
                    .sort((resultA, resultB) => {
                        const matchA = resultA.label.toLowerCase().indexOf(searchQuery);
                        const matchB = resultB.label.toLowerCase().indexOf(searchQuery);
                        return matchA !== -1 && matchB === -1 ? -1 : matchA === 1 && matchB !== -1 ? -1 : 0;
                    })
            : [];
    }

    @computed 
    private get filteredOptionsWithHeaders() {
        const options = this.filteredOptions;
        let categories: any = {};
        options.forEach((item: any, i) => {
            if (!categories[item.typeName]) {
                categories[item.typeName] = [];
                categories[item.typeName].push(item);
            } else {
                categories[item.typeName].push(item);
            }
        });
        let elements: any = [];
        for (let key in categories) {
            if (key) {
                let newElem = {
                    categoryName: key,
                    options: categories[key],
                };

                elements.push(newElem);
            }
        }
        return elements.map((elem, i) => {
            return (
                <OptionsListCategories 
                    key={elem.categoryName} 
                    config={elem} 
                    categoryClick={this.categoryClickHanderl}
                    optionClick={this.optionClickHandler}
                    addOptions={this.addOptionsList}
                />
            );
        });
    }

    private saveSelectionHandler = () => {
        this.saveStatus = true;
        window.document.body.click();
    }

    private addOptionsList = (list) => {
        if (this.saveStatus) {
            list.forEach(item => {
                this.handleSelectionChangeMultiselect({value: item.value, label: item.label});
            });
        }
    }

    private categoryClickHanderl = (elems) => {
        elems.forEach(item => {
            this.addToSelectedList(item);
        });
    }

    private optionClickHandler = (elem) => {
        const existedElem = this.selectedList.find(item => {
            return item.key === elem.key;
        });
        if (existedElem) {
            this.removeFromSelectedList(elem);
        } else {
            this.addToSelectedList(elem);
        }
    }

    @computed
    private get combinedOptions(): OptionsListOptionProp[] {
        return [
            ...(typeof this.props.specialOptionsBefore !== 'undefined' && Array.isArray(this.props.specialOptionsBefore)
                ? this.props.specialOptionsBefore
                : []),
            // ...this.filteredOptions,
            ...(this.props.multiselect ? this.filteredOptionsWithHeaders : this.filteredOptions),
            ...(typeof this.props.specialOptionsAfter !== 'undefined' && Array.isArray(this.props.specialOptionsAfter)
                ? this.props.specialOptionsAfter
                : []),
        ];
    }

    private listEvents: { type: string; handler: EventListenerOrEventListenerObject }[] = [];

    public componentDidMount() {
        if (this.props.search != null && this.props.search.value != null && this.props.search.value) {
            this.search = this.props.search.value;
        }

        if (this.container) {
            const containerParent = this.container.parentElement as HTMLDivElement;

            if (containerParent && containerParent.className.indexOf('dropdownGroup') !== -1) {
                const dropdownContainer = containerParent.parentElement as HTMLDivElement;
                if (dropdownContainer.className.indexOf('open') !== -1) {
                    containerParent.style.overflow = 'hidden';
                    this.height = containerParent.offsetHeight;
                }
            }
        }
    }

    public componentWillReceiveProps(nextProps: OptionsListProps) {
        if (
            (this.props.search == null &&
                nextProps.search != null &&
                nextProps.search.value != null &&
                nextProps.search.value !== null) ||
            (nextProps.search != null && nextProps.search.value != null && nextProps.search.value !== this.search) ||
            (this.props.search != null &&
                nextProps.search != null &&
                this.props.search.value != null &&
                nextProps.search.value != null &&
                this.props.search.value !== nextProps.search.value)
        ) {
            this.search = nextProps.search.value || '';
        }
    }

    public componentDidUpdate(prevProps: OptionsListProps) {
        if (
            typeof prevProps.options === 'undefined' ||
            prevProps.options.length < (typeof this.props.options !== 'undefined' ? this.props.options.length : 0)
        ) {
            if (this.container) {
                const containerParent = this.container.parentElement as HTMLDivElement;
                if (containerParent && containerParent.className.indexOf('dropdownGroup') !== -1) {
                    const dropdownContainer = containerParent.parentElement as HTMLDivElement;
                    if (dropdownContainer.className.indexOf('open') !== -1) {
                        containerParent.style.overflow = 'hidden';
                        this.height = containerParent.offsetHeight;
                    }
                }
            }
        }
    }

    public componentWillUnmount() {
        this.removeListEvents();
    }

    public render() {
        return (
            <div
                ref={this.referenceContainer}
                className={classNames('optionsList', {
                    fixedHeightList: typeof this.props.height !== 'undefined' && this.props.height > 0,
                    optionsListWithSearch: typeof this.props.search !== 'undefined' && this.props.search !== null,
                })}
                style={!this.props.multiselect ? ({
                    height:
                        this.height > 0
                            ? this.height + 'px'
                            : typeof this.props.height !== 'undefined' && this.props.height > 0
                            ? this.props.height + 'px'
                            : undefined,
                }) : ({height: 'auto'})}
                // style={{}}
            >
                {this.props.multiselect && (
                    <div className="saveSelectionsButton" >
                        <ButtonSave 
                            onClick={this.saveSelectionHandler}
                            labelColor="gray" 
                            isSaving={false}
                            // float="right"
                            label="Save Selection"
                        />
                    </div>
                )}

                {typeof this.props.search !== 'undefined' &&
                this.props.search !== null && (
                        <div className={this.props.multiselect ? 'optionsListSearch movedDown' : 'optionsListSearch'}>
                        <Input
                            ref={this.referenceSearchField}
                            onChange={this.handleOptionsSearch}
                            autoFocus={
                                typeof this.props.search.autoFocus !== 'undefined'
                                    ? this.props.search.autoFocus
                                    : false
                            }
                            value={this.search}
                            label={
                                typeof this.props.search.label !== 'undefined'
                                    ? this.props.search.label
                                    : 'Search...'
                            }
                        />
                    </div>
                )}

                <div ref={this.referenceOptionsListResults} className={this.props.multiselect ? 'optionsListResults multiselect' : 'optionsListResults'}>
                    {(this.filteredOptions.length > 0 && (
                        <ul
                            className={classNames({
                                [s['align' + _capitalize(this.props.align)]]: this.props.align !== 'left',
                            })}
                        >

                            {this.props.directHint && (
                                <li key="direct-hint" className="optionsListCreate">
                                    <button
                                        onClick={this.handleSelectionChange({
                                            value: this.props.directHint.value,
                                            label: this.props.directHint.label,
                                        })}
                                    >
                                        {this.props.directHint.label}
                                    </button>
                                </li>
                            )}

                            {this.props.label !== null &&
                            this.props.label && (
                                <li className="optionsListLabel">
                                    <p>{this.props.label}</p>
                                </li>
                            )}

                            {this.props.loadingOptions && (
                                <li className="optionsListLoadingResults">
                                    <LoadingIndicator label={this.props.refreshingOptionsLabel}/>
                                </li>
                            )}

                            {this.props.multiselect && <div className="combinedOptionsContainer">
                                {this.combinedOptions}
                            </div> }

                            {!this.props.multiselect && this.combinedOptions.map(option => (
                                <OptionsListOption
                                    key={
                                        typeof option.key !== 'undefined'
                                            ? option.key
                                            : typeof option.value === 'object'
                                            ? JSON.stringify(option.value)
                                            : typeof option.value === 'string'
                                                ? option.value
                                                : option.label
                                    }
                                    option={option}
                                    selectedValue={typeof this.props.value !== 'undefined' ? this.props.value : null}
                                    selectedIcon={
                                        typeof this.props.selectedIcon !== 'undefined' ? this.props.selectedIcon : null
                                    }
                                    onSelected={this.handleSelectionChange}
                                />
                            ))}
                        </ul>
                    )) ||
                    (this.props.loadingOptions && (
                        <ul>
                            <li className="optionsListLoadingResults">
                                <LoadingIndicator label={this.props.loadingOptionsLabel}/>
                            </li>
                        </ul>
                    )) || (
                        <ul>
                            {this.props.directHint && (
                                <li>
                                    <button
                                        onClick={this.handleSelectionChange({
                                            value: this.props.directHint.value,
                                            label: this.props.directHint.label,
                                        })}
                                    >
                                        {this.props.directHint.label}
                                    </button>
                                </li>
                            )}
                            <li className={s.noResults}>
                                <p>{this.props.noOptionsLabel}</p>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        );
    }

    private referenceContainer = (ref: HTMLDivElement) => (this.container = ref);
    private referenceOptionsListResults = (ref: HTMLDivElement) => (ref);
    private referenceSearchField = (ref: Input) => (ref);

    private handleOptionsSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof this.props.search !== 'undefined' && this.props.search !== null) {
            const value = e.target.value;

            this.search = e.target.value;

            if (this.props.search && this.props.search.onChange) {
                this.props.search.onChange(value);
            }
        }
    };

    private handleSelectionChange = (option: { value: OptionsListValuePropType; label: string }) => () => {
        if (typeof option.value !== 'undefined' && typeof option.label !== 'undefined' && this.props.onChange) {
            this.props.onChange({ value: option.value, label: option.label });
        }
    };
    private handleSelectionChangeMultiselect = (option: { value: OptionsListValuePropType; label: string }) => {
        if (typeof option.value !== 'undefined' && typeof option.label !== 'undefined' && this.props.onChange) {
            this.props.onChange({ value: option.value, label: option.label });
        }
    };

    private removeListEvents = () => {
        this.listEvents.map(evt => {
            window.removeEventListener(evt.type, evt.handler);
        });
    };
}
