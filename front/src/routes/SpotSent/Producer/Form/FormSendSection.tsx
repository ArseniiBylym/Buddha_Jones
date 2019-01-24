import * as React from 'react';
import { SpotSentActions } from 'actions';
import { ButtonSend } from 'components/Button';
import { history } from 'App';
import { Section } from 'components/Section';
import { CheckmarkSquare, Input } from 'components/Form';
import { ClientContact } from 'types/clients';
// import { AppState } from '../../../../store/AllStores';
import { match } from 'react-router';
import * as dateFormat from 'date-fns/format';
import { observer, inject } from 'mobx-react';
import { SpotSentValueForSubmit, SpotSentVersionForSubmit } from '../../../../types/spotSentForm';
import { Modal } from 'components/Modals';

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

        return (
            <Section>
                <div className={s.summary}>
                    {this.getCheckmark()}
                    <div className={s.buttonSendContainer}>
                        <ButtonSend
                            onClick={this.handleSubmit}
                            label={this.saveButtonText}
                            iconColor="orange"
                        />
                    </div>
                </div>
                {this.getLinkField()} 
                <Modal
                    show={this.props.store!.spotSent.viaMethodsModalToggle}
                    title={this.props.store!.spotSent.viaMethodsModalToggleMessage}
                    closeButton={false}
                    type="alert"
                    actions={[
                        {
                            onClick: () => { SpotSentActions.toggleModalViaMethods(); },
                            closeOnClick: false,
                            label: 'Ok',
                            type: 'default',
                        },
                    ]}
                />
                <Modal  />
            </Section>
        );
    }

    private getLinkField = () => {
        if (this.getSpotLineStatusId() === 3 && this.state.isGraphicsCompleted) {
            return (
                <div className={s.link}>
                    <div>Link:</div>
                    <Input label="Paste link here .." onChange={this.inputLinkHandler}/>
                </div> 
            );
        }
        return null;
    }

    private inputLinkHandler = (e) => {
        SpotSentActions.inputLinkHandler(e.target.value);
    }

    private getCheckboxLabel = () => {
        if (typeof(this.props.store.spotSent.spotSentDetails.spot_version) === 'string') {
            return false;
        }
        const isReadyForQc = this.props.store.spotSent.spotSentDetails.spot_version.every((item, i) => {
            return item.line_status_id === 3 && item.prod_accept === 1;
        });
        return isReadyForQc;
    }

    private getCheckmark = () => {
        if (this.getSpotLineStatusId() === 2) {
            return null;
        } else if (this.getCheckboxLabel()) {
                return (
                    <CheckmarkSquare
                        onClick={this.completedToggleHandler}
                        checked={this.state.isGraphicsCompleted}
                        label="Ready for QC"
                        labelOnLeft={true}
                        type={'no-icon'}
                    />
                );
            
        } else if (this.getSpotLineStatusId() === 5) {
            return (
                <CheckmarkSquare
                    onClick={this.completedToggleHandler}
                    checked={this.state.isGraphicsCompleted}
                    label="Ready for Bill"
                    labelOnLeft={true}
                    type={'no-icon'}
                />
            );
        } else {
            return (
                <CheckmarkSquare
                    onClick={this.completedToggleHandler}
                    checked={this.state.isGraphicsCompleted}
                    label={this.props.prevLocation && this.props.prevLocation === 'graphics' ? 'Completed' : 'Ready to be sent'}
                    labelOnLeft={true}
                    type={'no-icon'}
                />
            );
        }
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
                return lineStatus;
        }
    }

    private handleSubmit = async () => {
        const viaOtionsNotChecked = this.props.store!.spotSent.spotSentDetails.spot_version.find((item, i) => {
            if (item.line_status_id === 1 && item.finish_request === 0 && item.sent_via_method.length === 0) {
                return true;
            }
            return false;
        });
        if (viaOtionsNotChecked) {
            SpotSentActions.toggleModalViaMethods('Please select Sent Via option(s) unless the Spot is Finishing');
            return;
        }

        const editorsNotSelected = this.props.store!.spotSent.spotSentDetails.spot_version.find((item, i) => {
            if (item.line_status_id === 1 && this.state.isGraphicsCompleted === true && item.editors.length === 0) {
                return true;
            }
            return false;
        });
        if (editorsNotSelected) {
            SpotSentActions.toggleModalViaMethods('Please select at least one editor for each spot');
            return;
        }

        try {
            let data: SpotSentValueForSubmit = this.props.store!.spotSent.spotSentDetails;
            (data.spot_version as string) = JSON.stringify((data.spot_version as SpotSentVersionForSubmit[]).map((spot: SpotSentVersionForSubmit) => {
                delete spot.campaign_name;
                // delete spot.spot_name;
                delete spot.version_name;
                spot.graphics_file = this.props.files;
                if (this.getSpotLineStatusId() === 2) {
                    if (spot.finish_accept || spot.prod_accept) {
                        spot.line_status_id = 3;
                    } else {
                        spot.line_status_id = 2;
                    }
                } else if (this.getSpotLineStatusId() === 3) {
                    if (this.state.isGraphicsCompleted) {
                        spot.line_status_id = 4;
                    } else {
                        spot.line_status_id = 3;
                    }
                } else if (this.getSpotLineStatusId() === 5) {
                    if (this.state.isGraphicsCompleted) {
                        spot.line_status_id = 6;
                    } else {
                        spot.line_status_id = 5;
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
            (data.framerate as string) = JSON.stringify(data.framerate);
            (data.raster_size as string) = JSON.stringify(data.raster_size);
            (data.spec_sheet_file as string) = JSON.stringify(data.spec_sheet_file);
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
        if (this.getSpotLineStatusId() === 2 || this.getSpotLineStatusId() === 3 || this.getSpotLineStatusId() === 4 || (this.getSpotLineStatusId() === 5 && !this.state.isGraphicsCompleted)) {
            return 'Save';
        } else if (this.getSpotLineStatusId() === 5 && this.state.isGraphicsCompleted) {
            return 'Complete';
        } else if (this.state.isGraphicsCompleted) {
            return 'Save';
        } else {
            return 'Save draft';
        }
    }
}

export default FormSendSection;
