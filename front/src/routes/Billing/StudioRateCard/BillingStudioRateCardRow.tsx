import * as React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import * as styles from './styles.scss';
import { AppState } from 'store/AllStores';
import { ButtonClose, ButtonDelete, ButtonEdit, ButtonSave } from 'components/Button';
import { TableCell, TableRow } from 'components/Table';
import { RateCard } from '../../../types/studioRateCard';
import { TRTItem } from '../../../types/projectsCampaignsSpots';
import { DropdownContainer, Input, OptionsList } from '../../../components/Form';
import { StudioRateCardActions }  from '../../../actions';
import { Activity } from '../../../types/activities';

interface Props {
    card: RateCard;
    isNew?: boolean;
    onSaveDone?: () => void;
    openDeleteModal?: (id: number) => void;
}

@inject('store')
@observer
class BillingStudioRateCardRow extends React.Component<Props & AppState, {}> {
    @observable private editMode: boolean = false;
    @observable private trtValue: string = '';
    @observable private trtId: string = '';
    @observable private revisionsValue: string = '';
    @observable private noteValue: string = '';
    @observable private price: string | null = null;
    @observable private saving: boolean = false;
    @observable private activityValue: string = '';
    @observable private activityId: string = '';

    static get defaultProps(): Partial<Props> {
        return {
            isNew: false
        };
    }

    private trtSelector: DropdownContainer;
    private activitySelector: DropdownContainer;

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { card } = this.props;
        return (
            <TableRow
                className={styles.clickable}
            >
                <TableCell align="left">
                    {
                        this.props.isNew ?
                            <DropdownContainer
                                label="Activity: "
                                value={this.activityValue}
                                className={styles.trtSelector}
                                ref={this.activityRefSelector}
                            >
                                <OptionsList
                                    onChange={this.handleActivityChange}
                                    value={this.activityValue}
                                    options={this.getActivitiesOptions()}
                                    className={styles.optionClassName}
                                />
                            </DropdownContainer> :
                            <b>{card.activityName}</b>
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        this.props.isNew || (this.editMode && card.activityTypeId !== 1) ?
                            <DropdownContainer
                                label="TRT: "
                                value={this.trtValue}
                                className={styles.trtSelector}
                                ref={this.trtSelectorRef}
                            >
                                <OptionsList
                                    onChange={this.handleTrtChange}
                                    value={this.trtValue}
                                    options={this.getOptions()}
                                    className={styles.optionClassName}
                                />
                            </DropdownContainer> :
                            card.runtime
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        this.props.isNew ||  (this.editMode && card.activityTypeId !== 1) ?
                            <Input
                                // fieldClassName={/*(this.state.touched && this.state.validationError) ? styles.inputError : ''*/}
                                label="Revision"
                                color="brown"
                                value={this.revisionsValue}
                                onChange={this.handleRevisionChange}
                                minWidth={10}
                            />
                            :
                            card.revisionInc
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        this.editMode || this.props.isNew ?
                            <Input
                                // fieldClassName={/*(this.state.touched && this.state.validationError) ? styles.inputError : ''*/}
                                label="Note"
                                color="brown"
                                value={this.noteValue}
                                onChange={this.handleNoteChange}
                                minWidth={200}
                            />
                            :
                            card.note
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        this.editMode || this.props.isNew ?
                            <Input
                                // fieldClassName={/*(this.state.touched && this.state.validationError) ? styles.inputError : ''*/}
                                label="price"
                                color="brown"
                                value={this.price}
                                onChange={this.handlePriceChange}
                                minWidth={100}
                            />
                            :
                            card.rate
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        this.editMode || this.props.isNew ?
                            <div className={styles.rowActionButtons}>
                                <ButtonSave
                                    label="Save"
                                    labelColor="green"
                                    isSaving={this.saving}
                                    savingLabel="Saving"
                                    onClick={this.handleSave}
                                />
                                <ButtonClose
                                    className={styles.rowCancelButton}
                                    label="Close"
                                    onClick={this.exitEditMode}
                                />
                            </div>
                            :
                            <div>
                                {
                                    card.activityTypeId === 4 &&
                                    <ButtonDelete
                                        onClick={this.openDeleteModal}
                                        label=""
                                        labelOnLeft={false}
                                        float="right"
                                        iconBackground="white"
                                    />
                                }
                                <ButtonEdit
                                    className={styles.rowEditButton}
                                    onClick={this.enterEditMode}
                                    label=""
                                    labelOnLeft={false}
                                    float="none"
                                />
                            </div>
                    }
                </TableCell>
                <TableCell align="right" className={styles.trtSelector}>
                    {card.activityType}
                </TableCell>
            </TableRow>
        );
    }

    private handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.price = e.target.value;
        // this.validate();
    };

    private handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.noteValue = e.target.value;
        // this.validate();
    };

    private handleRevisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.revisionsValue = e.target.value;
        // this.validate();
    };

    private handleTrtChange = (data) => {
        this.trtValue = data.label;
        this.trtId = data.value;
        this.trtSelector.closeDropdown();
    };

    private handleActivityChange = (data) => {
        this.activityValue = data.label;
        this.activityId = data.value;
        this.activitySelector.closeDropdown();
    };

    private getOptions = () => this.trtList.map((trt: TRTItem) => ({
        value: trt.id,
        label: trt.runtime,
        key: trt.runtime,
    }));

    private getActivitiesOptions = () => this.activityList.map((activity: Activity) => ({
        value: activity.id,
        label: activity.name,
        key: activity.name,
    }));

    private trtSelectorRef = (ref: DropdownContainer) => this.trtSelector = ref;
    private activityRefSelector = (ref: DropdownContainer) => this.activitySelector = ref;

    private get trtList (): TRTItem[] {
        if (this.props.store) {
            return this.props.store.projectsCampaignsSpots.trtList;
        }
        return [];
    }

    private get activityList (): Activity[] {
        if (this.props.store) {
            return this.props.store.activities.activities.filter((activity) => activity.typeId === 4);
        }
        return [];
    }

    private enterEditMode = () => {
        const { card } = this.props;

        this.trtValue = card.runtime ? card.runtime : '';
        this.trtId = card.trtId ? card.trtId : '';
        this.revisionsValue = card.revisionInc ? card.revisionInc : '';
        this.noteValue = card.note ? card.note : '';
        this.editMode = true;
    };

    private exitEditMode = () => {
        this.editMode = false;
        if (this.props.isNew && this.props.onSaveDone) {
            this.props.onSaveDone();
        }
    };

    private openDeleteModal = () => {
        if (this.props.openDeleteModal) {
            this.props.openDeleteModal(this.props.card.id);
        }
    }

    private handleSave = () => {
        this.saving = true;
        const {
            isNew,
            onSaveDone,
            card: {
                id,
                ratecardId,
                activityId,
            }
        } = this.props;
        if (isNew) {
            StudioRateCardActions.addStudioRateCard(
                ratecardId,
                Number(this.activityId),
                Number(this.price),
                Number(this.trtId),
                Number(this.revisionsValue),
                this.noteValue
            ).then(() => {
                this.saving = false;
                this.editMode = false;
                if (onSaveDone) {
                    onSaveDone();
                }
            });
        } else {
            StudioRateCardActions.saveStudioRateCard(
                id,
                ratecardId,
                activityId,
                Number(this.price),
                Number(this.trtId),
                Number(this.revisionsValue),
                this.noteValue
            ).then(() => {
                this.saving = false;
                this.editMode = false;
            });
        }
    }
}

export default BillingStudioRateCardRow;