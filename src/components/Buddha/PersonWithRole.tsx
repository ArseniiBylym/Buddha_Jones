import * as React from 'react';
import * as classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { Checkmark, DropdownContainer, OptionsList } from '../Form';
import { computed, observable } from 'mobx';
import { AppOnlyStoreState } from 'store/AllStores';
import { UserProjectRole, OtherUserDetails } from 'types/users';
import { LoadingIndicator } from '../Loaders';
import { UsersActions } from 'actions';
import { PersonRoleDropdown } from '.';

// Styles
const s = require('./PersonWithRole.css');

// Props
interface PersonWithRoleProps {
    className?: string;
    onChange?: ((role: { value: number | string | 'remove'; label: string }) => void) | null;
    userId: number;
    userFullName?: string | null;
    userImage?: string | null;
    roleId?: number | null;
    roleName?: string | null;
    hideRole?: boolean;
    selected?: boolean;
    showCheckmark?: boolean;
    editing?: boolean;
    updating?: boolean;
}

// Component
@inject('store')
@observer
export class PersonWithRole extends React.Component<PersonWithRoleProps & AppOnlyStoreState, {}> {
    static get defaultProps(): PersonWithRoleProps {
        return {
            className: undefined,
            onChange: null,
            userId: 0,
            userFullName: null,
            userImage: null,
            roleId: null,
            roleName: null,
            hideRole: false,
            selected: false,
            showCheckmark: false,
            editing: false,
            updating: false,
        };
    }

    @observable private isLoading: boolean = false;

    @computed
    private get user(): OtherUserDetails | null {
        if (!this.props.store) {
            return null;
        }

        return this.props.store.users.people.find(person => person.id === this.props.userId) || null;
    }

    @computed
    private get role(): UserProjectRole | null {
        if (!this.props.store || (this.props.roleId !== null && this.props.roleId !== 0)) {
            return null;
        }

        return this.props.store.users.projectRoles.find(role => role.id === this.props.roleId) || null;
    }

    private personActionsDropdown: DropdownContainer | null = null;

    public componentDidMount() {
        this.fetchData();
    }

    public render() {
        return (
            <div className={classNames(s.personWithRole, this.props.className)}>
                {this.props.showCheckmark && (
                    <div className={s.checkmarkContainer}>
                        <Checkmark checked={this.props.selected!} type="green" readOnly={true} />
                    </div>
                )}

                <div className={s.userImage}>
                    <span
                        style={{
                            backgroundImage:
                                this.props.userImage || (this.user !== null && this.user.data && this.user.data.image)
                                    ? this.user !== null && this.user.data && this.user.data.image
                                        ? `url(${this.user.data.image})`
                                        : this.props.userImage
                                            ? `url(${this.props.userImage})`
                                            : undefined
                                    : undefined,
                        }}
                    />
                </div>

                <div className={s.userDetails}>
                    {this.props.userFullName != null ||
                    this.props.userImage != null ||
                    (this.user !== null && this.user.data && this.user.data.fullName) ? (
                        <>
                            <p className={s.name}>
                                {this.user !== null && this.user.data
                                    ? this.user.data.fullName
                                    : this.props.userFullName != null
                                        ? this.props.userFullName
                                        : ''}
                            </p>

                            {(!this.props.editing &&
                                !this.props.updating &&
                                this.props.hideRole === false && (
                                    <p className={s.role}>
                                        {(this.props.roleName != null && this.props.roleName) ||
                                        (this.role !== null && this.role.name) ? (
                                            <strong>
                                                {this.role !== null
                                                    ? this.role.name
                                                    : this.props.roleName != null && this.props.roleName
                                                        ? this.props.roleName
                                                        : ''}
                                            </strong>
                                        ) : (
                                            <span>No role assigned</span>
                                        )}
                                    </p>
                                )) ||
                                (this.props.updating &&
                                    typeof this.props.roleName === 'undefined' && (
                                        <div className={s.role}>
                                            <LoadingIndicator
                                                label="Updating"
                                                spinnerSize={12}
                                                spinnerColor="#A59E97"
                                            />
                                        </div>
                                    )) ||
                                ((this.props.editing &&
                                    this.props.hideRole === false && (
                                        <PersonRoleDropdown
                                            onChange={this.handlePersonsRoleChange}
                                            showRemoveButton={true}
                                            removeButtonLabel="Remove from the campaign"
                                            selectedRoleId={
                                                this.role && this.role.id
                                                    ? this.role.id
                                                    : this.props.roleId != null && this.props.roleId
                                                        ? this.props.roleId
                                                        : null
                                            }
                                            selectedRoleName={
                                                this.role && this.role.name
                                                    ? this.role.name
                                                    : this.props.roleName != null && this.props.roleName
                                                        ? this.props.roleName
                                                        : null
                                            }
                                        />
                                    )) ||
                                    (this.props.editing &&
                                        this.props.hideRole === true && (
                                            <DropdownContainer
                                                ref={this.referencePersonActionsDropdown}
                                                className={s.dropdownContainer}
                                                label="Remove"
                                                value=""
                                            >
                                                <OptionsList
                                                    label="Action"
                                                    onChange={this.handlePersonsRoleChange}
                                                    options={[
                                                        { key: 'cancel', value: null, label: 'Cancel' },
                                                        {
                                                            key: 'remove',
                                                            value: 'remove',
                                                            label: 'Remove from the campaign',
                                                        },
                                                    ]}
                                                />
                                            </DropdownContainer>
                                        )))}

                            {this.isLoading && (
                                <LoadingIndicator className={s.updating} spinnerSize={12} spinnerColor="#A59E97" />
                            )}
                        </>
                    ) : (
                        <LoadingIndicator label="Loading" labelOnRight={true} />
                    )}
                </div>
            </div>
        );
    }

    private referencePersonActionsDropdown = (ref: DropdownContainer) => (this.personActionsDropdown = ref);

    private handlePersonsRoleChange = (role: { value: number | string | 'remove'; label: string }) => {
        if (this.props.onChange) {
            this.props.onChange(role);
        }

        if (this.personActionsDropdown) {
            this.personActionsDropdown.closeDropdown();
        }
    };

    private fetchData = async () => {
        try {
            this.isLoading = true;

            await UsersActions.fetchUserById(this.props.userId);

            this.isLoading = false;
        } catch (error) {
            setTimeout(() => {
                this.fetchData();
            }, 2048);
            throw error;
        }
    };
}
