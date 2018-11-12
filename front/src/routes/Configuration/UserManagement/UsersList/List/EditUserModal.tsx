import * as React from 'react';
import * as styles from './styles.scss';
import * as classNames from 'classnames';
import { UsersActions } from 'actions/index';
import { OtherUserFromApi, UserType } from 'types/users';
import { Modal } from 'components/Modals';
import {
    Checkmark,
    Input,
    InputColorProp,
    Select,
    SelectOptionPropType
} from 'components/Form';
import { UserAvatarUploader } from 'components/UserAvatarUploader';
import { Section } from 'components/Section';
import { BottomBar } from 'components/Layout';
import { ButtonSend } from 'components/Button';
import { Paragraph } from 'components/Content';
import * as validator from 'validator';

interface Props {
    currentUser: OtherUserFromApi | null;
    isModalOpen: boolean;
    onModalClose: () => void;
    setCurrentSelectedUser: typeof UsersActions.setCurrentSelectedUser;
    onUserSaveData: typeof UsersActions.saveCurrentSelectedUserAndReloadList;
    loggedUserTypeId: number;
    userTypes: UserType[];
    isLoading: boolean;
}

interface State {
    invalidateFields: string[];
}

export class EditUserModal extends React.PureComponent<Props, State> {
    public state: State = {
        invalidateFields: []
    };

    private static getSalaryTypeOptions(): SelectOptionPropType[] {
        return [
            {
                value: '',
                label: 'Choose salary type'
            },
            {
                value: 'S',
                label: 'Salary'
            },
            {
                value: 'H',
                label: 'Hourly'
            }
        ];
    }

    public render() {
        return (
            <>
                <Modal
                    show={this.props.isModalOpen}
                    closeButton={true}
                    onClose={this.props.onModalClose}
                    size={'content-wide'}
                >
                    {this.props.currentUser && this.getEditUserForm()}
                    {this.getBottomBar()}
                </Modal>
            </>
        );
    }

    private checkFieldForValid = (fieldName: string): InputColorProp => {
        if (this.state.invalidateFields.indexOf(fieldName) > -1) {
            return 'red';
        }

        return 'default';
    };

    private getEditUserForm(): JSX.Element {
        return (
            <form
                className={styles.editUserForm}
                onSubmit={this.onFormSubmitHandler}
            >
                <div className={styles.avatarSide}>
                    {
                        this.props.currentUser &&
                        <UserAvatarUploader
                            userId={this.props.currentUser!.id}
                            currentImage={this.props.currentUser!.image}
                        />
                    }
                </div>

                <div className={styles.formSide}>
                    <Section/>

                    <Section>
                        <Checkmark
                            checked={Boolean(this.props.currentUser!.status)}
                            type={'no-icon'}
                            label={'Active'}
                            onClick={this.onUserActiveChangeHandler}
                        />
                    </Section>

                    <Section title="First name">
                        <Input
                            onChange={this.onFieldChangeHandler}
                            value={this.props.currentUser!.firstName}
                            label="First name..."
                            autoFocus={true}
                            name={'firstName'}
                            color={this.checkFieldForValid('firstName')}
                        />
                    </Section>

                    <Section title="Last name">
                        <Input
                            onChange={this.onFieldChangeHandler}
                            value={this.props.currentUser!.lastName}
                            label="Last name..."
                            name={'lastName'}
                            color={this.checkFieldForValid('lastName')}
                        />
                    </Section>

                    <Section title="Nick name">
                        <Input
                            onChange={this.onFieldChangeHandler}
                            value={this.props.currentUser!.nickName}
                            label="Nick name..."
                            name={'nickName'}
                            color={this.checkFieldForValid('nickName')}
                        />
                    </Section>

                    <Section title="Email">
                        <Input
                            onChange={this.onFieldChangeHandler}
                            value={this.props.currentUser!.email}
                            label="Email..."
                            name={'email'}
                            type={'email'}
                            color={this.checkFieldForValid('email')}
                        />
                    </Section>

                    <Section title="User name">
                        <Input
                            value={this.props.currentUser!.username}
                            label="User name..."
                        />
                    </Section>

                    <Section title="User type">
                        <Select
                            options={this.getUserTypeOptions()}
                            value={this.props.currentUser!.typeId}
                            onChange={this.onOptionsFieldChangeHandler('typeId')}
                        />
                    </Section>

                    {
                        this.props.loggedUserTypeId === 100 &&
                        <section className={styles.salarySection}>
                            <Section title="Salary type">
                                <Select
                                    options={EditUserModal.getSalaryTypeOptions()}
                                    value={this.getSalaryTypeValue()}
                                    onChange={this.onOptionsFieldChangeHandler('salaryType')}
                                />
                            </Section>

                            <Section title="Salary">
                                <Input
                                    onChange={this.onFieldChangeHandler}
                                    value={this.props.currentUser!.salaryAmount}
                                    label="Salary..."
                                    name={'salaryAmount'}
                                    color={this.checkFieldForValid('salaryAmount')}
                                />
                            </Section>

                            <Section title="Hourly">
                                <Input
                                    onChange={this.onFieldChangeHandler}
                                    value={this.props.currentUser!.hourlyRate}
                                    label="Hourly..."
                                    name={'hourlyRate'}
                                    color={this.checkFieldForValid('hourlyRate')}
                                />
                            </Section>
                        </section>
                    }
                </div>
            </form>
        );
    }

