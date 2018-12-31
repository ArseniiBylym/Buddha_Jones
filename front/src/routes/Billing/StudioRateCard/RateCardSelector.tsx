import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { match } from 'react-router';
import * as styles from './styles.scss';
import { AppState } from 'store/AllStores';
import { DropdownContainer, OptionsList } from '../../../components/Form';
import { ButtonEdit, ButtonDelete, ButtonAdd } from '../../../components/Button';
import { action, computed, observable } from 'mobx';
import { StudioRateCard } from '../../../types/studioRateCard';
import { StudioRateCardActions } from '../../../actions';
import { LoadingSpinner } from '../../../components/Loaders';
import AddRateModal from './AddRateModal';
import { RemoveConfirmationModal } from '../../../components/RemoveConfiramtionModal';
import { history } from '../../../App';
import { ButtonAttach } from '../../../components/Button/ButtonAttach';
import { ButtonRemoveAttachment } from '../../../components/Button/ButtonRemoveAttachment';

interface Props {
    match: match<MatchParams>;
}

interface MatchParams {

}

@inject('store')
@observer
class RateCardSelector extends React.Component<Props & AppState, {}> {
    @observable
    private rateCardSelector?: DropdownContainer;
    @observable
    private isModalOpened: boolean = false;
    @observable
    private modalMode: 'new' | 'edit' = 'new';
    @observable
    private isDeleteModalOpened: boolean = false;
    @observable
    private isRemoveAttachmentModalOpened: boolean = false;
    @observable
    private isAddingAttachment: boolean = false;

    private attachRef: any;

    private reader = new FileReader();

    public componentDidMount() {
        this.reader.addEventListener('load', this.handleFileLoad);
    }

    @computed
    private get getStudioRateCardData(): StudioRateCard {
        return this.props.store!.studioRateCard;
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        return (
            <div className={styles.rateCardContainer}>
                {
                    this.getStudioRateCardData.rateCardTypes.loading ?
                    <LoadingSpinner size={30}/>
                        :
                    <DropdownContainer
                        label="Rate Card: "
                        value={this.getStudioRateCardData.selectedRateCardLabel}
                        className={styles.rateCardSelector}
                        ref={this.rateCardSelectorRef}
                    >
                        <OptionsList
                            onChange={this.handleFilterChange}
                            value={this.getStudioRateCardData.selectedRateCardLabel}
                            options={this.getOptions()}
                            className={styles.optionClassName}
                        />
                    </DropdownContainer>
                }
                {
                    this.getStudioRateCardData.selectedRateCardLabel !== '' &&
                    <>
                        <ButtonEdit
                            onClick={this.handleRateAdd}
                            label=""
                            labelOnLeft={false}
                            float="right"
                            iconBackground="none"
                        />
                        <ButtonDelete
                            onClick={this.openDeleteModal}
                            label=""
                            labelOnLeft={false}
                            float="right"
                            iconBackground="none"
                        />
                        <ButtonAttach
                            onClick={this.handleAttachClick}
                            label=""
                            labelOnLeft={false}
                            float="right"
                            iconBackground="none"
                            isLoading={this.isAddingAttachment}
                            file={this.getStudioRateCardData.selectedRateCardFile}
                        />
                        {
                            this.getStudioRateCardData.selectedRateCardFile &&
                            <ButtonRemoveAttachment
                                onClick={this.openRemoveAttachmentModal}
                                label=""
                                labelOnLeft={true}
                                float="right"
                                iconBackground="none"
                            />
                        }
                    </>
                }
                {
                    !this.getStudioRateCardData.rateCardTypes.loading && <ButtonAdd
                        className={styles.rateCardAddButton}
                        label=""
                        labelOnLeft={true}
                        float="left"
                        isWhite={true}
                        labelSize="small"
                        labelColor="black"
                        onClick={this.handleAddNewRate}
                        adding={false}
                    />
                }
                <input
                    ref={this.handlePdfFile}
                    className={styles.attachPDF}
                    onChange={this.handlePdfFileChange}
                    accept=".pdf"
                    type="file"
                />
                <AddRateModal
                    isOpen={this.isModalOpened}
                    onClose={this.closeModal}
                    onAdd={this.addRateCardType}
                    onSave={this.saveRate}
                    isSaving={this.getStudioRateCardData.rateCardTypes.saving || this.getStudioRateCardData.rateCardTypes.adding}
                    label={this.getStudioRateCardData.selectedRateCardLabel}
                    mode={this.modalMode}
                />
                <RemoveConfirmationModal
                    isActive={this.isDeleteModalOpened}
                    onConfirmationModalClose={this.closeDeleteModal}
                    isErrorRemovingEntry={false}
                    isRemoving={this.getStudioRateCardData.rateCardTypes.deleting}
                    onConfirmationSuccess={this.deleteRateCard}
                    confirmationMessage="Are you sure you want to delete rate card?"
                />
                <RemoveConfirmationModal
                    isActive={this.isRemoveAttachmentModalOpened}
                    onConfirmationModalClose={this.closeRemoveAttachmentModal}
                    isErrorRemovingEntry={false}
                    isRemoving={this.getStudioRateCardData.rateCardTypes.saving}
                    onConfirmationSuccess={this.handleDeleteAttachment}
                    confirmationMessage="Are you sure you want to remove attachment?"
                />
            </div>
        );
    }

