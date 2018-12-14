import * as React from 'react';
import * as classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { capitalize as _capitalize } from 'lodash';
import { Row, Col } from '../Section';
import { Button, ButtonClose } from '../Button';
import { Paragraph } from '../Content';
import { DateHandler } from '../../helpers/DateHandler';
import { AppOnlyStoreState } from '../../store/AllStores';
import { NotificationContentType } from '../../types/notifications';

// Styles
const s = require('./Notification.css');

// Props
interface NotificationProps {
    id: number;
    title: string;
    description?: string | null;
    type?: NotificationContentType;
    date?: Date;
    showDate?: boolean;
    dismissable?: {
        allow: boolean;
        onDismiss: (() => void) | null;
        dismissAutomaticallyAfterXSeconds: number | null;
    };
    actions?: {
        onClick: () => void;
        doesDismiss: boolean;
        iconElement: JSX.Element;
        label: string;
    }[];
}

// Component
@inject('store')
@observer
export class Notification extends React.Component<NotificationProps & AppOnlyStoreState, {}> {
    static get defaultProps(): NotificationProps {
        return {
            id: 0,
            title: '',
            description: null,
            type: NotificationContentType.Default,
            date: new Date(),
            showDate: false,
            dismissable: {
                allow: true,
                onDismiss: null,
                dismissAutomaticallyAfterXSeconds: null,
            },
            actions: [],
        };
    }

    private exists: boolean = true;

    @observable private show: boolean = false;

    // ORIGINAL STATE
    // this.state = {
    //     show: false,
    //     date: date,
    //     timeAgo: printDateAsTimeAgo(date, false, true)
    // };

    public componentDidMount() {
        // Animate notification in
        setTimeout(() => {
            if (this.exists) {
                this.show = true;
            }
        }, 128);

        // Set automatic notification dismissal
        if (
            typeof this.props.dismissable !== 'undefined' &&
            typeof this.props.dismissable.dismissAutomaticallyAfterXSeconds !== 'undefined' &&
            this.props.dismissable.dismissAutomaticallyAfterXSeconds !== null
        ) {
            setTimeout(() => {
                this.handleNotificationDismiss();
            }, this.props.dismissable.dismissAutomaticallyAfterXSeconds * 1000);
        }
    }

    public componentWillUnmount() {
        this.exists = false;
    }

    public render() {
        return (
            <div
                className={classNames(s.notification, {
                    [s.hide]: this.show === false,
                    [s['ofType' + _capitalize(this.props.type)]]: this.props.type !== NotificationContentType.Default,
                    [s.dismissable]:
                        typeof this.props.dismissable !== 'undefined' &&
                        typeof this.props.dismissable.allow !== 'undefined' &&
                        this.props.dismissable.allow,
                })}
            >
                <div className={s.notificationHeader}>
                    <h3>{this.props.title}</h3>

                    {this.props.description && this.props.showDate && <hr />}

                    {this.props.description && (
                        <Paragraph className={s.description}>{this.props.description}</Paragraph>
                    )}

                    {this.props.showDate &&
                        typeof this.props.date !== 'undefined' &&
                        this.props.date && (
                            <Paragraph className={s.date} float="right">
                                {DateHandler.printAsTimeAgoFromNow(this.props.date)}
                            </Paragraph>
                        )}

                    {typeof this.props.dismissable !== 'undefined' &&
                        this.props.dismissable &&
                        typeof this.props.dismissable.allow !== 'undefined' &&
                        this.props.dismissable.allow && (
                            <ButtonClose onClick={this.handleNotificationDismiss} className={s.dismiss} label="" />
                        )}
                </div>

                {this.props.actions &&
                    this.props.actions.length > 0 && (
                        <Row doWrap={true} className={s.notificationActions}>
                            {this.props.actions.map(action => (
                                <Col
                                    key={action.label}
                                    onClick={
                                        typeof action.doesDismiss !== 'undefined' && action.doesDismiss
                                            ? this.handleNotificationDismiss
                                            : undefined
                                    }
                                >
                                    <Button
                                        onClick={
                                            typeof action.onClick === 'function' && action.onClick
                                                ? action.onClick
                                                : undefined
                                        }
                                        icon={
                                            action.iconElement
                                                ? {
                                                      element: action.iconElement,
                                                      background: 'orange',
                                                      size: 'small',
                                                  }
                                                : undefined
                                        }
                                        label={
                                            action.label
                                                ? {
                                                      text: action.label,
                                                      size: 'large',
                                                      color: 'orange',
                                                      onLeft: true,
                                                  }
                                                : undefined
                                        }
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}
            </div>
        );
    }

    private handleNotificationDismiss = () => {
        // Hide notification
        if (this.exists) {
            this.show = false;
        }

        // Pass further
        if (
            typeof this.props.dismissable !== 'undefined' &&
            this.props.dismissable &&
            typeof this.props.dismissable.onDismiss !== 'undefined' &&
            this.props.dismissable.onDismiss
        ) {
            this.props.dismissable.onDismiss();
        }
    };
}
