import * as React from 'react';
import * as styles from './CustomerSelector.scss';
import { observer } from 'mobx-react';
import { DropdownContainer, OptionsList } from 'components/Form';
import { OptionsListValuePropType } from 'components/Form/OptionsList';
import { ButtonClose, ButtonSave } from 'components/Button';
import { action, observable } from 'mobx';
import { ProjectsDetailsActions } from 'actions';
import { ClientForStudio } from '../../../../types/clients';

// Props
interface Props {
    label?: string;
    value: ClientForStudio;
    options: ProjectBoardCampaignCustomerSelectorOption[];
    optionsLoading?: boolean;
    onChange?: ((option: { id: number; name: string } | null) => void) | null;
    projectCampaignId: number | null;
    onToggleEditModeButton: () => void | null;
    isCustomerFormShow: boolean;
}

interface ProjectBoardCampaignCustomerSelectorOption {
    id: OptionsListValuePropType;
    name: string;
}

interface ProjectBoardCampaignCustomerSelectorOptionSelected {
    value: number | null;
    label: string;
}

enum Status {
    default,
    saving,
    success,
    error
}

@observer
export class CustomerSelector extends React.Component<Props, {}> {
    @observable private status: Status = Status.default;

    @observable private valueSelected: ClientForStudio = {
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
            optionsLoading: false,
            projectCampaignId: null,
            onToggleEditModeButton: () => undefined
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
                <DropdownContainer
                    className={styles.dropDownSelector}
                    ref={this.referenceCustomerSelectorDropdown}
                    label={(this.props.label) ? this.props.label : ''}
                    value={(this.valueSelected.name) ? this.valueSelected.name : 'not selected'}
                    type="field"
                >
                    <OptionsList
                        onChange={this.handleCustomerSelectorChange}
                        value={this.valueSelected.name}
                        loadingOptions={this.props.optionsLoading}
                        loadingOptionsLabel={'loading...'}
                        height={200}
                        options={[
                            ...this.props.options.map(option => ({
                                value: option.id,
                                label: option.name,
                            })),
                        ]}
                    />
                </DropdownContainer>

                {
                    !this.props.isCustomerFormShow &&
                    <>
                        <div className={styles.inlineBlock}>
                            <ButtonClose
                                float="right"
                                onClick={this.handleCustomerSelectorEditModeToggle}
                                label={'Cancel'}
                            />
                        </div>

                        < ButtonSave
                            onClick={this.handleSaveChanges}
                            float='left'
                            label={
                                this.status === Status.error ? 'Could not save, please try again' : 'Save details'
                            }
                            labelColor={this.status === Status.error ? 'orange' : 'blue'}
                            savingLabel='Saving'
                            isSaving={this.status === Status.saving}
                        />
                    </>
                }
            </div>
        );
    }

    private handleCustomerSelectorChange = (option: ProjectBoardCampaignCustomerSelectorOptionSelected) => {
        let selectedCustomerSelector: ClientForStudio = {
            id: option.value
            , name: option.label
        };
        this.valueSelected = selectedCustomerSelector;
        if (this.versionStatusDropdown) {
            this.versionStatusDropdown.closeDropdown();
        }
    };

    private referenceCustomerSelectorDropdown = (ref: DropdownContainer) => (this.versionStatusDropdown = ref);

    private handleCustomerSelectorEditModeToggle = () => {
        this.toggleEditMode();
    };

    @action
    private setInitialCustomerIdSelected = (value: ClientForStudio) => {
        this.valueSelected = {
            id: value.id,
            name: value.name
        };
    };

    @action
    private toggleEditMode = () => {
        this.setInitialCustomerIdSelected(this.props.value);
        this.props.onToggleEditModeButton();
    };

    @action
    private handleSaveChanges = async () => {
        try {
            if (this.props.projectCampaignId && this.valueSelected && this.valueSelected.id) {
                this.status = Status.saving;
                await ProjectsDetailsActions.changeProjectCampaignCustomer(
                    this.props.projectCampaignId,
                    this.valueSelected.id
                );
                if (this.props.onChange) {
                    this.props.onChange(this.valueSelected as { id: number; name: string });
                }
                this.status = Status.saving;
                this.props.onToggleEditModeButton();
            }
        } catch (error) {
            this.setInitialCustomerIdSelected(this.props.value);
            this.status = Status.error;
            throw error;
        }
    };
}
