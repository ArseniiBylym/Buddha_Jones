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

interface State {
    validationErrors: {};
    touched: boolean;
    editMode: boolean;
    trtValue: string;
    trtId: string;
    revisionsValue: string;
    noteValue: string;
    price: string | null;
    saving: boolean;
    activityValue: string;
    activityId: string;
}

@inject('store')
@observer
class BillingStudioRateCardRow extends React.Component<Props & AppState, {}> {
    public state: State = {
        validationErrors: {},
        touched: false,
        editMode: false,
        trtValue: '',
        trtId: '',
        revisionsValue: '',
        noteValue: '',
        price: '',
        saving: false,
        activityValue: '',
        activityId: '',
    };

    private trtSelector: DropdownContainer;
    private activitySelector: DropdownContainer;

    public componentDidMount() {
        this.validate();
    }

    static get defaultProps(): Partial<Props> {
        return {
            isNew: false
        };
    }

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
                            <div>
                                <DropdownContainer
                                    label="Activity: "
                                    value={this.state.activityValue}
                                    className={styles.trtSelector}
                                    ref={this.activityRefSelector}
                                >
                                    <OptionsList
                                        onChange={this.handleActivityChange}
                                        value={this.state.activityValue}
                                        options={this.getActivitiesOptions()}
                                        className={styles.optionClassName}
                                    />
                                </DropdownContainer>
                                {
                                    this.state.touched &&
                                    this.state.validationErrors['activity'] &&
                                    <p className={styles.addRateInputError}>{this.state.validationErrors['activity']}</p>
                                }
                            </div> :
                            <b>{card.activityName}</b>
                    }
                </TableCell>
                <TableCell align="right">
                    {
                        this.props.isNew || (this.state.editMode && card.activityTypeId !== 1) ?
                            <DropdownContainer
                                label="TRT: "
                                value={this.state.trtValue}
                                className={styles.trtSelector}
                                ref={this.trtSelectorRef}
                            >
                                <OptionsList
                                    onChange={this.handleTrtChange}
                                    value={this.state.trtValue}
                                    options={this.getOptions()}
                                    className={styles.optionClassName}
                                />
                            </DropdownContainer> :
                            card.runtime
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        this.props.isNew ||  (this.state.editMode && card.activityTypeId !== 1) ?
                            <Input
                                // fieldClassName={/*(this.state.touched && this.state.validationError) ? styles.inputError : ''*/}
                                label="Revision"
                                color="brown"
                                value={this.state.revisionsValue}
                                onChange={this.handleRevisionChange}
                                minWidth={10}
                            />
                            :
                            card.revisionInc
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        this.state.editMode || this.props.isNew ?
                            <Input
                                // fieldClassName={/*(this.state.touched && this.state.validationError) ? styles.inputError : ''*/}
                                label="Note"
                                color="brown"
                                value={this.state.noteValue}
                                onChange={this.handleNoteChange}
                                minWidth={200}
                            />
                            :
                            card.note
                    }
                </TableCell>
                <TableCell align="right">
                    {
                        this.state.editMode || this.props.isNew ?
                            <Input
                                // fieldClassName={/*(this.state.touched && this.state.validationError) ? styles.inputError : ''*/}
                                label="Rate"
                                color="brown"
                                value={this.state.price}
                                onChange={this.handlePriceChange}
                                minWidth={100}
                            />
                            :
                            card.rate !== null ? `$${card.rate}` : ''
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        this.state.editMode || this.props.isNew ?
                            <div className={styles.rowActionButtons}>
                                <ButtonSave
                                    label="Save"
                                    labelColor="green"
                                    isSaving={this.state.saving}
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
                <TableCell align="center">
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
                </TableCell>
                <TableCell align="right" className={styles.trtSelector}>
                    {card.activityType}
                </TableCell>
            </TableRow>
        );
    }

    private validate = () => {
        if (this.props.isNew && this.state.activityValue === '') {
            this.setState({
                validationErrors: {
                    ...this.state.validationErrors,
                    activity: 'Please Select Activity',
                }
            });
            return;
        }

        this.setState({validationErrors: {}});
    };

    private isValid = () => Object.keys(this.state.validationErrors).length === 0;

    private handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.match(/^([0-9]+([.][0-9]*)?|[.][0-9]+)?$/)) {
            this.setState({
                price: e.target.value,
            });
            this.validate();
        }
    };

    private handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            noteValue: e.target.value
        });
    };

    private handleRevisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.match(/^\d*$/)) {
            this.setState({
                revisionsValue: e.target.value
            });
        }
    };

    private handleTrtChange = (data) => {
        this.setState({
            trtValue: data.label,
            trtId: data.value,
        });
        this.trtSelector.closeDropdown();
        this.validate();
    };

    private handleActivityChange = (data) => {
        this.setState({
            activityValue: data.label,
            activityId: data.value,
        });
        this.activitySelector.closeDropdown();
        this.validate();
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
        this.setState({
            trtValue: card.runtime ? card.runtime : '',
            trtId: card.trtId ? card.trtId : '',
            revisionsValue: card.revisionInc ? card.revisionInc : '',
            noteValue: card.note ? card.note : '',
            price: card.rate ? `${card.rate}` : '',
            editMode: true,
        });
    };

    private exitEditMode = () => {
        this.setState({
            editMode: false,
        });
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
        this.setState({touched: true}, () => {
           if (this.isValid()) {
               this.saveActivity();
           }
        });
    }

    private saveActivity = () => {
        this.setState({
            saving: true
        });
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
                Number(this.state.activityId),
                Number(this.state.price),
                Number(this.state.trtId),
                Number(this.state.revisionsValue),
                this.state.noteValue
            ).then(() => {
                this.setState({
                    saving: false,
                    editMode: false,
                });
                if (onSaveDone) {
                    onSaveDone();
                }
            });
        } else {
            StudioRateCardActions.saveStudioRateCard(
                id,
                ratecardId,
                activityId,
                Number(this.state.price),
                Number(this.state.trtId),
                Number(this.state.revisionsValue),
                this.state.noteValue
            ).then(() => {
                this.setState({
                    saving: false,
                    editMode: false,
                });
            });
        }
    }
}

export default BillingStudioRateCardRow;