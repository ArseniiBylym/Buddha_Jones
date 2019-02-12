import { toFixed } from 'accounting';
import * as classNames from 'classnames';
import { ButtonInBox } from 'components/Button';
import { Paragraph } from 'components/Content';
import { Counter } from 'components/Form';
import { IconCheckmarkGreen } from 'components/Icons';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

const s = require('./MonetaryTotalsWithOptionalDiscount.css');

interface Props {
    onChange?: (value: number, isFixed: boolean) => void;
    className?: string;
    classNameForDiscount?: string;
    classNameForSubTotal?: string;
    classNameForTotal?: string;
    classNameForDiscountForm?: string;
    discountFormStackedVertically?: boolean;
    hideSubTotal?: boolean;
    subTotalLabel?: string;
    subTotalValue?: number;
    discountLabel?: string;
    discountValue?: number;
    discountIsFixed?: boolean;
    maxFixedDiscountValue?: number;
    totalLabel?: string;
    totalValue: number;
    editing?: boolean;
    applyDiscountLabel?: string;
}

@observer
export class MonetaryTotalsWithOptionalDiscount extends React.Component<Props, {}> {
    static get defaultProps(): Props {
        return {
            className: undefined,
            classNameForDiscount: undefined,
            classNameForSubTotal: undefined,
            classNameForTotal: undefined,
            classNameForDiscountForm: undefined,
            discountFormStackedVertically: false,
            hideSubTotal: false,
            subTotalLabel: 'Sub total',
            subTotalValue: 0,
            discountLabel: 'Discount',
            discountValue: 0,
            discountIsFixed: true,
            maxFixedDiscountValue: 0,
            totalLabel: 'Total',
            totalValue: 0,
            editing: false,
            applyDiscountLabel: 'Apply discount',
        };
    }

    @observable private isInEditMode: boolean = this.props.editing || false;

    @observable private discountValue: number = 0;
    @observable private discountIsFixed: boolean = true;

    @computed
    private get hasDiscount(): boolean {
        return this.props.discountValue ? true : false;
    }

    @computed
    private get totalAfterDiscount(): number {
        const discountValue = this.discountIsFixed
            ? this.discountValue
            : ((this.props.subTotalValue || 0) * this.discountValue) / 100;

        const total = (this.props.subTotalValue || 0) - discountValue;

        return total || 0;
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.props.editing !== nextProps.editing && nextProps.editing) {
            this.startEditMode();
        } else if (this.props.editing !== nextProps.editing && nextProps.editing === false) {
            this.endEditMode();
        }
    }

    public render() {
        return (
            <div className={classNames(s.totals, this.props.className)}>
                {(this.isInEditMode || this.hasDiscount) && !this.props.hideSubTotal && this.renderSubTotal()}

                {this.isInEditMode ? this.renderForm() : this.hasDiscount ? this.renderDiscount() : undefined}

                {this.renderTotal()}
            </div>
        );
    }

    private renderDiscount() {
        return (
            <div className={classNames(s.discount, this.props.classNameForDiscount)}>
                <Paragraph>
                    {this.props.discountLabel + ': '}
                    <strong>
                        {this.props.discountIsFixed
                            ? MoneyHandler.formatAsDollars(this.props.discountValue || 0)
                            : toFixed(this.props.discountValue || 0, 2) + '%'}
                    </strong>
                </Paragraph>
            </div>
        );
    }

    private renderSubTotal() {
        return (
            <div className={classNames(s.subTotal, this.props.classNameForSubTotal)}>
                <Paragraph>
                    {this.props.subTotalLabel + ': '}
                    <strong>{MoneyHandler.formatAsDollars(this.props.subTotalValue || 0)}</strong>
                </Paragraph>
            </div>
        );
    }

    private renderTotal() {
        return (
            <div className={classNames(s.total, this.props.classNameForTotal)}>
                <Paragraph>
                    {this.props.totalLabel + ': '}
                    <strong>
                        {MoneyHandler.formatAsDollars(
                            this.isInEditMode ? this.totalAfterDiscount : this.props.totalValue
                        )}
                    </strong>
                </Paragraph>
            </div>
        );
    }

    private renderForm() {
        return (
            <div
                className={classNames(
                    s.discountForm,
                    {
                        [s.vertical]: this.props.discountFormStackedVertically,
                    },
                    this.props.classNameForDiscountForm
                )}
            >
                <div className={s.discountRow}>
                    <div className={s.discountType}>
                        <Paragraph size="small">{this.props.discountLabel + ': '}</Paragraph>

                        <ButtonInBox
                            className={classNames(s.discountTypeButton, {
                                [s.active]: this.discountIsFixed,
                            })}
                            onClick={this.handleDiscountTypeChange(true)}
                        >
                            {'$'}
                        </ButtonInBox>

                        <ButtonInBox
                            className={classNames(s.discountTypeButton, {
                                [s.active]: this.discountIsFixed === false,
                            })}
                            onClick={this.handleDiscountTypeChange(false)}
                        >
                            {'%'}
                        </ButtonInBox>
                    </div>

                    <Counter
                        onChange={this.handleDiscountValueChange}
                        decimals={2}
                        maxValue={
                            this.discountIsFixed
                                ? this.props.maxFixedDiscountValue
                                    ? this.props.maxFixedDiscountValue
                                    : undefined
                                : 100
                        }
                        minValue={0}
                        fieldMaxWidth={128}
                        incrementBy={this.discountIsFixed ? 100 : 5}
                        multipleOf={0.01}
                        showAddedTextOnInput={true}
                        readOnlyTextBeforeValue={this.discountIsFixed ? '$' : ''}
                        readOnlyTextAfterValue={this.discountIsFixed ? '' : '%'}
                        value={this.discountValue}
                        showPlusMinus={true}
                    />
                </div>

                <div className={s.discountSummary}>
                    <ButtonInBox className={s.applyDiscountButton} onClick={this.handleSaveDiscount}>
                        <strong>{this.props.applyDiscountLabel}</strong>
                        <IconCheckmarkGreen width={25} height={25} />
                    </ButtonInBox>
                </div>
            </div>
        );
    }

    @action
    private handleDiscountTypeChange = (isFixed: boolean) => (e: React.MouseEvent<HTMLButtonElement>) => {
        this.discountIsFixed = isFixed;
    };

    @action
    private handleDiscountValueChange = (count: { value: number; text: string }) => {
        this.discountValue = count.value;
    };

    @action
    private startEditMode = () => {
        this.discountValue = this.props.discountValue || 0;
        this.discountIsFixed = this.props.discountIsFixed || false;
        this.isInEditMode = true;
    };

    @action
    private endEditMode = () => {
        this.isInEditMode = false;
    };

    private handleSaveDiscount = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.editing) {
            if (this.props.onChange) {
                this.props.onChange(this.discountValue, this.discountIsFixed);
            }

            this.endEditMode();
        }
    };
}
