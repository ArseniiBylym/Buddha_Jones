import * as React from 'react';
import * as styles from './CustomerSelector.scss';
import { observer } from 'mobx-react';
import { DropdownContainer, OptionsList } from '../../../../components/Form';
import { OptionsListValuePropType } from '../../../../components/Form/OptionsList';
import { ButtonClose, ButtonEdit, ButtonSave } from '../../../../components/Button';
import { action, observable } from 'mobx';
import { ProjectsDetailsActions } from '../../../../actions';

// Props
interface Props {
    label?: string;
    value: ProjectBoardCampaignCustomerSelector;
    options: ProjectBoardCampaignCustomerSelectorOption[];
    onChange?: ((option: { id: number; name: string } | null) => void) | null;
    projectCampaignId: number | null;
    isEditMode?: boolean;
    onToggleEditMode: () => void | null;
}

interface ProjectBoardCampaignCustomerSelectorOption {
    id: OptionsListValuePropType;
    name: string;
}

interface ProjectBoardCampaignCustomerSelectorOptionSelected {
    value: number | null;
    label: string;
}

interface ProjectBoardCampaignCustomerSelector {
    id: number | null;
    name: string | null;
}

// Component
@observer
export class CustomerSelector extends React.Component<Props, {}> {
    @observable private status: 'default' | 'saving' | 'success' | 'error' = 'default';

    @observable private valueSelected: ProjectBoardCampaignCustomerSelector = {
        id: null,
        name: null
    };

    private versionStatusDropdown: DropdownContainer | null = null;

    static get defaultProps(): Partial<Props> {
        return {
            label: '',
            value: {
                id: null,
                name: 'Edit client'
            },
            options: [],
            projectCampaignId: null,
            isEditMode: false,
            onToggleEditMode: () => undefined
        };
    }

    public componentDidMount() {
        this.setInitialCustomerIdSelected(this.props.value);
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.props.value.id !== nextProps.value.id) {
            this.setInitialCustomerIdSelected(nextProps.value);
        }
    }

    public render() {
        return (
            <div className={styles.customerSelector}>

                {
                    !this.props.isEditMode &&
                    <div className={styles.inlineBlock}>
                        <h5>{this.valueSelected.name}</h5>
                    </div>
                }

                {
                    this.props.isEditMode &&
                    <DropdownContainer
                        className={styles.dropDownSelector}
                        ref={this.referenceCustomerSelectorDropdown}
                        label={(this.props.label) ? this.props.label : ''}
                        value={(this.valueSelected.name) ? this.valueSelected.name : ''}
                        type="field"
                    >
                        <OptionsList
                            onChange={this.handleCustomerSelectorChange}
                            value={this.valueSelected.name}
                            options={[
                                ...[
                                    {
                                        value: null,
                                        label: 'not selected',
                                    },
                                ],
                                ...this.props.options.map(status => ({
                                    value: status.id,
                                    label: status.name,
                                })),
                            ]}
                        />
                    </DropdownContainer>
                }

                <div className={styles.inlineBlock}>
                    {
                        !this.props.isEditMode &&
                        <ButtonEdit
                            float="right"
                            onClick={this.handleCustomerSelectorEditModeToggle}
                            label={(this.valueSelected.name) ? '' : 'Edit Client'}
                        />
                    }

                    {
                        this.props.isEditMode &&
                        <ButtonClose
                            float="right"
                            onClick={this.handleCustomerSelectorEditModeToggle}
                            label={'Cancel'}
                        />
                    }
                </div>

                {
                    this.props.isEditMode &&
                    <ButtonSave
                        onClick={this.handleSaveChanges}
                        float="left"
                        label={
                            this.status === 'error' ? 'Could not save, please try again' : 'Save details'
                        }
                        labelColor={this.status === 'error' ? 'orange' : 'blue'}
                        savingLabel="Saving"
                        isSaving={this.status === 'saving'}
                    />
                }
            </div>
        );
    }

    private handleCustomerSelectorChange = (option: ProjectBoardCampaignCustomerSelectorOptionSelected) => {
        let selectedCustomerSelector: ProjectBoardCampaignCustomerSelector = {
            id: option.value
            , name: option.label
        };
        this.valueSelected = selectedCustomerSelector;
        if (this.versionStatusDropdown) {
            this.versionStatusDropdown.closeDropdown();
        }
    };

    private referenceCustomerSelectorDropdown = (ref: DropdownContainer) => (this.versionStatusDropdown = ref);

    private handleCustomerSelectorEditModeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.toggleEditMode();
    };

    @action
    private setInitialCustomerIdSelected = (value: ProjectBoardCampaignCustomerSelector) => {
        this.valueSelected = {
            id: value.id,
            name: value.name
        };
    };

    @action
    private toggleEditMode = () => {
        this.setInitialCustomerIdSelected(this.props.value);
        this.props.onToggleEditMode();
    };

    @action
    private handleSaveChanges = async () => {
        try {
            if (this.props.projectCampaignId && this.valueSelected && this.valueSelected.id) {
                this.status = 'saving';
                await ProjectsDetailsActions.changeProjectCampaignCustomer(
                    this.props.projectCampaignId,
                    this.valueSelected.id
                );
                if (this.props.onChange) {
                    this.props.onChange(this.valueSelected as { id: number; name: string });
                }
                this.status = 'success';
                this.props.onToggleEditMode();
            }
        } catch (error) {
            this.setInitialCustomerIdSelected(this.props.value);
            this.status = 'error';
            throw error;
        }
    };

}
