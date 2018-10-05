import * as React from 'react';
import { observable, computed, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { AppOnlyStoreState } from 'store/AllStores';
import { CampaignsActions, ProjectsDetailsActions } from 'actions';
import { OptionsListOptionProp, DropdownContainer, OptionsList } from '../Form';
import { LoadingIndicator } from '../Loaders';
import { StringHandler } from 'helpers/StringHandler';
import { Paragraph } from '../Content';

// Types
type CampaignPickerAlignProp = 'left' | 'center' | 'right';

// Props
interface CampaignPickerTypes extends AppOnlyStoreState {
    onChange?: ((campaign: { id: number; name: string }) => void) | null;
    onNewCreated?: ((campaign: { id: number; name: string }, projectAssignedToIds: number[] | null) => void) | null;
    onNewCreating?: ((campaignName: string) => void) | null;
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
export class FinishingHousesPicker extends React.Component<CampaignPickerTypes, {}> {
    private campaignPickerDropdown: DropdownContainer | null = null;

    static get defaultProps(): Partial<CampaignPickerTypes> {
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
        return this.props.store != null ? this.props.store.campaigns.allCampaignsAreBeingFetched : false;
    }

    @computed
    private get campaignsToOptionsList(): OptionsListOptionProp[] {
        return this.props.store != null
            ? this.props.store.campaigns.allCampaigns
                  .filter(
                      campaign => this.props.excludeIds == null || this.props.excludeIds.indexOf(campaign.id) === -1
                  )
                  .map(campaign => ({
                      key: 'campaign-' + campaign.id,
                      value: campaign.id,
                      label: campaign.name,
                  }))
            : [];
    }

    @computed
    private get searchResultsHaveExactQueryMatch(): boolean {
        const search: string = this.searchQuery.trim().toLowerCase();
        return search === '' || this.props.store == null
            ? true
            : this.props.store.campaigns.allCampaigns.filter(campaign => campaign.name.trim().toLowerCase() === search)
                  .length > 0;
    }

    public componentDidMount() {
        this.fetchCampaigns();
    }

    public closeDropdown = () => {
        if (this.campaignPickerDropdown && typeof this.campaignPickerDropdown.closeDropdown === 'function') {
            this.campaignPickerDropdown.closeDropdown();
        }
    };

    public render() {
        if (this.status === 'saving') {
            return (
                <div className="campaignPicker">
                    <LoadingIndicator label="Saving new campaign" />
                </div>
            );
        } else if (this.status === 'success') {
            return (
                <div className="campaignPicker">
                    <Paragraph type="success">New campaign has been created</Paragraph>
                </div>
            );
        } else {
            return (
                <div className="campaignPicker">
                    <DropdownContainer
                        ref={this.referenceCampaignPickerDropdown}
                        align={this.props.align}
                        minWidth={210}
                        maxWidth={420}
                        overflowAuto={true}
                        label={this.props.label}
                        value={
                            this.status === 'error' ? 'Could not create new campaign, try again' : this.props.valueLabel
                        }
                        truncuateValueTo={this.props.truncuateLabelTo}
                    >
                        <OptionsList
                            onChange={this.handleSelectOrCreate}
                            search={{
                                onChange: this.handleSearchQuery,
                                autoFocus: true,
                                value: this.searchQuery,
                                label: 'Search or create campaign by name...',
                            }}
                            value={this.props.value}
                            options={this.campaignsToOptionsList}
                            loadingOptions={this.loadingOptions}
                            directHint={
                                this.searchResultsHaveExactQueryMatch
                                    ? null
                                    : {
                                          value: 'createCampaign',
                                          label:
                                              'Create new campaign: ' +
                                              StringHandler.capitalizeAllWordsInPhrase(this.searchQuery),
                                      }
                            }
                        />
                    </DropdownContainer>
                </div>
            );
        }
    }

    private referenceCampaignPickerDropdown = (ref: DropdownContainer) => (this.campaignPickerDropdown = ref);

    private handleSelectOrCreate = (option: { value: number | string; label: string }) => {
        // Create new campaign or pass changed value further
        if (option.value === 'createCampaign') {
            this.createNewCampaign(this.searchQuery, this.props.projectId);
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

    private createNewCampaign = async (campaignName: string, projectId: number | null = null): Promise<boolean> => {
        try {
            this.status = 'saving';

            if (this.props.onNewCreating) {
                this.props.onNewCreating(campaignName);
            }

            const newCampaign = await CampaignsActions.createNewCampaign(
                campaignName,
                projectId !== null ? [projectId] : null
            );

            if (this.props.onNewCreated) {
                this.props.onNewCreated(
                    {
                        id: newCampaign.campaignId,
                        name: newCampaign.campaignName,
                    },
                    projectId !== null ? [projectId] : null
                );
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

            this.fetchCampaigns(true);
            if (projectId !== null) {
                ProjectsDetailsActions.fetchProjectDetails(projectId);
            }

            return true;
        } catch (error) {
            this.status = 'error';

            if (this.props.closeWhenPicked) {
                this.closeDropdown();
            }

            throw error;
        }
    };

    private fetchCampaigns = (forceFetch: boolean = false) => {
        CampaignsActions.fetchAllCampaigns(forceFetch);
    };
}