    private onFormSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    private getBottomBar(): JSX.Element {
        return (
            <BottomBar
                isWholeWidth={true}
                show={true}
            >
                <div className={styles.bottomBar}>
                    <div className={styles.left}>
                        <Paragraph
                            className={classNames(styles.errorMessage, {[styles.show]: true})}
                            type="alert"
                        >
                            {
                                this.state.invalidateFields.length > 0 &&
                                'Please check the form fields'
                            }
                        </Paragraph>
                    </div>

                    <div className={styles.buttonSaveBlock}>
                        <ButtonSend
                            onClick={this.onFormSaveHandler}
                            savingLabel="Saving"
                            saving={this.props.isLoading}
                            labelColor={'blue'}
                            label={this.props.isLoading ? 'Saving data' : 'Save'}
                        />
                    </div>
                </div>
            </BottomBar>
        );
    }

    private getSalaryTypeValue(): string {
        if (this.props.currentUser && this.props.currentUser.salaryType) {
            return this.props.currentUser.salaryType;
        }

        return '';
    }

    private getUserTypeOptions(): SelectOptionPropType[] {
        if (this.props.userTypes) {
            return this.props.userTypes.map((userType: UserType) => {
                return {
                    label: userType.name,
                    value: userType.id.toString()
                };
            });
        }

        return [];
    }

    private isFormValid(): boolean {
        let result: boolean = true;

        this.setState({
            invalidateFields: []
        });

        const requiredFields: string[] = ['firstName', 'lastName', 'typeId'];
        const decimalFields: string[] = ['salaryAmount', 'hourlyRate'];
        const invalidateFields: string[] = [];

        if (this.props.currentUser) {
            requiredFields.forEach((fieldName: string) => {
                if (!this.props.currentUser![fieldName]) {
                    result = false;
                    invalidateFields.push(fieldName);
                }
            });

            decimalFields.forEach((fieldName: string) => {
                if (isNaN(Number(this.props.currentUser![fieldName]))) {
                    result = false;
                    invalidateFields.push(fieldName);
                }
            });

            if (!validator.isEmail(this.props.currentUser.email as string)) {
                result = false;
                invalidateFields.push('email');
            }

            this.setState({invalidateFields});
        } else {
            return false;
        }

        return result;
    }

    private onComputeUserNameAndFullName() {
        let userNameFirstPart: string = '';
        let userNameSecondPart: string = '';

        if (this.props.currentUser && this.props.currentUser.firstName) {
            userNameFirstPart = this.props.currentUser.firstName.replace(/\s/ig, '');
            userNameFirstPart = userNameFirstPart.substr(0, 1);
        }

        if (this.props.currentUser && this.props.currentUser.lastName) {
            userNameSecondPart = this.props.currentUser.lastName.replace(/\s/ig, '');
        }

        this.props.setCurrentSelectedUser({
            username: (userNameFirstPart + userNameSecondPart).toLowerCase(),
            fullName: this.props.currentUser!.firstName + ' ' + this.props.currentUser!.lastName
        });
    }

    private onFormSaveHandler = () => {
        if (this.isFormValid()) {
            this.props.onUserSaveData();
        }
    };

    private onFieldChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setCurrentSelectedUser({
            [event.target.name]: event.target.value
        });

        if (event.target.name === 'firstName' || event.target.name === 'lastName') {
            this.onComputeUserNameAndFullName();
        }
    };

    private onOptionsFieldChangeHandler = (optionName: string) => (value: any) => {
        this.props.setCurrentSelectedUser({
            [optionName]: value
        });
    };

    private onUserActiveChangeHandler = () => {
        this.props.setCurrentSelectedUser({
            status: !Boolean(this.props.currentUser!.status) ? 1 : 0
        });
    };
}