import * as React from 'react';
import * as styles from './styles.scss';
import * as classNames from 'classnames';
import { action, observable } from 'mobx';
import { AppOnlyStoreState } from 'store/AllStores';
import { Section } from '../Section';
import { FileHandler } from 'helpers/FileHandler';
import { UserActions } from 'actions';
import { observer } from 'mobx-react';

const emptyUserProfilePicture = require('../../assets/images/account/empty-user-profile-picture.png');

interface Props extends AppOnlyStoreState {
    currentImage: string | null;
    userId: number;
}

enum PictureUploadStatus {
    none,
    uploading,
    success,
    error
}

@observer
export class UserAvatarUploader extends React.Component<Props, {}> {
    private imageFileField: HTMLInputElement | null = null;

    @observable private pictureUploadStatus: PictureUploadStatus = PictureUploadStatus.none;
    @observable private pictureUploadErrorMessage: string = '';
    @observable private currentImage: string = '';

    componentDidMount() {
        this.setCurrentImage();
    }

    public render() {
        return (
            <Section noSeparator={true}>
                <button
                    onClick={this.handlePictureEdit}
                    className={classNames(styles.accountImageButton, {
                        [styles.uploading]: this.pictureUploadStatus === PictureUploadStatus.uploading,
                    })}
                >
                    <p className={styles.accountButton}>
                        {this.pictureUploadStatus === PictureUploadStatus.uploading ? 'Uploading' : 'Edit photo'}
                    </p>

                    <p className={styles.accountLabel}>Image should be at least 128 x 128 pixels large</p>

                    <img
                        src={this.currentImage}
                        onError={this.handleUserProfilePictureNotLoading}
                        height="128"
                        width="128"
                    />
                </button>

                {this.pictureUploadStatus === PictureUploadStatus.error && (
                    <p className={styles.accountImageUploadError}>{this.pictureUploadErrorMessage}</p>
                )}

                <input
                    ref={this.referenceImageFileField}
                    className={styles.accountImageFileField}
                    onChange={this.handlePictureFileChange}
                    accept=".gif,.jpg,.jpeg,.png,.bmp"
                    type="file"
                />
            </Section>
        );
    }

    private handlePictureEdit = () => {
        if (this.imageFileField) {
            this.imageFileField.click();
        }
    };

    private referenceImageFileField = (ref: HTMLInputElement) => (this.imageFileField = ref);

    private getCurrentImage(): string {
        if (this.props.currentImage) {
            return this.props.currentImage;
        }

        return emptyUserProfilePicture;
    }

    private handleUserProfilePictureNotLoading = (e: React.InvalidEvent<HTMLImageElement>) => {
        e.target.src = emptyUserProfilePicture;
    };

    @action
    private setCurrentImage() {
        this.currentImage = this.getCurrentImage();
    }

    @action
    private handlePictureFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const field = e.target;

            if (field.files === null || field.files.length <= 0) {
                this.pictureUploadStatus = PictureUploadStatus.error;
                this.pictureUploadErrorMessage = 'No file has been selected';
                return null;
            }

            const file = field.files.item(0);

            if (file === null || !file.type.match('image.*')) {
                this.pictureUploadStatus = PictureUploadStatus.error;
                this.pictureUploadErrorMessage = 'File is not an image';
                return null;
            }

            this.pictureUploadStatus = PictureUploadStatus.uploading;
            this.pictureUploadErrorMessage = '';

            const base64Image = await FileHandler.readFileAsDataUri(file);

            if (base64Image && base64Image.target && base64Image.target.result) {
                await UserActions.changeProfilePicture(this.props.userId, base64Image.target.result);
                this.currentImage = base64Image.target.result;
            }

            this.pictureUploadStatus = PictureUploadStatus.success;

            return true;
        } catch (error) {
            if (this.pictureUploadStatus === PictureUploadStatus.uploading) {
                this.pictureUploadStatus = PictureUploadStatus.error;
            }
            throw error;
        }
    };
}
