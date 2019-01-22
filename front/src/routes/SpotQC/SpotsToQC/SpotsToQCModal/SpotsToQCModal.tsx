import * as React from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Modal } from 'components/Modals';
import { TextArea, Checkmark } from 'components/Form';
import { ButtonSend } from 'components/Button';
import { IconArrowLeftYellow } from 'components/Icons';

const s = require('./SpotsToQCModal.css');

@inject('store')
@observer
export class SpotsToQCModal extends React.Component<any, any> {

    @observable public commentText = '';

    @action
    private commentTextHandler = (value: string) => {
        this.commentText = value;
    }

    public componentDidMount = () => {
        if (this.props.store.spotToGraphics.fetchedSpot.qcNote) {
            this.commentTextHandler(this.props.store.spotToGraphics.fetchedSpot.qcNote);
        }
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { spotToGraphics } = this.props.store;
        
        if (!spotToGraphics.fetchedSpot) {
            return null;
        }
        const spot = spotToGraphics.fetchedSpot;

        return (
            <>
                <Modal
                    onClose={this.closeModalHandler}
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
                                    <span>{spot.projectName ? spot.projectName : null}</span>
                                    {` - `}
                                    <span>{spot.campaignName ? spot.campaignName : null}</span>
                                </div>
                                <div className={s.header__mainInfo}>
                                    <h3 className={s.header__spotName}>
                                        {spot.spotName}
                                        {spot.runtime && ` (${spot.runtime})`}
                                    </h3>
                                    <IconArrowLeftYellow marginLeftAuto={true} marginRight={10} width={12} height={9} />
                                    <div className={s.header_backButton} onClick={this.closeModalHandler}>Back to Spots to QC list</div>
                                </div>
                        </div>
                        <div className={s.content}>
                            <div className={s.noGraphicsContainer} >
                                {spot.versionName && 
                                    <div className={s.noGraphicsVersion}>
                                        <span>Version:</span>{spot.versionName}
                                    </div>
                                }
                            </div>
                            <div className={s.linkContainer}>
                                <div className={s.linkContainer__title}>Link:</div>
                                <div className={s.linkContainer__content}>
                                    {spot.qcLink ? <a href={spot.qcLink} target="_blanck">{spot.qcLink}</a> : 'some link paste here'}
                                </div>
                            </div>
                            <div className={s.navContainer} >
                                <Checkmark onClick={this.isApprovedHandler} type="no-icon" checked={this.isApproved()} label="Not Approved" labelOnLeft={false}/>
                                <Checkmark onClick={this.isApprovedToSendHandler} type="no-icon" checked={this.isApprovedToSend()} label="Approved to send" labelOnLeft={false}/>
                                <ButtonSend label="Save" iconColor="green" labelColor="green" labelSize="large" onClick={this.saveHandler}/>
                            </div>
                            {spotToGraphics.spotQCNotApproved && 
                                <div className={s.commentsContainer}>
                                    <div className={s.commentsContainer__title}>Comments:</div>
                                    <TextArea value={this.commentText}  onChange={this.textChangeHandler} label="write your comments here" width={1400}/>
                                </div>
                            }
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

    private saveHandler = async() => {
        await this.props.store.spotToGraphics.changeQCApi(this.commentText);
        if (this.props.forceUpdating) {
            this.props.forceUpdating();
        }
    }

    private textChangeHandler = (e) => {
        this.commentTextHandler(e.target.value);
    }

    private isApproved = () => {
        if (!this.props.store.spotToGraphics.spotQCApprovedToSend && this.props.store.spotToGraphics.spotQCNotApproved) {
            return true;
        } else {
            return false;
        }
    }

    private isApprovedToSend = () => {
        if (!this.props.store.spotToGraphics.spotQCNotApproved && this.props.store.spotToGraphics.spotQCApprovedToSend) {
            return true;
        } else {
            return false;
        }
    }

    private isApprovedHandler = () => {
        if (this.props.store.spotToGraphics.spotQCApprovedToSend) {
            this.props.store.spotToGraphics.toggleSpotQCApprovedToSend();
        }
        this.props.store.spotToGraphics.toggleSpotQCApproved();
    }

    private isApprovedToSendHandler = () => {
        if (this.props.store.spotToGraphics.spotQCNotApproved) {
            this.props.store.spotToGraphics.toggleSpotQCApproved();
        }
        this.props.store.spotToGraphics.toggleSpotQCApprovedToSend();
    }

    private closeModalHandler = () => {
        this.props.forceUpdating();
        this.handleModalClose();
    }

    @action
    private handleModalClose = (): void => {
        this.props.store.spotToGraphics.clearApproverCheckboxes();
        this.props.store.spotToGraphics.clearStorage();
        this.props.store.spotToGraphics.toggleQCModal();
    };
}
