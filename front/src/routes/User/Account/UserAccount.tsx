import * as React from 'react';
import * as classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { HeaderActions, UserActions } from 'actions';
import { AppState } from 'store/AllStores';
import { Button, ButtonBack } from 'components/Button';
import { history } from 'App';
import { IconLockWhite } from 'components/Icons';
import { Row, Col, Section } from 'components/Section';
import { observable, computed, action } from 'mobx';
import { UserAccountName } from '.';
import { Input } from 'components/Form';
import { FileHandler } from 'helpers/FileHandler';

// Styles
const s = require('./UserAccount.css');
const emptyUserProfilePicture = require('./../../../assets/images/account/empty-user-profile-picture.png');

// Props
interface UserAccountProps {
}

// Types
type UserAccountPropsTypes = UserAccountProps & AppState;

// Component
@inject('store')
@observer
class UserAccount extends React.Component<UserAccountPropsTypes, {}> {
    private imageFileField: HTMLInputElement | null = null;

    @observable private pictureUploadStatus: 'none' | 'uploading' | 'success' | 'error' = 'none';
    @observable private pictureUploadErrorMessage: string = '';

    @observable
    private profileUploadStatus: 'none' | 'uploading' | 'success' | 'error' | 'error-emailrequired' = 'none';
    @observable
    private passwordUploadStatus:
        | 'none'
        | 'uploading'
        | 'success'
        | 'error'
        | 'error-newpasswordsnomatch'
        | 'error-allfieldsrequired' =
        'none';

    @observable
    private userFields: {
        username: string;
        firstName: string;
        lastName: string;
        initials: string;
        email: string;
        oldPassword: string;
        newPassword: string;
        newPasswordRepeat: string;
    } = {
        username: '',
        firstName: '',
        lastName: '',
        initials: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
    };

    @computed
    private get userProfilePicture(): string {
        if (this.props.store && this.props.store.user.isLoggedIn && this.props.store.user.data) {
            return this.props.store.user.data.image ? this.props.store.user.data.image : emptyUserProfilePicture;
        }

        return emptyUserProfilePicture;
    }

    public componentDidMount() {
        if (this.props.store) {
            // Set header
            HeaderActions.setMainHeaderTitlesAndElements(
                'My account',
                this.props.store.user.isLoggedIn && this.props.store.user.data
                    ? this.props.store.user.data.fullName
                    : 'You are not logged in',
                null,
                null,
                [
                    <ButtonBack key="back-button" onClick={this.handleGoingBack} label="Back to previous page"/>,
                    <Button
                        key="logout-button"
                        onClick={this.handleUserLogout}
                        label={{
                            text: 'Logout',
                            color: 'white',
                            size: 'large',
                            onLeft: true,
                        }}
                        icon={{
                            size: 'small',
                            background: 'orange',
                            element: <IconLockWhite width={12} height={18}/>,
                        }}
                    />,
                ]
            );

            // Set user data
            if (this.props.store.user.isLoggedIn && this.props.store.user.data) {
                this.userFields = {
                    username: this.props.store.user.data.username,
                    firstName: this.props.store.user.data.firstName || '',
                    lastName: this.props.store.user.data.lastName || '',
                    initials: this.props.store.user.data.initials || '',
                    email: this.props.store.user.data.email || '',
                    oldPassword: '',
                    newPassword: '',
                    newPasswordRepeat: '',
                };
            }
        }
    }

