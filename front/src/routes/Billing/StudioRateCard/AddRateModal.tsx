import * as React from 'react';
import { inject, observer } from 'mobx-react';

import * as styles from './styles.scss';
import { AppState } from 'store/AllStores';
import { ButtonClose } from 'components/Button/ButtonClose';
import { ButtonSave } from 'components/Button/ButtonSave';
import { Input } from 'components/Form/Input';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string) => void;
    onSave: (name: string) => void;
    isSaving: boolean;
    label: string;
    mode: 'edit' | 'new';
}

interface State {
    inputValue: string;
    validationError: string;
    touched: boolean;
}

@inject('store')
@observer
class AddRateModal extends React.Component<Props & AppState, {}> {
    public state: State = {
        inputValue: '',
        validationError: '',
        touched: false,
    };

    public componentWillReceiveProps (nextProps: Props): void {
        if (nextProps.isOpen && !this.props.isOpen) {
            this.setState({
                inputValue: this.props.mode === 'edit' ? this.props.label : '',
                touched: false
            });
        }
    }

    public render() {
        if (!this.props.store || !this.props.isOpen) {
            return null;
        }
        return (
            <div className={styles.addRateModal}>
                <div>
                    <Input
                        fieldClassName={(this.state.touched && this.state.validationError) ? styles.inputError : ''}
                        label="Enter Name"
                        color="brown"
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                    />
                    {this.state.touched && <p className={styles.addRateInputError}>{this.state.validationError}</p>}
                </div>
                <div className={styles.addRateModalButtonsWrapper}>
                    <ButtonSave
                        className={styles.rateSaveAddButton}
                        label="Save"
                        labelColor="green"
                        isSaving={this.props.isSaving}
                        savingLabel="Saving"
                        onClick={this.handleSave}
                    />
                    <ButtonClose
                        className={styles.rateCloseAddButton}
                        label="Close"
                        onClick={this.props.onClose}
                    />
                </div>
            </div>
        );
    }

    private validate = () => {
        if (this.state.inputValue === '') {
            this.setState({validationError: 'name cant be empty'});
        } else {
            this.setState({validationError: ''});
        }
    }

    private isValid = () => {
        this.setState({touched: true}, () => {
            this.validate();
        });
        return this.state.inputValue !== '';
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputValue: e.target.value}, () => {
            this.validate();
        });
    };

    private handleSave = () => {
        if (this.isValid()) {
            if (this.props.mode === 'new') {
                this.props.onAdd(this.state.inputValue);
            } else {
                this.props.onSave(this.state.inputValue);
            }

        }
    }
}

export default AddRateModal;