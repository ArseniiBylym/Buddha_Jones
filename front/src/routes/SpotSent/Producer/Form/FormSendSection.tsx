import * as React from 'react';
import { SpotSentActions } from 'actions';
import { ButtonSend } from 'components/Button';
import { history } from 'App';
import { Section } from 'components/Section';
import { Checkmark } from 'components/Form';
import { ClientContact } from 'types/clients';
// import { AppState } from '../../../../store/AllStores';
import { match } from 'react-router';
import * as dateFormat from 'date-fns/format';
import { observer, inject } from 'mobx-react';
import { SpotSentValueForSubmit, SpotSentVersionForSubmit } from '../../../../types/spotSentForm';

// Styles
const s = require('./ProducerSpotSentForm.css');

// Props
// interface ProducerSpotSentFormProps {
// }

// Props
interface ProducerSpotSentFormState {
    isGraphicsCompleted: boolean;
}

// Types
// type ProducerSpotSentFormPropsTypes = ProducerSpotSentFormProps & AppState;

@inject('store')
@observer
class FormSendSection extends React.PureComponent<any, ProducerSpotSentFormState> {

    state = {
        isGraphicsCompleted: false,
    };

    public render() {
        if (!this.props.store) {
            return null;
        }
        // const { spotSentDetails } = this.props.store.spotSent;
        return (
            <Section>
                <div className={s.summary}>
                        {this.getSpotLineStatusId() !== 2 && <Checkmark
                            onClick={this.completedToggleHandler}
                            checked={this.state.isGraphicsCompleted}
                            label={this.props.prevLocation && this.props.prevLocation === 'graphics' ? 'Completed' : 'Ready to be sent'}
                            labelOnLeft={true}
                            type={'no-icon'}
                        />}
                    {/* {this.props.prevLocation && this.props.prevLocation === 'graphics' ? (
                        <Checkmark
                            onClick={this.completedToggleHandler}
                            checked={this.state.isGraphicsCompleted}
                            label="Completed"
                            labelOnLeft={true}
                            type={'no-icon'}
                        />
                        ) 
                        : (
                        <Checkmark
                            onClick={this.completedToggleHandler}
                            checked={this.state.isGraphicsCompleted}
                            label="Ready to be sent"
                            labelOnLeft={true}
                            type={'no-icon'}
                        />
                        )

                    } */}
                    
                    <ButtonSend
                        onClick={this.handleSubmit}
                        label={this.saveButtonText}
                        iconColor="orange"
                    />
                </div>
            </Section>
        );
    }

    private completedToggleHandler = () => {
        this.setState(prevState => ({isGraphicsCompleted: !prevState.isGraphicsCompleted}));
    }

    private getSpotLineStatusId = (): any => {
        if (this.props.store && 
            this.props.store.spotSent && 
            this.props.store.spotSent.spotSentDetails && 
            this.props.store.spotSent.spotSentDetails.spot_version) {
                let lineStatus = 0;
                if (this.props.store.spotSent.spotSentDetails.spot_version[0]) {
                    lineStatus = this.props.store.spotSent.spotSentDetails.spot_version[0].line_status_id;
                }
                // this.props.store.spotSent.spotSentDetails.spot_version.forEach(item => {
                //     lineStatus = item.line_status_id;
                // });
                return lineStatus;
        }
    }

    // private checkmarkClickHander = () => {
    //     if (this.props.store && this.props.store.spotSent) {
    //         const value = this.props.store.spotSent.spotSentDetails.status === 2 ? false : true;
    //         SpotSentActions.handleFinalToggle(value);
    //     }
    // }

    private handleSubmit = async () => {
        try {
            let data: SpotSentValueForSubmit = this.props.store!.spotSent.spotSentDetails;
            (data.spot_version as string) = JSON.stringify((data.spot_version as SpotSentVersionForSubmit[]).map((spot: SpotSentVersionForSubmit) => {
                delete spot.campaign_name;
                delete spot.spot_name;
                delete spot.version_name;
                spot.graphics_file = this.props.files;
                if (this.getSpotLineStatusId() === 2) {
                    if (spot.finish_accept || spot.prod_accept) {
                        spot.line_status_id = 3;
                    } else {
                        spot.line_status_id = 2;
                    }
                } else if (this.props.prevLocation && this.props.prevLocation === 'graphics') {
                    if (this.state.isGraphicsCompleted) {
                        spot.line_status_id = 4;
                    } else {
                        spot.line_status_id = 1;
                    }
                } else {
                    if (this.state.isGraphicsCompleted) {
                        spot.line_status_id = 2;
                    } else {
                        spot.line_status_id = 1;
                    }
                }
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
        if (this.getSpotLineStatusId() === 2) {
            return 'Save';
        } else if (this.state.isGraphicsCompleted) {
            return 'Save';
        } else {
            return 'Save draft';
        }
    }
}

export default FormSendSection;
