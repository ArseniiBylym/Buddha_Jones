import * as React from 'react';

import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
const s = require('./LabelWithConfirmRemoveButton.css');

// Component
@observer
export class LabelWithConfirmRemoveButton extends React.Component<any, {}> {

    @observable private confirmModal: boolean = false;

    @action
    private confirmModalToggle = () => {
        this.confirmModal = !this.confirmModal;
    }

    private removeConfirmAnswer = () => {
        this.props.action();
        this.confirmModalToggle();
    }

    private removeRejectAnswer = () => {
        this.confirmModalToggle();
    }

    public render() {
        if (this.props.onlyIcon) {
            return (
                <div className={s.onlyIconContainer}>
                    <div
                        onClick={this.confirmModalToggle}
                        className={s.labelStudioContactRemoveButton}
                    >
                        &#x2716;
                    </div>
                    {this.confirmModal && <div className={s.removeConfirmContainer}>
                        <div className={s.removeConfirmContainer__header}>Are you sure?</div>
                        <div className={s.removeConfirmContainer__answers}>
                            <div onClick={this.removeConfirmAnswer} className={s.removeConfirmContainer__yes}>Yes</div>
                            <div onClick={this.removeRejectAnswer} className={s.removeConfirmContainer__no}>No</div>
                        </div>
                    </div>}
                </div>
            );
        }
        return (
            <div className={s.labelContainer}>
                <div className={s.labelName}>{this.props.contactName}</div>
                <div className={s.labelTitle}>
                   <div>{this.props.contactTitle}</div>
                    <div
                        onClick={this.confirmModalToggle}
                        className={s.labelStudioContactRemoveButton}
                    >
                        &#x2716;
                    </div>
                    {this.confirmModal && <div className={s.removeConfirmContainer}>
                        <div className={s.removeConfirmContainer__header}>Are you sure?</div>
                        <div className={s.removeConfirmContainer__answers}>
                            <div onClick={this.removeConfirmAnswer} className={s.removeConfirmContainer__yes}>Yes</div>
                            <div onClick={this.removeRejectAnswer} className={s.removeConfirmContainer__no}>No</div>
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}
