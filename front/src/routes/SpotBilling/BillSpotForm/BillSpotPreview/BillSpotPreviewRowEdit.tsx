import { SpotToBillFormActions } from 'actions';
import * as classNames from 'classnames';
import { Paragraph } from 'components/Content';
import {
    Checkbox,
    DropdownContainer,
    Input,
    OptionsList
    } from 'components/Form';
import { ActivityHandler } from 'helpers/ActivityHandler';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { SpotBillFirstRevisionRate, SpotBillFormActivityGroup, SpotBillFormSpot } from 'types/spotBilling';
import { SpotBillActivityRateType } from 'types/spotBillingEnums';
import { StudioRateCardEntryFromApi } from 'types/studioRateCard';

const s = require('./BillSpotPreviewRowEdit.css');

interface Props {
    onRowEditSelectionToggle: (checked: boolean, value: boolean) => void;
    className?: string;
    editing: boolean;
    editIsSelected: boolean;
    id: number;
    index: number;
    activity: SpotBillFormActivityGroup;
    spotsInBill: SpotBillFormSpot[];
    studioFlatRates: StudioRateCardEntryFromApi[];
    studioFirstRates: SpotBillFirstRevisionRate[];
    studioRateCardValues: StudioRateCardEntryFromApi[];
}

@observer
export class BillSpotPreviewRowEdit extends React.Component<Props, {}> {
    private rateDropdown: DropdownContainer | null = null;

    @observable private isInEditMode: boolean = this.props.editing;
    @observable private note: string = '';

    @computed
    private get nameOrNote(): string {
        return this.props.activity.note ? this.props.activity.note : this.props.activity.name;
    }

    @computed
    private get selectedSpotFirstRate(): SpotBillFormSpot | null {
        if (this.props.activity.rateType !== SpotBillActivityRateType.FirstStage) {
            return null;
        }

        return this.props.spotsInBill.find(spot => spot.spotId === this.props.activity.rateFlatOrFirstStageId) || null;
    }

    @computed
    private get selectedFlatRate(): StudioRateCardEntryFromApi | null {
        if (this.props.activity.rateType !== SpotBillActivityRateType.Flat) {
            return null;
        }

        return this.props.studioFlatRates.find(flat => flat.id === this.props.activity.rateFlatOrFirstStageId) || null;
    }

    @computed
    private get activityRateLabel(): string {
        return this.props.activity.rateType === SpotBillActivityRateType.FirstStage
            ? 'First stage rate'
            : this.props.activity.rateType === SpotBillActivityRateType.Flat
            ? 'Flat rate'
            : this.props.activity.rateType === SpotBillActivityRateType.Hourly
            ? 'Hourly'
            : '';
    }

    @computed
    private get rowTotal(): number {
        return ActivityHandler.calculateActivityTotals(
            this.props.activity,
            this.props.spotsInBill,
            this.props.studioFlatRates,
            this.props.studioRateCardValues
        );
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (!this.props.editing && nextProps.editing) {
            this.handleEnteringEditModeOfRow();
        } else if (this.props.editing && !nextProps.editing) {
            this.handleSavingRowChanges();
        }
    }

