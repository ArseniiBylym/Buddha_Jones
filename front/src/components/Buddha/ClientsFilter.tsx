import { ClientsActions, StudiosActions } from 'actions';
import * as classNames from 'classnames';
import { debounce as _debounce } from 'lodash';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { Client } from 'types/clients';
import { Button } from '../Button';
import {
    DropdownContainer,
    AlphabeticalOptionsList,
    OptionsListOptionProp,
    DropdownContainerTypeProp,
    DropdownContainerAlignProp,
} from '../Form';

// Styles
const s = require('./ClientsFilter.css');

// Props
interface ClientsFilterProps {
    className?: string | null;
    onChange?: ((option: { id: number; name: string } | null) => void) | null;
    maxWidth?: number;
    clientId?: number | null;
    clientName?: string | null;
    label?: string;
    truncuateLabelTo?: number;
    allAreAllowed?: boolean;
    align?: DropdownContainerAlignProp;
    type?: DropdownContainerTypeProp;
    source?: 'clients' | 'studios';
}

// Component
@inject('store')
@observer
export class ClientsFilter extends React.Component<ClientsFilterProps & AppOnlyStoreState, {}> {
    static get defaultProps(): ClientsFilterProps {
        return {
            className: null,
            onChange: null,
            maxWidth: 360,
            clientId: null,
            clientName: null,
            label: 'Studio',
            truncuateLabelTo: 32,
            allAreAllowed: true,
            align: 'right',
            type: 'oneline',
            source: 'clients',
        };
    }

    public dropdownContainer: DropdownContainer | null = null;
    public alphabeticalCustomersList: AlphabeticalOptionsList | null = null;

    @action
    private debouncedClientSearch = _debounce((query: string) => {
        this.search = query;
        this.selectedLetter = '';
        switch (this.props.source) {
            case 'studios':
                StudiosActions.fetchCustomers(query, '');
                break;
            default:
                ClientsActions.fetchCustomers(query, '');
        }
    }, 300);

    @observable private search: string = '';
    @observable private selectedLetter: string = '';

    @computed
    private get searchFormatted(): string {
        return this.search.trim().toUpperCase();
    }

    @computed
    private get selectedLetterFormatted(): string {
        return this.selectedLetter.toUpperCase();
    }

    @computed
    private get clientsList(): OptionsListOptionProp[] {
        if (!this.props.store) {
            return [];
        }

        let src = this.getSrc;
        let clientsList: Client[] = [];

        if (src) {
            if (this.searchFormatted !== '') {
                const queryMatch = src.clientsBySearchQueryFlat.indexOf(this.searchFormatted);
                clientsList = queryMatch !== -1 ? src.clientsBySearchQuery[queryMatch].clients : [];
            } else if (this.selectedLetterFormatted !== '') {
                const letterMatch = src.clientsByLetterFlat.indexOf(this.selectedLetterFormatted);
                clientsList = letterMatch !== -1 ? src.clientsByLetter[letterMatch].clients : [];
            }
        }

        return clientsList.length > 0
            ? clientsList.map(client => ({
                  value: client.id,
                  label: client.name,
              }))
            : [];
    }

    @computed
    private get clientsListLoading(): boolean {
        if (!this.props.store) {
            return false;
        }

        let loading: boolean = false;
        let src = this.getSrc;

        if (src) {
            if (this.searchFormatted !== '') {
                const searchMatch: number = src.clientsBySearchQueryFlat.indexOf(this.searchFormatted);
                loading = searchMatch !== -1 ? src.clientsBySearchQuery[searchMatch].loading : false;
            } else if (this.selectedLetterFormatted !== '') {
                const letterMatch = src.clientsByLetterFlat.indexOf(this.selectedLetterFormatted);
                loading = letterMatch !== -1 ? src.clientsByLetter[letterMatch].loading : false;
            }
        }

        return loading;
    }

    @computed
    private get getSrc() {
        if (!this.props.store) {
            return null;
        }

        const { clients, studios } = this.props.store;
        let src;

        switch (this.props.source) {
            case 'studios':
                src = studios;
                break;
            default:
                src = clients;
        }

        return src;
    }

    public componentDidMount() {
        switch (this.props.source) {
            case 'studios':
                StudiosActions.fetchStudiosInitialsLetters();
                break;
            default:
                ClientsActions.fetchClientsInitialsLetters();
        }
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        let src = this.getSrc;

        return (
            <DropdownContainer
                ref={this.referenceDropdownContainer}
                className={classNames(this.props.className)}
                align={this.props.align}
                type={this.props.type}
                minWidth={210}
                maxWidth={this.props.maxWidth ? this.props.maxWidth : undefined}
                label={typeof this.props.label !== 'undefined' ? this.props.label : ''}
                truncuateValueTo={this.props.truncuateLabelTo}
                value={
                    typeof this.props.clientName !== 'undefined' && this.props.clientName !== null
                        ? this.props.clientName
                        : typeof this.props.clientId !== 'undefined' && this.props.clientId !== null
                        ? this.props.clientId.toString()
                        : this.props.allAreAllowed
                        ? 'All'
                        : 'None'
                }
            >
                <AlphabeticalOptionsList
                    ref={this.referenceAlphabeticalCustomersList}
                    onChange={this.handleClientChange}
                    onLetterChange={this.handleLetterChange}
                    search={{
                        autoFocus: true,
                        label: 'Studio name...',
                        value: this.search,
                        onChange: this.handleClientSearch,
                    }}
                    value={
                        typeof this.props.clientId !== 'undefined' && this.props.clientId !== null
                            ? this.props.clientId
                            : null
                    }
                    showSelectAllButton={true}
                    noOptionsLabel="No studio matching criteria"
                    options={this.clientsList}
                    loadingOptions={this.clientsListLoading}
                    letters={src ? src.existingClientsInitials.letters : []}
                    loadingLetters={src ? src.existingClientsInitials.loading : true}
                />

                {typeof this.props.clientId !== 'undefined' && this.props.clientId !== null && (
                    <Button
                        className={s.resetButton}
                        onClick={this.handleReset}
                        label={{
                            text: 'Clear studio selection',
                        }}
                    />
                )}
            </DropdownContainer>
        );
    }

    private referenceDropdownContainer = (ref: DropdownContainer) => (this.dropdownContainer = ref);
    private referenceAlphabeticalCustomersList = (ref: AlphabeticalOptionsList) =>
        (this.alphabeticalCustomersList = ref);

    @action
    private handleClientChange = (option: { id: number; name: string } | null) => {
        // Pass value further
        if (this.props.onChange) {
            this.props.onChange(option);
        }

        // Close dropdown
        if (this.dropdownContainer && typeof this.dropdownContainer.closeDropdown === 'function') {
            this.dropdownContainer.closeDropdown();
        }
    };

    @action
    private handleLetterChange = (letter: string) => {
        this.selectedLetter = letter;
        this.search = '';
        switch (this.props.source) {
            case 'studios':
                StudiosActions.fetchCustomers('', letter);
                break;
            default:
                ClientsActions.fetchCustomers('', letter);
        }
    };

    @action
    private handleClientSearch = (query: string) => {
        this.selectedLetter = '';
        this.search = query;
        this.debouncedClientSearch(query);
    };

    private handleReset = () => {
        this.search = '';
        this.selectedLetter = '';

        // Reset to letters
        if (
            this.alphabeticalCustomersList &&
            typeof this.alphabeticalCustomersList.toggleBetweenLettersAndOptions === 'function'
        ) {
            this.alphabeticalCustomersList.toggleBetweenLettersAndOptions(true);
        }

        // Pass value further
        this.handleClientChange(null);
    };
}
