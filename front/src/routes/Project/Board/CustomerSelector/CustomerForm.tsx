import * as React from 'react';
import * as styles from './CustomerForm.scss';
import * as classnames from 'classnames';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Input, InputColorProp } from 'components/Form/index';
import { ButtonClose, ButtonSave } from 'components/Button/index';
import { ClientsActions, NewCustomerFormData } from 'actions/index';
import { Checkmark } from '../../../../components/Form';

// Types
type NewCustomerFormModeProp = 'newCustomer' | 'approvalForm';

// Props
interface Props {
    onToggleEditMode: () => void | null;
    studioId: number | null;
    mode: NewCustomerFormModeProp;
    formData?: NewCustomerFormData;
    isAddedToSap?: boolean;
}

@observer
export class NewCustomerForm extends React.Component<Props, {}> {

    @observable private newCustomerFormData: NewCustomerFormData | null = null;
    @observable private isAddedToSap: boolean = false;
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
                                        value={this.newCustomerFormData.street}
                                        label="Street..."
                                        name={'street'}
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

                                <div className={classnames(styles.col, styles.groupInputs)}>
                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.state}
                                        label="State..."
                                        name={'state'}
                                    />

                                    <Input
                                        onChange={this.handleSpotNameChange}
                                        value={this.newCustomerFormData.zip}
                                        label="ZIP..."
                                        name={'zip'}
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
                                onClick={this.onCancelHandler}
                                label={'Close'}
                            />

                            <ButtonSave
                                onClick={this.onFormSubmitHandler}
                                float="right"
                                label={this.status === 'error' ? 'Could not save, please try again' : (this.props.mode === 'newCustomer') ? 'Create customer' : 'Save'}
                                labelColor={this.status === 'error' ? 'orange' : 'blue'}
                                savingLabel="Saving"
                                isSaving={this.status === 'saving'}
                            />

                            {(this.props.mode === 'approvalForm') &&
                                <Checkmark
                                    onClick={this.handleIsAddedToSapChange}
                                    checked={this.isAddedToSap}
                                    label={'Added to SAP'}
                                    className={styles.isAddedToSapLabel}
                                    type={'no-icon'}
                                />
                            }
                        </div>
                    </form>
                }
            </>
        );
    }

    @action
    private onFormSubmitHandler = async (event: any) => {
        event.preventDefault();

        if (this.isFormValid()) {
            try {
                this.status = 'saving';
                switch (this.props.mode) {
                    case 'approvalForm' :
                        let newCustomerFormData: NewCustomerFormData = this.newCustomerFormData as NewCustomerFormData;
                        newCustomerFormData['completed'] = (this.isAddedToSap) ? 1 : 0;
                        await ClientsActions.editNewCustomer(newCustomerFormData);
                        this.props.onToggleEditMode();
                        break;
                    default:
                        await ClientsActions.createNewCustomer(this.newCustomerFormData);
                        this.status = 'success';
                        this.getEmptyFormData();
                }

            } catch (error) {
                this.status = 'error';
                throw error;
            }
        }
    };

    @action
    private onCancelHandler = (event: any) => {
        switch (this.props.mode) {
            case 'approvalForm' :
                this.props.onToggleEditMode();
                break;
            default:
                this.props.onToggleEditMode();
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
        switch (this.props.mode) {
            case 'approvalForm' :
                this.newCustomerFormData = (this.props.formData) ? this.props.formData : this.getEmptyFormData();
                this.isAddedToSap = (this.props.isAddedToSap) ? this.props.isAddedToSap : false;
                break;
            default:
                this.newCustomerFormData = this.getEmptyFormData();
        }
    }

    @action
    private handleIsAddedToSapChange = (): void => {
        this.isAddedToSap = !this.isAddedToSap;
    };

    private getEmptyFormData(): NewCustomerFormData {
        return {
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

}
