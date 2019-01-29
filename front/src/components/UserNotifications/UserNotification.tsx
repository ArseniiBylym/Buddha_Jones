import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { capitalize as _capitalize } from 'lodash';
import { NotificationsActions } from 'actions';

// Styles
const s = require('./UserNotification.css');

// Props
// interface NotificationProps {
//     id: number;
//     title: string;
//     description?: string | null;
//     type?: NotificationContentType;
//     date?: Date;
//     showDate?: boolean;
//     dismissable?: {
//         allow: boolean;
//         onDismiss: (() => void) | null;
//         dismissAutomaticallyAfterXSeconds: number | null;
//     };
//     actions?: {
//         onClick: () => void;
//         doesDismiss: boolean;
//         iconElement: JSX.Element;
//         label: string;
//     }[];
// }

// Component
@inject('store')
@observer
export class UserNotification extends React.Component<any, {}> {
   
    // @observable private show: boolean = false;

    public componentDidMount() {
        // Animate notification in
       
    }

    public render() {
        return (
            <div className={s.userNotification}>
                <div className={s.userNotification__header}>
                   <div className={s.userNotification__message}>{this.props.message}</div>
                   {this.props.link && <div className={s.userNotification__link}>{this.props.link}</div>}
                </div>
                <div className={s.userNotification__actions}>
                    <div className={s.userNotification__acitons_complete} onClick={this.completeAction}>Complete</div>
                    <div className={s.userNotification__acitons_dismiss} onClick={this.dismissAction}>Snooze</div> 
                </div>
            </div>
        );
    }

    private completeAction = () => {
        // Check notification as completed
        NotificationsActions.dismissNotification(this.props.id);
        NotificationsActions.completeNotification(this.props.id);

    };

    private dismissAction = () => {
        // Remove from list 
        NotificationsActions.dismissNotification(this.props.id);
    }
}
