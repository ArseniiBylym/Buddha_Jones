import * as React from 'react';
import { observable, computed, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotSentActions } from 'actions';
import { OptionsListOptionProp, DropdownContainer, OptionsList } from '../Form';
import { LoadingIndicator } from '../Loaders';
import { StringHandler } from 'helpers/StringHandler';
import { Paragraph } from '../Content';
import { FinishingHouseOptionsFromApi } from '../../types/spotSent';

// Types
type CampaignPickerAlignProp = 'left' | 'center' | 'right';

// Props
interface FinishingHousesPickerTypes extends AppOnlyStoreState {
    onChange?: ((campaign: { id: number; name: string }) => void) | null;
    onNewCreated?: ((campaign: { id: number; name: string }, projectAssignedToIds: number[] | null) => void) | null;
    onNewCreating?: ((campaignName: FinishingHouseOptionsFromApi) => void) | null;
    align?: CampaignPickerAlignProp;
    label: string;
    value: number;
    valueLabel: string;
    truncuateLabelTo?: number;
    excludeIds?: number[];
    projectId?: number | null;
    disabledCreating?: boolean;
    closeWhenPicked?: boolean;
}

@inject('store')
@observer
export class FinishingHousesPicker extends React.Component<FinishingHousesPickerTypes, {}> {
    private finishingHousesPickerDropdown: DropdownContainer | null = null;

    static get defaultProps(): Partial<FinishingHousesPickerTypes> {
        return {
            onChange: null,
            onNewCreated: null,
            onNewCreating: null,
            align: 'right',
            label: '',
            value: 0,
            valueLabel: '',
            truncuateLabelTo: 32,
            excludeIds: [],
            projectId: null,
            disabledCreating: false,
            closeWhenPicked: true,
        };
    }

    @observable private status: 'default' | 'saving' | 'success' | 'error' = 'default';
    @observable private searchQuery: string = '';

    @computed
    private get loadingOptions(): boolean {
        return this.props.store != null ? this.props.store.spotSent.spotSentFinishingHouseAreBeingFetched : false;
    }

    @computed
    private get finishingHouseToOptionsList(): OptionsListOptionProp[] {
        if (
            this.props.store != null &&
            this.props.store.spotSent != null &&
            this.props.store.spotSent.spotSentFinishingHouseOptions != null
        ) {
            return this.props.store.spotSent.spotSentFinishingHouseOptions
                .filter((option: FinishingHouseOptionsFromApi) => {
                    return this.props.excludeIds == null || this.props.excludeIds.indexOf(option.id) === -1;
                })
                .map((option: FinishingHouseOptionsFromApi) => {
                    return {
                        key: 'finishing-house-' + option.id,
                        value: option.id,
                        label: option.name
                    };
                });
        } else {
            return [];
        }
    }

    @computed
    private get searchResultsHaveExactQueryMatch(): boolean {
        if (
            this.props.store != null &&
            this.props.store.spotSent != null &&
            this.props.store.spotSent.spotSentFinishingHouseOptions != null
        ) {
            const search: string = this.searchQuery.trim().toLowerCase();
            return search === '' || this.props.store == null
                ? true
                : this.props.store.spotSent.spotSentFinishingHouseOptions.filter(option => option.name.trim().toLowerCase() === search)
                      .length > 0;
        } else {
            return false;
        }
    }

    public componentDidMount() {
        this.fetchFinishingHouses();
    }

    public closeDropdown = () => {
        if (this.finishingHousesPickerDropdown && typeof this.finishingHousesPickerDropdown.closeDropdown === 'function') {
            this.finishingHousesPickerDropdown.closeDropdown();
        }
    };

    public render() {
        if (this.status === 'saving') {
            return (
                <div className="campaignPicker">
                    <LoadingIndicator label="Saving new finishing house" />
                </div>
            );
        } else if (this.status === 'success') {
            return (
                <div className="campaignPicker">
                    <Paragraph type="success">New finishing house has been created</Paragraph>
                </div>
            );
        } else {
            return (
                <div className="campaignPicker">
                    <DropdownContainer
                        ref={this.referenceFinishingHousePickerDropdown}
                        align={this.props.align}
                        minWidth={210}
                        maxWidth={420}
                        overflowAuto={true}
                        label={this.props.label}
                        value={
                            this.status === 'error' ? 'Could not create new finishing house, try again' : this.props.valueLabel
                        }
                        truncuateValueTo={this.props.truncuateLabelTo}
                    >
                        <OptionsList
                            onChange={this.handleSelectOrCreate}
                            search={{
                                onChange: this.handleSearchQuery,
                                autoFocus: true,
                                value: this.searchQuery,
                                label: 'Search or create finishing house by name...',
                            }}
                            value={this.props.value}
                            options={this.finishingHouseToOptionsList}
                            loadingOptions={this.loadingOptions}
                            directHint={
                                this.searchResultsHaveExactQueryMatch
                                    ? null
                                    : {
                                          value: 'createFinishingHouse',
                                          label:
                                              'Create new finishing house: ' +
                                              StringHandler.capitalizeAllWordsInPhrase(this.searchQuery),
                                      }
                            }
                        />
                    </DropdownContainer>
                </div>
            );
        }
    }

    private referenceFinishingHousePickerDropdown = (ref: DropdownContainer) => (this.finishingHousesPickerDropdown = ref);

    private handleSelectOrCreate = (option: { value: number | string; label: string }) => {
        if (option.value === 'createFinishingHouse') {
            this.createNewFinishingHouse(this.searchQuery);
        } else if (typeof option.value === 'number') {
            if (this.props.onChange) {
                this.props.onChange({ id: option.value, name: option.label });
            }
            if (this.props.closeWhenPicked) {
                this.closeDropdown();
            }
        }
    };

    @action
    private handleSearchQuery = (query: string) => {
        this.searchQuery = StringHandler.capitalizeAllWordsInPhrase(query);
    };

    private createNewFinishingHouse = async (finishingName: string): Promise<boolean> => {
        try {
            this.status = 'saving';

            const newFinishingHouse: FinishingHouseOptionsFromApi = await SpotSentActions.createNewFinishingHouse(finishingName);

            if (this.props.onNewCreating) {
                this.props.onNewCreating(newFinishingHouse);
            }

            if (this.props.closeWhenPicked) {
                this.closeDropdown();
            }

            this.searchQuery = '';
            this.status = 'success';

            setTimeout(() => {
                if (this.status === 'success') {
                    this.status = 'default';
                }
            }, 2048);

            this.fetchFinishingHouses(true);

            return true;
        } catch (error) {
            this.status = 'error';

            if (this.props.closeWhenPicked) {
                this.closeDropdown();
            }

            throw error;
        }
    };

    private fetchFinishingHouses = (forceFetch: boolean = false) => {
        SpotSentActions.fetchFinishingHousesOptions(forceFetch);
    };
}
