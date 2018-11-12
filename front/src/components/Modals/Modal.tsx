import * as React from 'react';
import * as classNames from 'classnames';
import { createPortal } from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Button, ButtonClose } from '../Button';
import { Paragraph } from '../Content';

// Styles
const s = require('./Modal.css');

// Types
export type ModalType = 'default' | 'success' | 'alert';
export type ModalSize = 'default' | 'content-wide';

export type ActionClickEvent = () => void;

// Props
interface ModalProps {
    show?: boolean;
    forceLongContent?: boolean;
    title?: string | null;
    text?: string | null;
    type?: ModalType;
    size?: ModalSize;
    noPadding?: boolean;
    closeButton?: boolean;
    closeButtonLabel?: string;
    onClose?: ActionClickEvent | null;
    actions?: {
        onClick?: ActionClickEvent;
        closeOnClick: boolean;
        label: string;
        type?: ModalType;
    }[];
}

@observer
export class Modal extends React.Component<ModalProps, {}> {
    static get defaultProps(): ModalProps {
        return {
            show: false,
            forceLongContent: false,
            title: null,
            text: null,
            type: 'default',
            size: 'default',
            noPadding: false,
            closeButton: false,
            closeButtonLabel: 'Close',
            onClose: null,
            actions: [],
        };
    }

    private modal: HTMLDivElement | null = null;

    @observable private longContent: boolean = false;

    public componentWillReceiveProps(nextProps: ModalProps) {
        if (this.props.show !== nextProps.show) {
            if (nextProps.show) {
                if (this.props.forceLongContent || (this.modal && this.modal.scrollHeight > this.modal.clientHeight)) {
                    this.longContent = true;
                }
            } else {
                this.longContent = false;
            }
        }
    }

    public render() {
        return createPortal(
            <CSSTransitionGroup
                transitionName="modal"
                transitionEnter={true}
                transitionEnterTimeout={1000}
                transitionLeave={true}
                transitionLeaveTimeout={500}
            >
                {this.props.show && (
                    <div
                        ref={this.referenceModal}
                        key="modal-one"
                        onClick={this.handleModalClick}
                        className={classNames(s.modal, {
                            [s.longContent]: this.longContent,
                            [s.contentWide]: this.props.size === 'content-wide',
                            [s.noPadding]: this.props.noPadding,
                        })}
                    >
                        <div className={s.flexbox}>
                            <div className={s.wrapper}>
                                <div onClick={this.handleContainerClick} className={s.container}>
                                    {this.props.noPadding && <div className={s.topbar}/>}

                                    {this.props.title && (
                                        <div className={s.header}>
                                            <h2>{this.props.title}</h2>
                                        </div>
                                    )}

                                    {(this.props.text || this.props.children) && (
                                        <div className={s.content}>
                                            {this.props.text && <Paragraph>{this.props.text}</Paragraph>}
                                            {this.props.children && (
                                                <div className={s.children}>{this.props.children}</div>
                                            )}
                                        </div>
                                    )}

                                    {typeof this.props.actions !== 'undefined' &&
                                    typeof this.props.actions.length !== 'undefined' &&
                                    this.props.actions.length > 0 && (
                                        <div className={s.footer}>
                                            {this.props.actions.map((action, index) => (
                                                <Button
                                                    key={`action-button-${index}`}
                                                    className={classNames(s.actionButton)}
                                                    onClick={this.handleClickAction({
                                                        closeOnClick:
                                                            typeof action.closeOnClick &&
                                                            action.closeOnClick !== null
                                                                ? action.closeOnClick
                                                                : true,
                                                        onClick:
                                                            typeof action.onClick !== 'undefined' && action.onClick
                                                                ? action.onClick
                                                                : null,
                                                    })}
                                                    isInBox={true}
                                                    label={{
                                                        text:
                                                            typeof action.label !== 'undefined' ? action.label : '',
                                                        color:
                                                            typeof action.type !== 'undefined' && action.type
                                                                ? action.type === 'success'
                                                                ? 'green'
                                                                : action.type === 'alert'
                                                                    ? 'orange'
                                                                    : 'blue'
                                                                : 'blue',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {this.props.closeButton && (
                                        <ButtonClose
                                            onClick={this.handleClickClose}
                                            className={s.closeButton}
                                            label={this.props.closeButtonLabel}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CSSTransitionGroup>,
            document.body
        );
    }

    private referenceModal = (ref: HTMLDivElement) => (this.modal = ref);

    private handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    private handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    private handleClickAction = (action: { closeOnClick: boolean; onClick: ActionClickEvent | null }) => (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (action.onClick) {
            action.onClick();
        }

        if (action.closeOnClick && this.props.onClose) {
            this.props.onClose();
        }
    };

    private handleClickClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    };
}