    public render() {
        return (
            <Row>
                <Col size={3}>
                    <Section noSeparator={true}>
                        <button
                            onClick={this.handlePictureEdit}
                            className={classNames(s.accountImageButton, {
                                [s.uploading]: this.pictureUploadStatus === 'uploading',
                            })}
                        >
                            <p className={s.accountButton}>
                                {this.pictureUploadStatus === 'uploading' ? 'Uploading' : 'Edit photo'}
                            </p>
                            <p className={s.accountLabel}>Image should be at least 128 x 128 pixels large</p>
                            <img
                                src={this.userProfilePicture}
                                onError={this.handleUserProfilePictureNotLoading}
                                height="128"
                                width="128"
                            />
                        </button>

                        {this.pictureUploadStatus === 'error' && (
                            <p className={s.accountImageUploadError}>{this.pictureUploadErrorMessage}</p>
                        )}

                        <input
                            ref={this.referenceImageFileField}
                            className={s.accountImageFileField}
                            onChange={this.handlePictureFileChange}
                            accept=".gif,.jpg,.jpeg,.png,.bmp"
                            type="file"
                        />
                    </Section>
                </Col>

                <Col size={9}>
                    <Section noSeparator={true}>
                        <Row className={s.profileDetails} justifyContent="flex-start">
                            {this.userFields.username && (
                                <UserAccountName label="Username:" value={this.userFields.username}/>
                            )}
                            {this.userFields.firstName && (
                                <UserAccountName label="First name:" value={this.userFields.firstName}/>
                            )}
                            {this.userFields.lastName && (
                                <UserAccountName label="Last name:" value={this.userFields.lastName}/>
                            )}
                            {this.userFields.initials && (
                                <UserAccountName label="Initials:" value={this.userFields.initials}/>
                            )}
                        </Row>
                    </Section>

                    <Section title="Email address">
                        <Input
                            onChange={this.handleProfileInfoChange('email')}
                            value={this.userFields.email}
                            label="Email address"
                            type="text"
                        />
                        <br/>
                        <Button
                            onClick={this.handleProfileInfoChangeSave}
                            float="right"
                            label={{
                                text:
                                    this.profileUploadStatus === 'uploading'
                                        ? 'Saving profile changes'
                                        : this.profileUploadStatus === 'error-emailrequired'
                                        ? 'Email is required'
                                        : this.profileUploadStatus === 'error'
                                            ? 'Could not save changes, try again'
                                            : this.profileUploadStatus === 'success'
                                                ? 'Changes have been saved'
                                                : 'Save profile changes',
                                color:
                                    this.profileUploadStatus === 'uploading'
                                        ? 'black'
                                        : this.profileUploadStatus === 'error' ||
                                        this.profileUploadStatus === 'error-emailrequired'
                                        ? 'orange'
                                        : this.profileUploadStatus === 'success'
                                            ? 'green'
                                            : 'blue',
                                size: 'large',
                            }}
                        />
                        <br/>
                    </Section>

                    <Section title="Change password">
                        <Input
                            onChange={this.handlePasswordChange('old')}
                            value={this.userFields.oldPassword}
                            label="Old password"
                            type="password"
                        />
                        <br/>
                        <Input
                            onChange={this.handlePasswordChange('new')}
                            value={this.userFields.newPassword}
                            label="New password"
                            type="password"
                        />
                        <br/>
                        <Input
                            onChange={this.handlePasswordChange('new-repeat')}
                            value={this.userFields.newPasswordRepeat}
                            label="Repeat new password"
                            type="password"
                        />
                        <br/>
                        <Button
                            onClick={this.handlePasswordChangeSave}
                            float="right"
                            label={{
                                text:
                                    this.passwordUploadStatus === 'uploading'
                                        ? 'Saving new password'
                                        : this.passwordUploadStatus === 'error'
                                        ? 'Could not save changes, ' +
                                        'make sure old password is not mispelled and try again'
                                        : this.passwordUploadStatus === 'error-allfieldsrequired'
                                            ? 'All fields are required, try again'
                                            : this.passwordUploadStatus === 'error-newpasswordsnomatch'
                                                ? 'New passwords do no match, try again'
                                                : this.passwordUploadStatus === 'success'
                                                    ? 'Password has been changed'
                                                    : 'Save new password',
                                color:
                                    this.passwordUploadStatus === 'uploading'
                                        ? 'black'
                                        : this.passwordUploadStatus === 'success'
                                        ? 'green'
                                        : this.passwordUploadStatus === 'none'
                                            ? 'blue'
                                            : 'orange',
                                size: 'large',
                            }}
                        />
                    </Section>
                </Col>
            </Row>
        );
    }

    private referenceImageFileField = (ref: HTMLInputElement) => (this.imageFileField = ref);

