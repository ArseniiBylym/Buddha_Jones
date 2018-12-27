import * as React from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Modal } from 'components/Modals';
import { DatePicker } from 'components/Calendar/DatePicker';
import { TableRow, Table, TableCell } from 'components/Table';
import { Input } from 'components/Form';
import { ButtonAdd, ButtonClose } from 'components/Button';
import { Section } from 'components/Section';
import { Paragraph } from 'components/Content';
import { IconTickBlue, IconTickWhite, IconArrowLeftYellow } from 'components/Icons';
import TextAreaFile from 'components/Form/TextAreaFile';

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
        
        if (!spotToGraphics.currentSpot) {
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
                                <h2 className={s.header__spotName}>{spotToGraphics.currentSpot.spotName}</h2>
                                <IconArrowLeftYellow marginLeftAuto={true} marginRight={10} width={12} height={9} />
                                <div className={s.header_backButton} onClick={this.handleModalClose}>Back to spot sent list</div>
                        </div>
                        <div className={s.content}>
                            <div className={s.dateSelect}>
                                <div className={s.dateSelect__item}>
                                    Spot sent date
                                    <DatePicker 
                                        onChange={this.changeDateHandler}
                                        align="right"
                                        value={null}
                                    />
                                </div>
                            </div>
                            <div className={s.labels}></div>
                            <hr /> 
                            <div className={s.noGraphicsContainer} onClick={this.withGraphicsTogle}>
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

    private changeDateHandler = (date) => {
        this.props.store.spotToGraphics.setDate(date);
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
        this.props.store.spotToGraphics.setFileResend(index, e.target.value);
    }

    private handleFileRemove = (fileIndex: number) => () => {
        this.props.store.spotToGraphics.removeFileItem(fileIndex);
    };

    private sendFilesHandler = () => {
        this.props.store.spotToGraphics.sendFiles();
    }

    private sendHandler = () => {
        if (this.withGraphics) {
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
                    spotToGraphics.files.map((file, fileIndex) => (
                        <TableRow key={fileIndex}>
                            <TableCell>
                                <Input
                                    maxWidth={200}
                                    label="Filename"
                                    value={file.name}
                                    onChange={this.handleFileChangeName(fileIndex)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    minWidth={320}
                                    label="Description (optional)"
                                    value={file.description}
                                    onChange={this.handleFileChangeDescription(fileIndex)}
                                />
                            </TableCell>
                            <TableCell>
                                <div className={s.fileCheckbox}>
                                    <div onClick={this.handleFileChangeResend(fileIndex)} className={file.resend ? s.fileCheckbox__fill : s.fileCheckbox__empty}>
                                        {file.resend && <IconTickWhite />}
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

                    {(spotToGraphics === null || spotToGraphics.files.length <= 0) && (
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
                    <div 
                        onClick={this.sendHandler}
                        className={s.buttonSend__item}
                    >
                        {this.withGraphics ? 'Save' : 'Request EDL'}
                    </div>
                </div>
                <Modal
                    show={this.modalConfirmOpen}
                    title="You are requesting EDL, please confirm"
                    closeButton={false}
                    type="alert"
                    actions={[
                        {
                            onClick: () => { this.modalButtonHandler(true); },
                            closeOnClick: false,
                            label: 'YES',
                            type: 'default',
                        },
                        {
                            onClick: () => { this.modalButtonHandler(false); },
                            closeOnClick: false,
                            label: 'NO',
                            type: 'alert',
                        },
                    ]}
                />
            </Section>
        );
    }

}