    public render() {
        return (
            <React.Fragment>
                <div className={classNames(s.row, s.mainRow, this.props.className)}>
                    <div className={s.idCol}>
                        <Paragraph>{'#' + this.props.id}</Paragraph>

                        <Checkbox
                            onChange={this.props.onRowEditSelectionToggle}
                            className={classNames(s.rowCheckbox, { [s.show]: this.isInEditMode })}
                            checked={this.props.editIsSelected}
                            disabled={!this.isInEditMode}
                        />
                    </div>

                    <div>
                        {(this.isInEditMode && (
                            <Input onChange={this.handleNoteChange} value={this.note} label="Name" minWidth={320} />
                        )) || <Paragraph>{this.nameOrNote}</Paragraph>}
                    </div>

                    <div>
                        {(this.isInEditMode && (
                            <DropdownContainer
                                ref={this.referenceRateDropdown}
                                label=""
                                value={
                                    this.props.activity.rateType === SpotBillActivityRateType.FirstStage
                                        ? this.selectedSpotFirstRate
                                            ? 'First stage rate for spot: ' + this.selectedSpotFirstRate.spotName
                                            : 'First stage rate'
                                        : this.props.activity.rateType === SpotBillActivityRateType.Flat
                                        ? this.selectedFlatRate
                                            ? 'Flat rate: ' + this.selectedFlatRate.activityName
                                            : 'Flat rate'
                                        : 'Hourly'
                                }
                            >
                                <OptionsList
                                    onChange={this.handleRateChange}
                                    value={
                                        this.props.activity.rateType === SpotBillActivityRateType.FirstStage
                                            ? 'first-' + (this.props.activity.rateFlatOrFirstStageId || 0)
                                            : this.props.activity.rateType === SpotBillActivityRateType.Flat
                                            ? 'flat-' + (this.props.activity.rateFlatOrFirstStageId || 0)
                                            : SpotBillActivityRateType.Hourly
                                    }
                                    options={[
                                        { key: 'h', value: SpotBillActivityRateType.Hourly, label: 'Hourly' },
                                        ...(this.props.studioFirstRates.length > 0
                                            ? [{ key: 'sep-1', value: null, label: '---' }]
                                            : []),
                                        ...this.props.studioFirstRates.map(firstStage => ({
                                            key: 'first-' + firstStage.spotId,
                                            value: 'first-' + firstStage.spotId,
                                            label: 'First stage rate for spot: ' + firstStage.spotName,
                                        })),
                                        ...(this.props.studioFlatRates.length > 0
                                            ? [{ key: 'sep-2', value: null, label: '---' }]
                                            : []),
                                        ...this.props.studioFlatRates.map(flat => ({
                                            key: 'flat-' + flat.id,
                                            value: 'flat-' + flat.id,
                                            label:
                                                flat.activityName +
                                                (flat.rate ? ': ' + MoneyHandler.formatAsDollars(flat.rate) : ''),
                                        })),
                                    ]}
                                />
                            </DropdownContainer>
                        )) || <Paragraph>{this.activityRateLabel}</Paragraph>}
                    </div>

                    <div>
                        <Paragraph align="right">
                            {this.rowTotal !== null ? MoneyHandler.formatAsDollars(this.rowTotal) : 'No rate'}
                        </Paragraph>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private referenceRateDropdown = (ref: DropdownContainer) => (this.rateDropdown = ref);

    private handleEnteringEditModeOfRow = () => {
        this.note = this.nameOrNote;
        this.isInEditMode = true;
    };

    private handleSavingRowChanges = () => {
        SpotToBillFormActions.changeBillRowNote(this.props.index, this.note);

        this.note = '';
        this.isInEditMode = false;
    };

    private handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.note = e.target.value;
    };

    private handleRateChange = (option: { value: string; label: string }) => {
        if (option.value === null) {
            return;
        }

        if (this.rateDropdown) {
            this.rateDropdown.closeDropdown();
        }

        const firstString = 'first-';
        const isFirstRate = option.value.includes(firstString);
        if (isFirstRate) {
            const firstRateId = parseInt(option.value.slice(firstString.length, option.value.length), 10);

            const firstRateSpot = this.props.studioFirstRates.find(spot => spot.spotId === firstRateId);

            SpotToBillFormActions.changeBillRowRateType(
                this.props.index,
                SpotBillActivityRateType.FirstStage,
                firstRateSpot ? firstRateSpot.spotId : null
            );
            return;
        }

        const flatString = 'flat-';
        const isFlat = option.value.includes(flatString);
        if (isFlat) {
            const flatRateId = parseInt(option.value.slice(flatString.length, option.value.length), 10);

            SpotToBillFormActions.changeBillRowRateType(
                this.props.index,
                SpotBillActivityRateType.Flat,
                !isNaN(flatRateId) ? flatRateId : null
            );
            return;
        }

        SpotToBillFormActions.changeBillRowRateType(this.props.index, SpotBillActivityRateType.Hourly, null);
    };
}
