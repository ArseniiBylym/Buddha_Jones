import * as React from 'react';
import * as classNames from 'classnames';
import { Row, Col } from '../Section';
import { LoadingSpinner, LoadingShade } from '../Loaders';
import { Input, OptionsList } from '.';
import { OptionsListOptionProp, OptionsListValuePropType } from './OptionsList';
import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';

// Styles
const s = require('./AlphabeticalOptionsList.css');

// Props
interface AlphabeticalOptionsListProps {
    className?: string | null;
    onChange?: ((option: { id: number; name: string }) => void) | null;
    onLetterChange?: ((letter: string) => void) | null;
    search?: {
        value: string;
        label?: string;
        onChange: (value: string) => void;
        autoFocus?: boolean;
    } | null;
    label?: string | null;
    value: number | string | null;
    showSelectAllButton?: boolean;
    noOptionsLabel?: string;
    specialOptionsBefore?: OptionsListOptionProp[];
    options?: OptionsListOptionProp[];
    specialOptionsAfter?: OptionsListOptionProp[];
    loadingOptions?: boolean;
    letters?: string[];
    loadingLetters?: boolean;
}

// Component
@observer
export class AlphabeticalOptionsList extends React.Component<AlphabeticalOptionsListProps, {}> {
    static get defaultProps(): AlphabeticalOptionsListProps {
        return {
            className: null,
            onChange: null,
            onLetterChange: null,
            search: null,
            label: null,
            value: null,
            showSelectAllButton: false,
            noOptionsLabel: 'No results available',
            specialOptionsBefore: [],
            options: [],
            specialOptionsAfter: [],
            loadingOptions: false,
            letters: [],
            loadingLetters: false,
        };
    }

    private container: HTMLDivElement | null = null;
    private searchContainer: HTMLDivElement | null = null;
    private labelContainer: HTMLDivElement | null = null;

    @observable private containerHeight: number = 0;
    @observable private optionsListHeight: number = 0;
    @observable private showLetters: boolean = true;
    @observable private searchValue: string = '';

    @computed
    private get optionsList(): OptionsListOptionProp[] {
        return typeof this.props.options !== 'undefined' && this.props.options && this.props.options.length > 0
            ? this.props.options
            : [];
    }

    public componentDidMount() {
        // Set fixed height of the component
        if (this.container) {
            // Get heights
            const containerHeight = this.container.offsetHeight;
            const searchContainerHeight = this.searchContainer ? this.searchContainer.offsetHeight : 0;
            const labelContainerHeight = this.labelContainer ? this.labelContainer.offsetHeight : 0;

            // Update heights
            this.containerHeight = containerHeight;
            this.optionsListHeight = containerHeight - searchContainerHeight - labelContainerHeight;
        }
    }

    public componentWillReceiveProps(nextProps: AlphabeticalOptionsListProps) {
        if (typeof this.props.search !== 'undefined' &&
            this.props.search !== null &&
            typeof nextProps.search !== 'undefined' &&
            nextProps.search !== null &&
            this.props.search.value !== nextProps.search.value &&
            this.searchValue !== nextProps.search.value
        ) {
            this.searchValue = nextProps.search.value;
        }
    }

    public render() {
        return (
            <div
                ref={this.referenceContainer}
                className={s.alphabeticalList}
                style={this.containerHeight > 0 ? { height: this.containerHeight + 'px' } : { height: 'auto' }}
            >
                {typeof this.props.search !== 'undefined' &&
                this.props.search !== null && (
                    <div ref={this.referenceSearchContainer} className="optionsListSearch">
                        <Input
                            ref={this.referenceSearchField}
                            onChange={this.handleOptionsSearch}
                            value={this.searchValue}
                            label={
                                typeof this.props.search !== 'undefined' &&
                                typeof this.props.search.label !== 'undefined'
                                    ? this.props.search.label
                                    : 'Search...'
                            }
                            autoFocus={
                                typeof this.props.search !== 'undefined' &&
                                typeof this.props.search.autoFocus !== 'undefined' &&
                                this.props.search.autoFocus
                                    ? this.props.search.autoFocus
                                    : false
                            }
                        />
                    </div>
                )}

                {this.props.label !== null && (
                    <div ref={this.referenceLabelContainer} className="optionsListLabel">
                        <p>{this.props.label}</p>
                    </div>
                )}

                {this.showLetters ? this.renderLettersGrid() : this.renderOptionsList()}
            </div>
        );
    }

