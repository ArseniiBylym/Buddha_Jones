import * as React from 'react';
import * as styles from './CustomerForm.scss';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Input, InputColorProp } from 'components/Form/index';
import { ButtonClose, ButtonSave } from 'components/Button/index';
import { ClientsActions, NewCustomerFormData } from 'actions/index';

interface Props {
    onToggleEditMode: () => void | null;
    studioId: number | null;
}

@observer
export class NewCustomerForm extends React.Component<Props, {}> {
    @observable private newCustomerFormData: NewCustomerFormData | null = null;
    @observable private status: string | null = null;
    @observable private invalidFields: string[] = [];

    public componentDidMount() {
        this.setFormInitialState();
    }

    public render(): JSX.Element {
        return (
            <>
                {
                    this.newCustomerFormData !== null &&
                    <form>
                        <div className={styles.newCustomerForm}>
                            <div className={styles.rowContainer}>
                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.name}
                                        label="Customer name..."
                                        autoFocus={true}
                                        name={'name'}
                                        color={this.checkFieldForValid('name')}
                                    />
                                </div>

                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.email}
                                        label="Email..."
                                        name={'email'}
                                        type="email"
                                    />
                                </div>

                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.phone}
                                        label="Phone..."
                                        name={'phone'}
                                    />
                                </div>
                            </div>

                            <div className={styles.rowContainer}>
                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.zip}
                                        label="ZIP..."
                                        name={'zip'}
                                    />
                                </div>

                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.state}
                                        label="State..."
                                        name={'state'}
                                    />
                                </div>

                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.city}
                                        label="City..."
                                        name={'city'}
                                    />
                                </div>

                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.street}
                                        label="Street..."
                                        name={'street'}
                                    />
                                </div>
                            </div>

                            <div className={styles.rowContainer}>
                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.billing_contact}
                                        label="Billing contact..."
                                        name={'billing_contact'}
                                    />
                                </div>

                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.billing_email}
                                        label="Billing email..."
                                        name={'billing_email'}
                                        type="email"
                                    />
                                </div>

                                <div className={styles.col}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.billing_phone}
                                        label="Billing phone..."
                                        name={'billing_phone'}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttons}>
                            {
                                this.status === 'success' &&
                                <div className={styles.successMessage}>
                                    New customer was added successfully
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
                                label={this.status === 'error' ? 'Could not save, please try again' : 'Create customer'}
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

    private checkFieldForValid(name: string): InputColorProp {
        if (this.invalidFields.indexOf(name) > -1) {
            return 'red';
        }

        return 'default';
    }

    private isFormValid(): boolean {
        let result: boolean = true;
        this.invalidFields = [];

        if (this.newCustomerFormData && !this.newCustomerFormData.name) {
            result = false;
            this.invalidFields.push('name');
        }

        return result;
    }

    @action
    private onFormSubmitHandler = async (event: any) => {
        event.preventDefault();

        if (this.isFormValid()) {
            try {
                this.status = 'saving';

                await ClientsActions.createNewCustomer(this.newCustomerFormData);

                this.status = 'success';
                this.setFormInitialState();
            } catch (error) {
                this.status = 'error';
                throw error;
            }
        }
    };

    @action
    private handleSpotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.newCustomerFormData !== null) {
            this.newCustomerFormData[event.target.name] = event.target.value;
        }
    };

    @action
    private setFormInitialState(): void {
        this.newCustomerFormData = {
            studio_id: this.props.studioId,
            name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            email: '',
            phone: '',
            billing_contact: '',
            billing_email: '',
            billing_phone: ''
        };
    }
}