import * as React from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Modal } from 'components/Modals';
import { TableRow, Table, TableCell } from 'components/Table';
import { Input } from 'components/Form';
import { ButtonAdd, ButtonClose, ButtonSend } from 'components/Button';
import { Section } from 'components/Section';
import { Paragraph } from 'components/Content';
import { IconTickBlue, IconTickWhite, IconArrowLeftYellow } from 'components/Icons';
import TextAreaFile from 'components/Form/TextAreaFile';
// import * as moment from 'moment';

const s = require('./SpotsToGraphicsModal.css');

@inject('store')
@observer
export class SpotsToGraphicsModal extends React.Component<any, any> {

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
                    show={spotToGraphics.isModalOpen}
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
                                    <div className={s.header_backButton} onClick={this.handleModalClose}>Back to spot sent list</div>
                                </div>
                        </div>
                        <div className={s.content}>
                            <div className={s.noGraphicsContainer} onClick={this.withGraphicsTogle}>
                                {spotToGraphics.fetchedSpot.versionName && 
                                    <div className={s.noGraphicsVersion}>
                                        <span>Version:</span>{spotToGraphics.fetchedSpot.versionName}
                                    </div>
                                }
                                <div className={s.noGraphicsContainer__wrapper}>
                                    <div className={s.noGraphicsCheckbox}>
                                        {this.withGraphics && <IconTickBlue width={12} height={9} />}
                                    </div>
                                    <div className={s.noGraphicsLabel}>NO GRAPHICS</div>
                                </div>
                            </div>
                            {this.getFilesWorkOnSection()}
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
        this.props.store.spotToGraphics.toggleModal();
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

    private sendFilesHandler = () => {
        this.props.store.spotToGraphics.sendFiles(this.withGraphicsStatus, this.completedCheckboxStatus);
    }

    private sendHandler = (bool) => e => {
        if (bool) {
            this.sendFilesHandler();
            return;
        } else {
            this.modalConfirmToggle();
        }
    }

    modalButtonHandler = (value) => {
        if (value) {
            this.modalConfirmToggle();
            this.sendFilesHandler();
        } else {
            this.modalConfirmToggle();
        }
    }

    private getFilesWorkOnSection(): JSX.Element | null {
        if (!this.props.store) {
            return null;
        }

        const { spotToGraphics } = this.props.store;
        let spotName = `${spotToGraphics.fetchedSpot.spotName}`;
        if (spotToGraphics.fetchedSpot.runtime) {
            spotName += ` (${spotToGraphics.fetchedSpot.runtime})`;
        }

        return (
            <Section title="Files worked on">
                <Table
                    type="compact"
                    header={[
                        { title: 'Filename', align: 'left' },
                        { title: 'Description', align: 'left' },
                        { title: 'Resend', align: 'center' },
                        { title: 'Remove', align: 'center' },
                    ]}
                    columnsWidths={['200px', '366px', '110px', '110px']}
                >
                    {spotToGraphics &&
                    spotToGraphics.fetchedSpot.graphicsFile.map((file, fileIndex) => (
                        <TableRow key={fileIndex}>
                            <TableCell>
                                <Input
                                    maxWidth={200}
                                    label="Filename"
                                    value={file.fileName}
                                    onChange={this.handleFileChangeName(fileIndex)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    minWidth={320}
                                    label="Description (optional)"
                                    value={file.fileDescription}
                                    onChange={this.handleFileChangeDescription(fileIndex)}
                                />
                            </TableCell>
                            <TableCell>
                                <div className={s.fileCheckbox}>
                                    <div onClick={this.handleFileChangeResend(fileIndex)} className={file.resend === 1 ? s.fileCheckbox__fill : s.fileCheckbox__empty}>
                                        {file.resend === 1 && <IconTickWhite />}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell align="center">
                                <div className={s.fileCheckbox}>
                                    <ButtonClose
                                        onClick={this.handleFileRemove(fileIndex)}
                                        label=""
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}

                    {(spotToGraphics === null || spotToGraphics.fetchedSpot.graphicsFile.length <= 0) && (
                        <TableRow key="no-files">
                            <TableCell colSpan={4}>
                                <Paragraph type="alert">Files are required</Paragraph>
                            </TableCell>
                        </TableRow>
                    )}

                    <TableRow key="add">
                        <TableCell colSpan={4} align="right">
                            <ButtonAdd
                                onClick={this.handleFileAdd}
                                label="Add file names"
                                labelOnLeft={true}
                                float="right"
                            />
                        </TableCell>
                    </TableRow>
                </Table>
                <TextAreaFile 
                    config={this.state} 
                    textareaOnFocusHandler={this.textareaOnFocusHandler} 
                    textareaOnBlurHandler={this.textareaOnBlurHandler}
                    textareaOnChangeHandler={this.textareaOnChangeHandler}
                />
                <div className={s.buttonSend__container}>
                     {!spotToGraphics.isFilesEmpty || this.withGraphics ?
                        <div className={s.fileCheckbox}>
                            <div onClick={this.completedCheckboxToggle} className={this.completedCheckbox ? s.fileCheckbox__fill : s.fileCheckbox__empty}>
                                {this.completedCheckbox && <IconTickWhite />} 
                            </div>
                        </div> : null
                    }
                    {!spotToGraphics.isFilesEmpty || this.withGraphics ? <div onClick={this.completedCheckboxToggle} className={s.fileCheckbox__label}>Completed</div> : null}
                    {!spotToGraphics.isFilesEmpty || this.withGraphics 
                        ? <ButtonSend onClick={this.sendHandler(true)} label="Save" labelSize="large" iconColor="green" labelColor="green"/>
                        : <div onClick={this.sendHandler(false)} className={s.buttonSend__item}>Request EDL</div>
                    }
                </div>
                <Modal
                    show={this.modalConfirmOpen}
                    title={`You are requesting EDL for Spot ${spotName} `}
                    closeButton={false}
                    type="alert"
                    actions={[
                        {
                            onClick: () => { this.modalButtonHandler(true); },
                            closeOnClick: false,
                            label: 'Confirm',
                            type: 'default',
                        },
                        {
                            onClick: () => { this.modalButtonHandler(false); },
                            closeOnClick: false,
                            label: 'Cancel',
                            type: 'alert',
                        },
                    ]}
                />
            </Section>
        );
    }

}
