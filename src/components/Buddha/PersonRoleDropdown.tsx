import * as React from 'react';
import { computed, observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { AppOnlyStoreState } from 'store/AllStores';
import { DropdownContainer, OptionsList, OptionsListOptionProp, OptionsListValuePropType } from '../Form';
import { UsersActions } from 'actions';
import { UserProjectRole } from 'types/users';

// Styles
const s = require('./PersonRoleDropdown.css');

// Props
interface PersonRoleDropdownProps {
    onChange: ((role: { value: number | 'remove'; label: string }) => void) | null;
    selectedRoleId?: number | null;
    selectedRoleName?: string | null;
    showRemoveButton?: boolean;
    removeButtonLabel?: string;
}

// Types
type PersonRoleDropdownPropsTypes = PersonRoleDropdownProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class PersonRoleDropdown extends React.Component<PersonRoleDropdownPropsTypes, {}> {
    static get defaultProps(): PersonRoleDropdownProps {
        return {
            onChange: null,
            selectedRoleId: null,
            selectedRoleName: null,
            showRemoveButton: false,
            removeButtonLabel: 'Remove',
        };
    }

    @observable private isLoading: boolean = false;

    @computed
    private get rolesOptionsList(): OptionsListOptionProp[] {
        if (!this.props.store) {
            return [];
        }

        return this.props.store.users.projectRoles.map(role => ({
            key: 'role-' + role.id,
            value: role.id,
            label: role.name,
        }));
    }

    @computed
    private get userProjectRole(): UserProjectRole | null {
        if (!this.props.store || this.props.selectedRoleId === null) {
            return null;
        }

        return this.props.store.users.projectRoles.find(role => role.id === this.props.selectedRoleId) || null;
    }

    private dropdownContainer: DropdownContainer | null = null;

    public componentDidMount() {
        this.fetchRoles();
    }

    public render() {
        return (
            <DropdownContainer
                ref={this.referenceDropdownContainer}
                className={s.dropdownContainer}
                label="Role:"
                value={
                    this.userProjectRole
                        ? this.userProjectRole.name
                        : this.props.selectedRoleName != null && this.props.selectedRoleName
                            ? this.props.selectedRoleName
                            : this.props.selectedRoleId != null && this.props.selectedRoleId
                                ? ''
                                : 'None selected'
                }
            >
                <OptionsList
                    onChange={this.handleRoleChange}
                    label="Select role"
                    value={this.props.selectedRoleId}
                    options={[
                        ...(this.props.selectedRoleId === null
                            ? [{ key: 'no-role', value: null, label: 'No role assigned' }]
                            : []),
                        ...this.rolesOptionsList,
                        ...(this.props.showRemoveButton
                            ? [
                                  { key: 'separator', value: 'separator', label: '------' },
                                  { key: 'remove', value: 'remove', label: this.props.removeButtonLabel || 'Remove' },
                              ]
                            : []),
                    ]}
                    loadingOptions={this.isLoading}
                />
            </DropdownContainer>
        );
    }

    private referenceDropdownContainer = (ref: DropdownContainer) => (this.dropdownContainer = ref);

    private handleRoleChange = (option: { value: OptionsListValuePropType; label: string }) => {
        if (option.value !== null && (typeof option.value === 'number' || option.value === 'remove')) {
            if (this.props.onChange) {
                this.props.onChange({
                    value: option.value,
                    label: option.label,
                });
            }

            if (this.dropdownContainer) {
                this.dropdownContainer.closeDropdown();
            }
        }
    };

    private fetchRoles = async () => {
        try {
            this.isLoading = true;
            await UsersActions.fetchUsersProjectRoles();
            this.isLoading = false;
        } catch (error) {
            setTimeout(() => {
                this.fetchRoles();
            }, 2048);
            throw error;
        }
    };
}
