import * as React from 'react';
import * as styles from './styles.scss';
import { LoadingSpinner } from '../Loaders';
import { Paragraph } from '../Content';
import { Modal } from 'components/Modals';

interface Props {
    isActive: boolean;
    onConfirmationModalClose: () => void;
    onConfirmationSuccess?: () => void;
    isRemoving?: boolean;
    isErrorRemovingEntry?: boolean;
    confirmationMessage?: string;
}

export class RemoveConfirmationModal extends React.Component<Props, {}> {
    static get defaultProps(): Partial<Props> {
        return {
            onConfirmationSuccess: () => undefined,
            isRemoving: false,
            isErrorRemovingEntry: false,
            confirmationMessage: 'Are you sure you want to delete this time entry?'
        };
    }

    public render() {
        return (
            <Modal
                show={this.props.isActive}
                onClose={this.props.onConfirmationModalClose}
                title="Deleting entry is irreversible"
                text={this.props.confirmationMessage}
                actions={[
                    {
                        closeOnClick: true,
                        label: 'No, do not delete',
                        type: 'default',
                    },
                    {
                        onClick: this.props.onConfirmationSuccess,
                        closeOnClick: false,
                        label: 'Yes, please delete',
                        type: 'alert',
                    },
                ]}
            >
                <div className={styles.centered}>
                    {this.props.isRemoving && <LoadingSpinner/>}

                    {this.props.isErrorRemovingEntry && (
                        <Paragraph bold={true} type="alert">
                            Could not delete, try again
                        </Paragraph>
                    )}
                </div>
            </Modal>
        );
    }
}
