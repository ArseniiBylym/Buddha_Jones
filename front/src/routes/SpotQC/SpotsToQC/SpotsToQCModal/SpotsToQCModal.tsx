import * as React from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Modal } from 'components/Modals';
import { TableRow, Table, TableCell } from 'components/Table';
import { Input, TextArea } from 'components/Form';
import { ButtonAdd, ButtonClose, ButtonSend } from 'components/Button';
import { Section } from 'components/Section';
import { Paragraph } from 'components/Content';
import { IconTickBlue, IconTickWhite, IconArrowLeftYellow } from 'components/Icons';
import TextAreaFile from 'components/Form/TextAreaFile';
// import * as moment from 'moment';

const s = require('./SpotsToQCModal.css');

@inject('store')
@observer
export class SpotsToQCModal extends React.Component<any, any> {

    state = {
        textareaValue: '',
        textareaEmpty: true,
    };

    @observable private withGraphics: boolean = false;
    @observable private modalConfirmOpen: boolean = false;
    @observable private completedCheckbox: boolean = false;

    @computed
    private get withGraphicsStatus() {
        return this.withGraphics;
    }
    @computed
    private get completedCheckboxStatus() {
        return this.completedCheckbox;
    }

    @action
    private completedCheckboxToggle = () => {
        this.completedCheckbox = !this.completedCheckbox;
    }

    @action
    private modalConfirmToggle = () => {
        this.modalConfirmOpen = !this.modalConfirmOpen;
    }

    @action 
    private withGraphicsTogle = () => {
        this.withGraphics = !this.withGraphics;
    }

    @action
    private withGraphicsReset = () => {
        this.withGraphics = false;
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { spotToGraphics } = this.props.store;
        
        if (!spotToGraphics.fetchedSpot) {
            return null;
        }

        return (
            <>
                <Modal
                    onClose={this.handleModalClose}
                    closeButtonLabel=""
                    size="content-wide"
                    show={spotToGraphics.isModalQCOpen}
                    forceLongContent={true}
                    noPadding={false}
                    closeButton={false}
                    preventBackdropClick={true}
                >
                    <div className={s.SpotToGraphicsModal}>
                        <div className={s.header}>
                                <div className={s.header__spotDetails}>
                                    <span>{spotToGraphics.fetchedSpot.projectName ? spotToGraphics.fetchedSpot.projectName : null}</span>
                                    {` - `}
                                    <span>{spotToGraphics.fetchedSpot.campaignName ? spotToGraphics.fetchedSpot.campaignName : null}</span>
                                </div>
                                <div className={s.header__mainInfo}>
                                    <h3 className={s.header__spotName}>
                                        {spotToGraphics.fetchedSpot.spotName}
                                        {spotToGraphics.fetchedSpot.runtime && ` (${spotToGraphics.fetchedSpot.runtime})`}
                                    </h3>
                                    <IconArrowLeftYellow marginLeftAuto={true} marginRight={10} width={12} height={9} />
                                    <div className={s.header_backButton} onClick={this.handleModalClose}>Back to Apots to QC list</div>
                                </div>
                        </div>
                        <div className={s.content}>
                            <div className={s.noGraphicsContainer} >
                                {spotToGraphics.fetchedSpot.versionName && 
                                    <div className={s.noGraphicsVersion}>
                                        <span>Version:</span>{spotToGraphics.fetchedSpot.versionName}
                                    </div>
                                }
                                {/* <div className={s.noGraphicsContainer__wrapper} onClick={this.withGraphicsTogle}>
                                    <div className={s.noGraphicsCheckbox}>
                                        {this.withGraphics && <IconTickBlue width={12} height={9} />}
                                    </div>
                                    <div className={s.noGraphicsLabel}>NO GRAPHICS</div>
                                </div> */}
                            </div>
                            <div className={s.linkContainer}>
                                <div className={s.linkContainer__title}>Link:</div>
                                <Input label="some link paste here" /> 
                            </div>
                            <div className={s.navContainer} >
                                Buttons
                            </div>
                            <div className={s.commentsContainer}>
                                <div className={s.commentsContainer__title}>Comments:</div>
                                <TextArea value="" label="write your comments here" />
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

    @action
    private handleModalClose = (): void => {
        this.withGraphicsReset();
        this.props.store.spotToGraphics.clearStorage();
        this.props.store.spotToGraphics.toggleQCModal();
    };

    textareaOnChangeHandler = e => {
        this.setState({
            textareaValue: e.target.value,
        });
    }

    textareaOnBlurHandler = () => {
        if (!this.state.textareaValue) {
            this.setState({
                textareaEmpty: true
            });
        }
    }

    textareaOnFocusHandler = () => {
        if (this.state.textareaEmpty) {
            this.setState({
                textareaEmpty: false
            });
        }
    }

    private handleFileAdd = () => {
        if (this.state.textareaValue) {
            const arr: string[] | null = this.state.textareaValue.match(/[^\r\n]+/g);
            if (arr) {
                this.props.store.spotToGraphics.addFileArray(arr);
                this.setState({
                    textareaValue: '',
                    textareaEmpty: true,
                });
            }
        } else {
            this.props.store.spotToGraphics.addEmptyFileItem();
        }
    };

    private handleFileChangeName = (index: number) => e => {
        this.props.store.spotToGraphics.setFileName(index, e.target.value);
    }

    private handleFileChangeDescription = (index: number) => e => {
        this.props.store.spotToGraphics.setFileDescription(index, e.target.value);
    }

    private handleFileChangeResend = (index: number) => e => {
        this.props.store.spotToGraphics.setFileResend(index);
    }

    private handleFileRemove = (fileIndex: number) => () => {
        this.props.store.spotToGraphics.removeFileItem(fileIndex);
    };

    private sendFilesHandler =  async (toEDL) => {
        await this.props.store.spotToGraphics.sendFiles(this.withGraphicsStatus, this.completedCheckboxStatus, toEDL);
        if (this.props.forceUpdating) {
            this.props.forceUpdating();
        }
    }

    private sendHandler = (bool) => e => {
        if (bool) {
            this.sendFilesHandler(false);
            return;
        } else {
            this.modalConfirmToggle();
        }
    }

    modalButtonHandler = (value) => {
        if (value) {
            this.modalConfirmToggle();
            this.sendFilesHandler(true);
        } else {
            this.modalConfirmToggle();
        }
    }

}
