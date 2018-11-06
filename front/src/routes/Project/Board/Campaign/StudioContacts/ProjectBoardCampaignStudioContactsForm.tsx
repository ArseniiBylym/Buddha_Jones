import * as React from 'react';
import { observer } from 'mobx-react';
import { action, computed, observable } from 'mobx';
import { ButtonClose, ButtonSave } from '../../../../../components/Button';
import { NewStudioContactFormData } from '../../../../../actions/ClientsActions';
import { ClientsActions } from '../../../../../actions';
import { Input } from '../../../../../components/Form';

// Styles
import * as styles from './ProjectBoardCampaignStudioContactsForm.scss';

// Props
interface Props {
    onUpdateContacts: () => void | null;
    onToggleEditMode: () => void | null;
    customerId: number | null;
}

type InputColorProp = 'default' | 'blue' | 'brown' | 'blueFill' | 'brownFill' | 'greenFill' | 'red';

// Component
@observer
export class ProjectBoardCampaignStudioContactsForm extends React.Component<Props, {}> {

    @observable private newStudioContactFormData: NewStudioContactFormData | null = null;
    @observable private status: string | null = null;
    @observable private invalidFields: string[] = [];

    @computed
    private get isFormValid(): boolean {
        let result: boolean = true;
        this.invalidFields = [];

        if (this.newStudioContactFormData && !this.newStudioContactFormData.name) {
            result = false;
            this.invalidFields.push('name');
        }

        return result;
    }

    public componentDidMount() {
        this.setFormInitialState();
    }

    public render() {
        return (
            <>
                {
                    this.newStudioContactFormData !== null &&
                    <form>
                        <div className={styles.newCustomerForm}>
                            <div className={styles.rowContainer}>
                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newStudioContactFormData.name}
                                        label="Full name..."
                                        autoFocus={true}
                                        name={'name'}
                                        color={this.checkFieldForValid('name')}
                                    />
                                </div>

                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newStudioContactFormData.email}
                                        label="Email..."
                                        name={'email'}
                                        type="email"
                                    />
                                </div>
                            </div>

                            <div className={styles.rowContainer}>
                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newStudioContactFormData.title}
                                        label="Title..."
                                        name={'title'}
                                    />
                                </div>

                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newStudioContactFormData.mobile_phone}
                                        label="Phone..."
                                        name={'mobile_phone'}
                                    />
                                </div>

                            </div>

                        </div>

                        <div className={styles.buttons}>
                            {
                                this.status === 'success' &&
                                <div className={styles.successMessage}>
                                    New studio contact was added successfully
                                </div>
                            }

                            <ButtonClose
                                float="right"
                                onClick={this.props.onToggleEditMode}
                                label={'Close'}
                            />

                            <ButtonSave
                                onClick={this.onFormSubmitHandler}
                                float="right"
                                label={this.status === 'error' ? 'Could not save, please try again' : 'Create new studio contact'}
                                labelColor={this.status === 'error' ? 'orange' : 'blue'}
                                savingLabel="Saving"
                                isSaving={this.status === 'saving'}
                            />
                        </div>
                    </form>
                }
            </>
        );
    }

    @action
    private setFormInitialState(): void {
        this.newStudioContactFormData = {
            customer_id: this.props.customerId,
            name: '',
            title: '',
            email: '',
            mobile_phone: ''
        };
    }

    @action
    private handleSpotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.newStudioContactFormData !== null) {
            this.newStudioContactFormData[event.target.name] = event.target.value;
        }
    };

    @action
    private checkFieldForValid(name: string): InputColorProp {
        if (this.invalidFields.indexOf(name) > -1) {
            return 'red';
        }
        return 'default';
    }

    @action
    private onFormSubmitHandler = async (event: any) => {
        event.preventDefault();

        if (this.isFormValid) {
            try {
                debugger;
                this.status = 'saving';

                await ClientsActions.createNewStudioContact(this.newStudioContactFormData);

                this.status = 'success';
                this.setFormInitialState();
                this.props.onUpdateContacts();
            } catch (error) {
                this.status = 'error';
                throw error;
            }
        }
    };

}
