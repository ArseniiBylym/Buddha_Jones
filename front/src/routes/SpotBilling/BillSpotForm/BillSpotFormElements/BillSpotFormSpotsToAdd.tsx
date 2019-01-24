import { SpotToBillFormActions } from 'actions';
import { Paragraph } from 'components/Content';
import { DropdownContainer, OptionsList } from 'components/Form';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillFormSpot } from 'types/spotBilling';

interface BillSpotFormSpotsToAddProps extends AppOnlyStoreState {
    projectCampaignId: number;
    remainingSpotsToBill: SpotBillFormSpot[];
}

@inject('store')
@observer
export class BillSpotFormSpotsToAdd extends React.Component<BillSpotFormSpotsToAddProps, {}> {
    private dropdown: DropdownContainer | null = null;

    public render() {
        if (this.props.remainingSpotsToBill.length <= 0) {
            return (
                <Paragraph type="dim" align="right">
                    No unpaid spots are available to add to this bill.
                </Paragraph>
            );
        }

        return (
            <DropdownContainer ref={this.referenceDropdown} label="Pick spot">
                <OptionsList
                    onChange={this.handleAddSpot}
                    options={this.props.remainingSpotsToBill.map(spot => ({
                        value: spot.spotId,
                        label: spot.spotName,
                    }))}
                />
            </DropdownContainer>
        );
    }

    private referenceDropdown = (ref: DropdownContainer) => (this.dropdown = ref);

    @action
    private handleAddSpot = (option: { value: number; label: string }) => {
        SpotToBillFormActions.addSpotToBill(option.value);

        if (this.dropdown) {
            this.dropdown.closeDropdown();
        }
    };
}
