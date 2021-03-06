import * as React from 'react';
import { computed, observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Modal } from 'components/Modals';
import { TimeEntryCalendarDuration } from './TimeEntryCalendarDuration';
import { TimeEntryContent } from './TimeEntryContent';
import { TimeEntryActions, TimeApprovalActions } from 'actions';
import { AppOnlyStoreState } from 'store/AllStores';
import { RemoveConfirmationModal } from '../../../components/RemoveConfiramtionModal';

interface Props {
    openOnPage: 'time-entry' | 'time-approve';
}

@inject('store')
@observer
export class TimeEntryModal extends React.Component<Props & AppOnlyStoreState, {}> {
    @observable private showEntryRemovalModal: boolean = false;
    @observable private removingEntry: boolean = false;
    @observable private errorRemovingEntry: boolean = false;

    @computed
    private get isModalOpen(): boolean {
        if (!this.props.store) {
            return false;
        }

        return this.props.store.timeEntry.values !== null;
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { timeEntry } = this.props.store;

        return (
            <>
                <Modal
                    onClose={this.handleModalClose}
                    closeButtonLabel={
                        timeEntry.values !== null && timeEntry.values.editingEntryId
                            ? 'Cancel time entry edits'
                            : 'Close new time entry form'
                    }
                    size="content-wide"
                    show={this.isModalOpen}
                    forceLongContent={true}
                    noPadding={true}
                    closeButton={true}
                    preventBackdropClick={true}
                >
                    <TimeEntryCalendarDuration/>

                    <TimeEntryContent
                        onDeleteConfirmationOpen={this.handleOpeningEntryDeleteConfirmation}
                        onReset={this.handleModalClose}
                        forUser={timeEntry.values && timeEntry.values.forUser ? timeEntry.values.forUser : null}
                    />
                </Modal>

                <RemoveConfirmationModal
                    isActive={this.showEntryRemovalModal}
                    onConfirmationModalClose={this.handleClosingEntryDeleteConfirmation}
                    isErrorRemovingEntry={this.errorRemovingEntry}
                    isRemoving={this.removingEntry}
                    onConfirmationSuccess={this.handleRemovingEntry}
                />
            </>
        );
    }

    @action
    private handleModalClose = (): void => {
        TimeEntryActions.closeTimeEntryModal();
    };

    private handleOpeningEntryDeleteConfirmation = (): void => {
        this.showEntryRemovalModal = true;
    };

    private handleClosingEntryDeleteConfirmation = (): void => {
        this.showEntryRemovalModal = false;
    };

    private handleRemovingEntry = async () => {
        try {
            if (this.removingEntry) {
                return;
            }

            this.errorRemovingEntry = false;

            if (this.props.store) {
                const { timeEntry } = this.props.store;

                if (timeEntry.values && timeEntry.values.editingEntryId && timeEntry.values.forUser) {
                    this.removingEntry = true;

                    if (this.props.openOnPage === 'time-entry') {
                        TimeEntryActions.deleteEntryFromFetchedEntries(
                            timeEntry.values.forUser.id,
                            timeEntry.values.editingEntryId
                        );
                    } else if (this.props.openOnPage === 'time-approve') {
                        TimeApprovalActions.deleteEntryFromFetchedEntries(timeEntry.values.editingEntryId);
                    }

                    await TimeEntryActions.deleteExistingEntry(timeEntry.values.editingEntryId);

                    this.handleClosingEntryDeleteConfirmation();

                    TimeEntryActions.closeTimeEntryModal();

                    this.removingEntry = false;
                }
            }
        } catch (error) {
            this.errorRemovingEntry = true;
            this.removingEntry = false;
            throw error;
        }
    };
}
