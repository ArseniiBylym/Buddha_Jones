import { SpotToBillFormActions } from 'actions';
import { Paragraph } from 'components/Content';
import { DropdownContainer, OptionsList, OptionsListOptionProp } from 'components/Form';
import { Card } from 'components/Section';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTypeFromApi } from 'types/spotBilling';

const s = require('./BillSpotPreviewType.css');

interface Props extends AppOnlyStoreState {
    billTypes: BillTypeFromApi[];
}

@inject('store')
@observer
export class BillSpotPreviewType extends React.Component<Props, {}> {
    private billTypeDropdown: DropdownContainer | null = null;

    @computed private get selectedBillType(): BillTypeFromApi | null {
        let selectedBillType: BillTypeFromApi | null = null;

        if (this.props.store!.spotToBillForm.billTypeId) {
            selectedBillType =
                this.props.billTypes.find(billType => billType.id === this.props.store!.spotToBillForm.billTypeId) ||
                null;
        }

        return selectedBillType;
    }

    @computed
    private get selectedBillTypeId(): number | null {
        return this.selectedBillType ? this.selectedBillType.id : null;
    }

    @computed
    private get options(): OptionsListOptionProp[] {
        return this.props.billTypes.map((billType, index) => ({
            value: billType.id,
            label: '#' + (index + 1) + ': ' + billType.name,
        }));
    }

    public render() {
        return (
            <Card isExpandable={false}>
                <DropdownContainer
                    ref={this.referenceBillTypeDropdown}
                    className={s.dropdown}
                    label="Bill type:"
                    value={this.selectedBillType ? this.selectedBillType.name : 'None'}
                >
                    <OptionsList
                        onChange={this.handleChangeSelectedBillType}
                        value={this.selectedBillTypeId}
                        options={this.options}
                    />
                </DropdownContainer>

                {this.selectedBillType && this.selectedBillType.note && (
                    <Paragraph className={s.note}>{this.selectedBillType.note}</Paragraph>
                )}
            </Card>
        );
    }

    private referenceBillTypeDropdown = (ref: DropdownContainer) => (this.billTypeDropdown = ref);

    private handleChangeSelectedBillType = (option: { value: number; label: string }) => {
        if (typeof option.value === 'number') {
            SpotToBillFormActions.changeBillType(option.value);
        }

        if (this.billTypeDropdown) {
            this.billTypeDropdown.closeDropdown();
        }
    };
}