    private handlePdfFile = (ref) => this.attachRef = ref;

    private handlePdfFileChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files.item(0);
            this.reader.readAsDataURL(file);
        }
    }

    private handleAttachClick = (e) => {
        this.attachRef.click();
    }

    private handleFileLoad = () => {
        this.addRateCardAttachment(this.reader.result as string);
    }

    private handleDeleteAttachment = () => {
        StudioRateCardActions.removeRateCardAttachment().then(() => {
            this.closeRemoveAttachmentModal();
        });
    }

    private handleFilterChange = (data) => {
        const studioId = this.props.match.params['studio_id'];
        history.push(`/portal/billing/studio-rate-card/${studioId}/${data.value}`);
        this.setRateCard(data.value);
        this.rateCardSelector!.closeDropdown();
    };

    private handleRateAdd = () => {
        this.modalMode = 'edit';
        this.isModalOpened = true;
    };

    private handleAddNewRate = () => {
        this.modalMode = 'new';
        this.isModalOpened = true;
    };

    private closeModal = () => {
        this.isModalOpened = false;
    };

    private openDeleteModal = () => {
        this.isDeleteModalOpened = true;
    };

    private closeDeleteModal = () => {
        this.isDeleteModalOpened = false;
    };

    private openRemoveAttachmentModal = () => {
        this.isRemoveAttachmentModalOpened = true;
    };

    private closeRemoveAttachmentModal = () => {
        this.isRemoveAttachmentModalOpened = false;
    };

    private addRateCardType = (name: string) => {
        StudioRateCardActions.addRateCardType(name).then(() => {
            this.closeModal();
            this.searchClients();
        });
    };

    private saveRate = (name: string) => {
        StudioRateCardActions.saveRateCardType(name).then(() => {
            this.closeModal();
        });
    };

    private deleteRateCard = () => {
        StudioRateCardActions.deleteRateCardType().then(() => {
            this.closeDeleteModal();
        });
    };

    private addRateCardAttachment = (data: string) => {
        this.isAddingAttachment = true;
        StudioRateCardActions.modifyRateCardAttachment(data).then(() => {
            this.isAddingAttachment = false;
        });
    };

    private rateCardSelectorRef = (ref: DropdownContainer) => this.rateCardSelector = ref;

    private getOptions = () => Object.keys(this.getStudioRateCardData.rateCardTypes.data).map((key) => {
        return {
            value: this.getStudioRateCardData.rateCardTypes.data[key].ratecardId,
            label: this.getStudioRateCardData.rateCardTypes.data[key].ratecardName,
            key: this.getStudioRateCardData.rateCardTypes.data[key].ratecardId,
        };
    });

    @action
    private searchClients = () => {
        StudioRateCardActions.getStudioRateCard();
    }

    @action
    private setRateCard = (value) => {
        StudioRateCardActions.setSelectedRateCardId(value);
        StudioRateCardActions.getStudioRateCard();
    }
}

export default RateCardSelector;