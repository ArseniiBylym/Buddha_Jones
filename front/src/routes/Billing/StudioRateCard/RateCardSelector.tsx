import * as React from 'react';
import * as styles from './styles.scss';
import { AppState } from 'store/AllStores';
import { inject, observer } from 'mobx-react';
import { DropdownContainer, OptionsList } from '../../../components/Form';
import { ButtonAdd, ButtonEdit } from '../../../components/Button';
import { action, computed, observable } from 'mobx';
import { StudioRateCard } from '../../../types/studioRateCard';
import { StudioRateCardActions } from '../../../actions';
import { LoadingSpinner } from '../../../components/Loaders';

interface Props {

}

@inject('store')
@observer
class RateCardSelector extends React.Component<Props & AppState, {}> {
    @observable
    private rateCardSelector?: DropdownContainer;

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
                        />
                    </DropdownContainer>
                }
                {
                    this.getStudioRateCardData.selectedRateCardLabel !== '' && <ButtonEdit
                        onClick={this.handleRateAdd}
                        label=""
                        labelOnLeft={false}
                        float="right"
                        iconBackground="none"
                    />
                }
                {/*<ButtonAdd*/}
                    {/*className={styles.rateCardAddButton}*/}
                    {/*onClick={this.handleRateAdd}*/}
                    {/*label=""*/}
                    {/*labelOnLeft={false}*/}
                    {/*float="right"*/}
                    {/*isWhite={true}*/}
                {/*/>*/}
            </div>
        );
    }

    private handleFilterChange = (data) => {
        this.setRateCard(data.value);
        this.rateCardSelector!.closeDropdown();
    };

    private handleRateAdd = () => {
        // add
    };

    private rateCardSelectorRef = (ref: DropdownContainer) => this.rateCardSelector = ref;

    private getOptions = () => Object.keys(this.getStudioRateCardData.rateCardTypes.data).map((key) => {
        return {
            value: this.getStudioRateCardData.rateCardTypes.data[key].ratecardId,
            label: this.getStudioRateCardData.rateCardTypes.data[key].ratecardName,
        };
    });

    @action
    private setRateCard = (value) => {
        StudioRateCardActions.setStudioRateCard(value);
    }
}

export default RateCardSelector;