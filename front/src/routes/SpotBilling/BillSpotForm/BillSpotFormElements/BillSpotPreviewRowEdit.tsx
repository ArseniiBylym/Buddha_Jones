import { SpotToBillFormActions } from 'actions';
import * as classNames from 'classnames';
import { ButtonEdit, ButtonSave } from 'components/Button';
import { Paragraph } from 'components/Content';
import { DropdownContainer, Input, OptionsList } from 'components/Form';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { SpotBillFormActivityGroup } from 'types/spotBilling';
import { SpotBillActivityRateType } from 'types/spotBillingEnums';
import { StudioRateCardEntryFromApi } from 'types/studioRateCard';

const s = require('./BillSpotPreviewRowEdit.css');

interface Props {
    className?: string;
    id: number;
    index: number;
    name: string;
    note: string | null;
    spots: string | null;
    revisions: string | null;
    amount: number;
    editable: boolean;
    flatRates: StudioRateCardEntryFromApi[];
    hourlyActivity: SpotBillFormActivityGroup | null;
    rateType: SpotBillActivityRateType;
    rateFlatId: number | null;
    studioFlatRates: StudioRateCardEntryFromApi[];
    selectedRateCard: StudioRateCardEntryFromApi[];
}

@observer
export class BillSpotPreviewRowEdit extends React.Component<Props, {}> {
    private rateDropdown: DropdownContainer | null = null;

    @observable private isInEditMode: boolean = false;
    @observable private note: string = '';

    @computed
    private get nameOrNote(): string {
        return this.props.note ? this.props.note : this.props.name;
    }

    @computed
    private get selectedFlatRate(): StudioRateCardEntryFromApi | null {
        if (this.props.rateType !== SpotBillActivityRateType.Flat) {
            return null;
        }

        return this.props.studioFlatRates.find(flat => flat.id === this.props.rateFlatId) || null;
    }

    @computed
    private get rowTotal(): number | null {
        if (this.props.rateType === SpotBillActivityRateType.FirstStage) {
            return this.props.amount;
        }

        if (this.props.rateType === SpotBillActivityRateType.Flat) {
            if (this.selectedFlatRate) {
                return this.selectedFlatRate.rate || 0;
            }

            return null;
        }

        if (this.props.rateType === SpotBillActivityRateType.Hourly) {
            return this.props.hourlyActivity
                ? SpotToBillFormActions.calculateHourlyActivityTotals(
                      this.props.hourlyActivity,
                      this.props.selectedRateCard
                  )
                : 0;
        }

        return null;
    }

    public render() {
        return (
            <div className={classNames(s.row, this.props.className)}>
                <div>
                    <Paragraph>{'#' + this.props.id}</Paragraph>
                </div>

                <div>
                    {(this.isInEditMode && (
                        <Input onChange={this.handleNoteChange} value={this.note} label="Name" />
                    )) || <Paragraph>{this.nameOrNote}</Paragraph>}
                </div>

                <div>
                    <Paragraph type={this.props.spots ? 'default' : 'dim'}>
                        {this.props.spots ? this.props.spots : 'None'}
                    </Paragraph>
                </div>

                <div>
                    {(this.props.revisions && <Paragraph>{'Ver. ' + this.props.revisions}</Paragraph>) || (
                        <Paragraph type="dim">None</Paragraph>
                    )}
                </div>

                {(this.props.rateType === SpotBillActivityRateType.FirstStage && (
                    <div>
                        <Paragraph>First stage rate</Paragraph>
                    </div>
                )) || (
                    <div>
                        {(this.isInEditMode && (
                            <DropdownContainer
                                ref={this.referenceRateDropdown}
                                label={
                                    this.props.rateType === SpotBillActivityRateType.Flat && this.selectedFlatRate
                                        ? 'Flat rate: '
                                        : ''
                                }
                                value={
                                    this.props.rateType === SpotBillActivityRateType.Hourly
                                        ? 'Hourly'
                                        : this.props.rateType === SpotBillActivityRateType.Flat
                                        ? this.selectedFlatRate
                                            ? this.selectedFlatRate.activityName
                                            : 'Flat rate'
                                        : ''
                                }
                            >
                                <OptionsList
                                    onChange={this.handleRateChange}
                                    options={[
                                        { key: 'h', value: SpotBillActivityRateType.Hourly, label: 'Hourly' },
                                        ...this.props.studioFlatRates.map(flat => ({
                                            key: 'flat-' + flat.id,
                                            value: 'flat-' + flat.id,
                                            label:
                                                flat.activityName +
                                                (flat.rate ? ': ' + MoneyHandler.formatAsDollars(flat.rate) : ''),
                                        })),
                                        ...(this.props.studioFlatRates.length <= 0
                                            ? [
                                                  {
                                                      key: 'h2',
                                                      value: SpotBillActivityRateType.Hourly,
                                                      label: 'No flat rates exist in this rate card',
                                                  },
                                              ]
                                            : []),
                                    ]}
                                />
                            </DropdownContainer>
                        )) || (
                            <Paragraph>
                                {this.props.rateType === SpotBillActivityRateType.Flat
                                    ? 'Flat rate' +
                                      (this.selectedFlatRate ? ': ' + this.selectedFlatRate.activityName : '')
                                    : this.props.rateType === SpotBillActivityRateType.Hourly
                                    ? 'Hourly'
                                    : ''}
                            </Paragraph>
                        )}
                    </div>
                )}

                <div className={s.rateAndEditCol}>
                    {(this.isInEditMode === false && (
                        <ButtonEdit onClick={this.handleEnteringEditModeOfRow} label="Edit" labelOnLeft={true} />
                    )) || <ButtonSave onClick={this.handleSavingRowChanges} label="Save" isSaving={false} />}
                </div>

                <div>
                    <Paragraph align="right">
                        {this.rowTotal !== null ? MoneyHandler.formatAsDollars(this.rowTotal) : 'No rate'}
                    </Paragraph>
                </div>
            </div>
        );
    }

    private referenceRateDropdown = (ref: DropdownContainer) => (this.rateDropdown = ref);

    private handleEnteringEditModeOfRow = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.note = this.nameOrNote;
        this.isInEditMode = true;
    };

    private handleSavingRowChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
        SpotToBillFormActions.changeActivityNote(this.props.index, this.note);

        this.note = '';
        this.isInEditMode = false;
    };

    private handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.note = e.target.value;
    };

    private handleRateChange = (option: { value: string; label: string }) => {
        if (this.rateDropdown) {
            this.rateDropdown.closeDropdown();
        }

        const flatString = 'flat-';
        const isFlat = option.value.includes(flatString);
        if (isFlat) {
            const flatRateId = parseInt(option.value.slice(flatString.length, option.value.length), 10);

            SpotToBillFormActions.changeActivitiesRateType(
                this.props.index,
                SpotBillActivityRateType.Flat,
                !isNaN(flatRateId) ? flatRateId : null
            );
            return;
        }

        SpotToBillFormActions.changeActivitiesRateType(this.props.index, SpotBillActivityRateType.Hourly, null);
    };
}
