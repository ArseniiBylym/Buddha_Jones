import * as React from 'react';
import { SpotSentActions } from 'actions';
import { ButtonSend } from 'components/Button';
import { history } from 'App';
import { Section } from 'components/Section';
import { Checkmark } from 'components/Form';
import { ClientContact } from 'types/clients';
import { AppState } from '../../../../store/AllStores';
import { match } from 'react-router';
import * as dateFormat from 'date-fns/format';
import { observer, inject } from 'mobx-react';
import { SpotSentValueForSubmit, SpotSentVersionForSubmit } from '../../../../types/spotSentForm';

// Styles
const s = require('./ProducerSpotSentForm.css');

// Props
interface ProducerSpotSentFormProps {
}

// Props
interface ProducerSpotSentFormState {
}

// Types
type ProducerSpotSentFormPropsTypes = ProducerSpotSentFormProps & AppState;

@inject('store')
@observer
class FormSendSection extends React.PureComponent<ProducerSpotSentFormPropsTypes, ProducerSpotSentFormState> {

    public render() {
        if (!this.props.store) {
            return null;
        }
        const { spotSentDetails } = this.props.store.spotSent;
        return (
            <Section>
                <div className={s.summary}>
                    <Checkmark
                        // onClick={SpotSentActions.handleFinalToggle}
                        onClick={this.checkmarkClickHander}
                        checked={spotSentDetails.status === 2}
                        label="Ready to be sent"
                        labelOnLeft={true}
                        type={'no-icon'}
                    />

                    <ButtonSend
                        onClick={this.handleSubmit}
                        label={this.saveButtonText}
                        iconColor="orange"
                    />
                </div>
            </Section>
        );
    }

    private checkmarkClickHander = () => {
        if (this.props.store && this.props.store.spotSent) {
            const value = this.props.store.spotSent.spotSentDetails.status === 2 ? false : true;
            SpotSentActions.handleFinalToggle(value);
        }
    }

    private handleSubmit = async () => {
        try {
            let data: SpotSentValueForSubmit = this.props.store!.spotSent.spotSentDetails;
            (data.spot_version as string) = JSON.stringify((data.spot_version as SpotSentVersionForSubmit[]).map((spot: SpotSentVersionForSubmit) => {
                delete spot.campaign_name;
                delete spot.spot_name;
                delete spot.version_name;
                return spot;
            }));
            (data.finish_option as string) = JSON.stringify(data.finish_option);
            (data.delivery_to_client as string) = JSON.stringify(data.delivery_to_client);
            (data.customer_contact as string) = JSON.stringify((data.customer_contact as ClientContact[]).map(contact => {
                return contact.id;
            }));
            delete data.finishing_house_name;
            data.deadline = (data.deadline) ? dateFormat(data.deadline, 'YYYY-MM-DD') : null;
            if (this.isEditMode) {
                await SpotSentActions.updateSpotSent((this.props.match as match<string>).params['id'], data);
            } else {
                await SpotSentActions.createNewSpotSent(data);
            }
            history.push('/portal/studio/producer-spot-sent-list');
        } catch (error) {
            throw error;
        }
    };

    private get isEditMode(): boolean {
        return (this.props.match && this.props.match.params['id'] && this.props.match.params['id'] !== 'create');
    }

    private get saveButtonText(): string {
        if (this.props.store && this.props.store.spotSent.spotSentDetails.status === 2) {
            return 'Upload and send';
        } else {
            return 'Save draft';
        }
    }
}

export default FormSendSection;