    private handleGoingBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        history.goBack();
    };

    private handlePictureEdit = () => {
        if (this.imageFileField) {
            this.imageFileField.click();
        }
    };

    @action
    private handlePictureFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!this.props.store || this.props.store.user.data === null) {
                this.pictureUploadStatus = 'error';
                this.pictureUploadErrorMessage = 'No authorized user logged in';
                return;
            }

            const field = e.target;
            if (field.files === null || field.files.length <= 0) {
                this.pictureUploadStatus = 'error';
                this.pictureUploadErrorMessage = 'No file has been selected';
                return;
            }

            const file = field.files.item(0);
            if (file === null || !file.type.match('image.*')) {
                this.pictureUploadStatus = 'error';
                this.pictureUploadErrorMessage = 'File is not an image';
                return;
            }

            this.pictureUploadStatus = 'uploading';
            this.pictureUploadErrorMessage = '';

            const base64Image = await FileHandler.readFileAsDataUri(file);

            if (base64Image && base64Image.target && base64Image.target.result) {
                await UserActions.changeProfilePicture(this.props.store.user.data.id, base64Image.target.result);
            }

            this.pictureUploadStatus = 'success';

            return true;
        } catch (error) {
            if (this.pictureUploadStatus === 'uploading') {
                this.pictureUploadStatus = 'error';
            }
            throw error;
        }
    };

    @action
    private handleProfileInfoChange = (field: 'email') => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.userFields.email = e.target.value;
        this.profileUploadStatus = 'none';
    };

    @action
    private handleProfileInfoChangeSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const email = this.userFields.email.trim();

            if (email === '') {
                this.profileUploadStatus = 'error-emailrequired';
                return;
            }

            if (this.props.store && this.props.store.user.data) {
                this.profileUploadStatus = 'uploading';

                await UserActions.changeProfileInfo(this.props.store.user.data.id, email);

                this.profileUploadStatus = 'success';
            }

            setTimeout(() => {
                if (this.profileUploadStatus === 'success') {
                    this.profileUploadStatus = 'none';
                }
            }, 2048);

            return true;
        } catch (error) {
            if (this.profileUploadStatus === 'uploading') {
                this.profileUploadStatus = 'error';
            }
            throw error;
        }
    };

    private handlePasswordChange = (field: 'old' | 'new' | 'new-repeat') => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const text = e.target.value;

        switch (field) {
            case 'old':
                this.userFields.oldPassword = text;
                break;

            case 'new':
                this.userFields.newPassword = text;
                break;

            case 'new-repeat':
                this.userFields.newPasswordRepeat = text;
                break;

            default:
                break;
        }

        this.passwordUploadStatus = 'none';
    };

    @action
    private handlePasswordChangeSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (
            this.userFields.oldPassword.trim() === '' ||
            this.userFields.newPassword.trim() === '' ||
            this.userFields.newPasswordRepeat.trim() === ''
        ) {
            this.passwordUploadStatus = 'error-allfieldsrequired';
            return;
        }

        if (this.userFields.newPassword !== this.userFields.newPasswordRepeat) {
            this.passwordUploadStatus = 'error-newpasswordsnomatch';
            return;
        }

        if (!this.props.store || this.props.store.user.data === null) {
            this.passwordUploadStatus = 'error';
            return;
        }

        try {
            this.passwordUploadStatus = 'uploading';

            await UserActions.changePassword(
                this.props.store.user.data.id,
                this.userFields.oldPassword,
                this.userFields.newPassword
            );

            this.passwordUploadStatus = 'success';
            this.userFields.oldPassword = '';
            this.userFields.newPassword = '';
            this.userFields.newPasswordRepeat = '';

            setTimeout(() => {
                if (this.passwordUploadStatus === 'success') {
                    this.passwordUploadStatus = 'none';
                }
            }, 2048);
        } catch (error) {
            this.passwordUploadStatus = 'error';
            throw error;
        }
    };

    private handleUserLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        history.push('/user/logout');
    };

    private handleUserProfilePictureNotLoading = (e: React.InvalidEvent<HTMLImageElement>) => {
        e.target.src = emptyUserProfilePicture;
    };
}

export default UserAccount;
