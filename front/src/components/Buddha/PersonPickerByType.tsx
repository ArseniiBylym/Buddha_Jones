import * as React from 'react';
import * as classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { AppOnlyStoreState } from 'store/AllStores';
import { DropdownContainer, OptionsList, OptionsListOptionProp, OptionsListValuePropType } from '../Form';
import { observable, computed } from 'mobx';
import { IconCheckmarkGreen } from '../Icons';
import { UsersActions } from 'actions';
import { UserTypeClassId } from 'types/user';

// Types
type PersonPickerByTypeAlignProp = 'left' | 'center' | 'right';

// Props
interface PersonPickerByTypeProps {
    className?: string | null;
    onChange?: ((option: { value: OptionsListValuePropType; label: string }) => void) | null;
    selectedUsersIds?: number[];
    showUsersOfTypesIds?: number[];
    showUsersOfClassIds?: UserTypeClassId[];
    showUsersByTypeOrClassId: 'type' | 'class';
    label?: string;
    maxWidth?: number;
    align?: PersonPickerByTypeAlignProp;
}

// Types
type PersonPickerByTypePropsType = PersonPickerByTypeProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class PersonPickerByType extends React.Component<PersonPickerByTypePropsType, {}> {
    static get defaultProps(): PersonPickerByTypeProps {
        return {
            className: null,
            onChange: null,
            selectedUsersIds: [],
            showUsersOfTypesIds: [],
            showUsersOfClassIds: [],
            showUsersByTypeOrClassId: 'type',
            label: 'People',
            maxWidth: 360,
            align: 'right',
        };
    }

    @observable private isLoading: boolean = false;
    @observable private searchValue: string = '';

    @computed
    private get pickerUserTypeIds(): number[] {
        if (this.props.showUsersByTypeOrClassId === 'type' && typeof this.props.showUsersOfTypesIds !== 'undefined') {
            return this.props.showUsersOfTypesIds;
        }

        if (!this.props.store) {
            return [];
        }

        if (this.props.showUsersByTypeOrClassId === 'class' && typeof this.props.showUsersOfClassIds !== 'undefined') {
            return this.props.store.users.peopleFetchesByClass.reduce((typeIds: number[], classFetch) => {
                if (
                    typeof classFetch.userTypesIds !== 'undefined' &&
                    classFetch.userTypesIds &&
                    typeof this.props.showUsersOfClassIds !== 'undefined' &&
                    this.props.showUsersOfClassIds.indexOf(classFetch.classId) !== -1
                ) {
                    typeIds.push(...classFetch.userTypesIds);
                }

                return typeIds;
            }, []);
        }

        return [];
    }

    @computed
    private get allUsersByTypeOptionsList(): OptionsListOptionProp[] {
        if (!this.props.store) {
            return [];
        }

        return this.pickerUserTypeIds.reduce((optionsList: OptionsListOptionProp[], typeId) => {
            if (!this.props.store) {
                return [];
            }

            const removeUsersIdsFromList: number[] = this.props.selectedUsersIds || [];

            optionsList = [
                ...optionsList,
                ...this.props.store.users.people.reduce((options: OptionsListOptionProp[], user) => {
                    if (
                        user.data &&
                        user.data.status &&
                        user.data.typeId === typeId &&
                        removeUsersIdsFromList.indexOf(user.id) === -1
                    ) {
                        options.push({
                            key: 'person-' + user.id,
                            value: user.id,
                            label: user.data.fullName || user.data.username,
                            typeName: user.data.typeName,
                        });
                    }

                    return options;
                }, []),
            ];

            return optionsList;
        }, []);
    }

    private dropdownContainer: DropdownContainer | null = null;

    public componentDidMount() {
        if (this.props.showUsersByTypeOrClassId === 'type') {
            this.fetchUsersByType(this.props.showUsersOfTypesIds);
        } else if (this.props.showUsersByTypeOrClassId === 'class') {
            this.fetchUsersByClass(this.props.showUsersOfClassIds);
        }
    }

    public componentWillReceiveProps(nextProps: PersonPickerByTypeProps) {
        if (nextProps.showUsersByTypeOrClassId === 'type' && typeof nextProps.showUsersOfTypesIds !== 'undefined') {
            const typeIdsHaveChanged =
                typeof this.props.showUsersOfTypesIds !== 'undefined'
                    ? nextProps.showUsersOfTypesIds.some(
                          userTypeId =>
                              typeof this.props.showUsersOfTypesIds !== 'undefined' &&
                              this.props.showUsersOfTypesIds.indexOf(userTypeId) === -1
                                  ? true
                                  : false
                      )
                    : false;

            if (
                typeIdsHaveChanged ||
                (typeof this.props.showUsersOfTypesIds !== 'undefined' &&
                    this.props.showUsersOfTypesIds.length !== nextProps.showUsersOfTypesIds.length)
            ) {
                this.fetchUsersByType(nextProps.showUsersOfTypesIds);
            }
        }

        if (nextProps.showUsersByTypeOrClassId === 'class' && typeof nextProps.showUsersOfClassIds !== 'undefined') {
            const classIdsHaveChanged =
                typeof this.props.showUsersOfClassIds !== 'undefined'
                    ? nextProps.showUsersOfClassIds.some(
                          classId =>
                              typeof this.props.showUsersOfClassIds !== 'undefined' &&
                              this.props.showUsersOfClassIds.indexOf(classId) === -1
                                  ? true
                                  : false
                      )
                    : false;

            if (
                classIdsHaveChanged ||
                (typeof this.props.showUsersOfClassIds !== 'undefined' &&
                    this.props.showUsersOfClassIds.length !== nextProps.showUsersOfClassIds.length)
            ) {
                this.fetchUsersByClass(nextProps.showUsersOfClassIds);
            }
        }
    }

    public render() {
        return (
            <DropdownContainer
                className={classNames(this.props.className)}
                ref={this.referenceDropdownContainer}
                align={this.props.align}
                minWidth={320}
                maxWidth={this.props.maxWidth || undefined}
                label={this.props.label || ''}
            >
                <OptionsList
                    onChange={this.handleUserChange}
                    search={{
                        autoFocus: true,
                        label: 'Search people',
                        value: this.searchValue,
                        onChange: this.handleSearchChange,
                    }}
                    value={
                        typeof this.props.selectedUsersIds !== 'undefined' && this.props.selectedUsersIds.length > 0
                            ? this.props.selectedUsersIds
                            : null
                    }
                    noOptionsLabel="No people found"
                    options={this.allUsersByTypeOptionsList}
                    loadingOptions={this.isLoading}
                    selectedIcon={<IconCheckmarkGreen width={15} height={15} />}
                />
            </DropdownContainer>
        );
    }

    private referenceDropdownContainer = (ref: DropdownContainer) => (this.dropdownContainer = ref);

    private handleSearchChange = (value: string) => {
        this.searchValue = value;
    };

    private handleUserChange = (option: { value: OptionsListValuePropType; label: string }) => {
        if (this.props.onChange) {
            this.props.onChange(option);
        }

        if (this.dropdownContainer) {
            this.dropdownContainer.closeDropdown();
        }
    };

    private fetchUsersByType = async (showUsersOfTypesIds: number[] = []) => {
        try {
            this.isLoading = true;
            await UsersActions.fetchUsersByType(showUsersOfTypesIds);
            this.isLoading = false;
        } catch (error) {
            // TODO fix this kind of error handling all over the project
            setTimeout(() => {
                this.fetchUsersByType(showUsersOfTypesIds);
            }, 1024);
            throw error;
        }
    };

    private fetchUsersByClass = async (showUsersOfClassIds: UserTypeClassId[] = []) => {
        try {
            this.isLoading = true;
            await UsersActions.fetchUsersByClass(showUsersOfClassIds);
            this.isLoading = false;
        } catch (error) {
            // TODO fix this kind of error handling all over the project
            setTimeout(() => {
                this.fetchUsersByClass(showUsersOfClassIds);
            }, 1024);
            throw error;
        }
    };
}