    public renderLettersGrid() {
        // Letters
        const letterGroups = [
            { id: 'l1', letters: ['0-9', 'A', 'B', 'C'] },
            { id: 'l2', letters: ['D', 'E', 'F', 'G'] },
            { id: 'l3', letters: ['H', 'I', 'J', 'K'] },
            { id: 'l4', letters: ['L', 'M', 'N', 'O'] },
            { id: 'l5', letters: ['P', 'Q', 'R', 'S'] },
            { id: 'l6', letters: ['T', 'U', 'V', 'W'] },
            { id: 'l7', letters: ['X', 'Y', 'Z', '?'] },
        ];

        // Render
        return (
            <div className={s.lettersGrid}>
                {letterGroups.map(lettersGroup => {
                    return (
                        <Row key={lettersGroup.id} removeGutter={true} removeMargins={true}>
                            {lettersGroup.letters.map((letter, letterIndex) => {
                                // Letter is available
                                const letterAvailable =
                                    typeof this.props.letters !== 'undefined' && this.props.letters
                                        ? this.props.letters.indexOf(letter) !== -1
                                        : false;

                                // Render individual letter
                                return (
                                    <Col key={letterIndex}>
                                        <button
                                            className={classNames({
                                                [s.available]: letterAvailable,
                                            })}
                                            onClick={this.handleLetterClick(letterAvailable ? letter : null)}
                                        >
                                            {letter}
                                        </button>
                                    </Col>
                                );
                            })}
                        </Row>
                    );
                })}

                {this.props.loadingLetters && (
                    <LoadingShade>
                        <LoadingSpinner size={48}/>
                    </LoadingShade>
                )}
            </div>
        );
    }

    public renderOptionsList() {
        return (
            <div
                className={s.optionsList}
                style={{
                    height: this.optionsListHeight > 0 ? this.optionsListHeight + 'px' : 'auto',
                }}
            >
                {this.optionsList.length > 0 && (
                    <OptionsList
                        onChange={this.handleOptionClick}
                        value={this.props.value !== null ? this.props.value : undefined}
                        specialOptionsBefore={[
                            ...[{ value: 'goBackToLetters', label: '←' }],
                            ...(typeof this.props.specialOptionsBefore !== 'undefined'
                                ? this.props.specialOptionsBefore
                                : []),
                        ]}
                        options={this.optionsList}
                        specialOptionsAfter={[
                            ...(typeof this.props.specialOptionsAfter !== 'undefined'
                                ? this.props.specialOptionsAfter
                                : []),
                            ...((typeof this.props.options === 'undefined' ||
                                this.props.options === null ||
                                this.props.options.length === 0) &&
                            this.props.loadingOptions === false &&
                            (typeof this.props.noOptionsLabel === 'undefined' ||
                                this.props.noOptionsLabel === null ||
                                this.props.noOptionsLabel === '')
                                ? [
                                    {
                                        value: 'goBackToLettersAlt',
                                        label:
                                            typeof this.props.noOptionsLabel !== 'undefined'
                                                ? this.props.noOptionsLabel
                                                : '',
                                    },
                                ]
                                : []),
                        ]}
                    />
                )}

                {this.props.loadingOptions && (
                    <LoadingShade>
                        <LoadingSpinner size={48}/>
                    </LoadingShade>
                )}
            </div>
        );
    }

    @action
    public toggleBetweenLettersAndOptions = (showLetters: boolean) => {
        if (this.showLetters !== showLetters) {
            this.showLetters = showLetters;

            if (showLetters) {
                if (this.props.onLetterChange) {
                    this.props.onLetterChange('');
                }

                if (typeof this.props.search !== 'undefined' && this.props.search !== null) {
                    this.props.search.onChange('');
                }
            }
        }
    };

    private referenceContainer = (ref: HTMLDivElement) => (this.container = ref);
    private referenceSearchContainer = (ref: HTMLDivElement) => (this.searchContainer = ref);
    private referenceLabelContainer = (ref: HTMLDivElement) => (this.labelContainer = ref);
    private referenceSearchField = (ref: Input) => (ref);

    private handleOptionsSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query: string = e.currentTarget.value;
        this.searchValue = query;

        if (query === '') {
            this.toggleBetweenLettersAndOptions(true);
        } else {
            this.toggleBetweenLettersAndOptions(false);
            if (
                typeof this.props.search !== 'undefined' &&
                this.props.search !== null &&
                typeof this.props.search.onChange !== 'undefined' &&
                this.props.search.onChange
            ) {
                this.props.search.onChange(query.trim());
            }
        }
    };

    private handleLetterClick = (character: string | null) => () => {
        if (character !== null) {
            // Hide letters grid
            this.showLetters = false;

            // Pass further
            if (this.props.onLetterChange) {
                this.props.onLetterChange(character);
            }
        }
    };

    private handleOptionClick = (option: { value: OptionsListValuePropType; label: string }) => {
        // Check if back button has been pressed
        if (option.value === 'goBackToLetters' || option.value === 'goBackToLettersAlt') {
            // Go back to letters
            this.toggleBetweenLettersAndOptions(true);
        } else {
            // Pass further
            if (this.props.onChange) {
                this.props.onChange({
                    id: typeof option.value === 'number' ? option.value : 0,
                    name: option.label,
                });
            }
        }
    };
}
