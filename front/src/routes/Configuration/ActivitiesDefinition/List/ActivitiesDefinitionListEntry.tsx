import * as React from 'react';
import { observer } from 'mobx-react';
import { Activity, ActivityUserType } from 'types/activities';
import { TableRow, TableCell } from 'components/Table';
import { Paragraph } from 'components/Content';
import { ButtonEdit, Button } from 'components/Button';
import { UserType } from 'types/users';
import { observable, computed } from 'mobx';
import { IconCheckmarkGreen, IconClose } from 'components/Icons';

// Styles
const s = require('./ActivitiesDefinitionListEntry.css');

// Props
interface ActivitiesDefinitionListEntryProps {
    onActivityEditButtonClick: (activityId: number) => (e?: React.MouseEvent<HTMLButtonElement>) => void;
    userTypesListLimit: number;
    usersTypes: UserType[];
    activity: Activity;
}

// Component
@observer
export class ActivitiesDefinitionListEntry extends React.Component<ActivitiesDefinitionListEntryProps, {}> {
    @observable private showAllUsersTypes: boolean = false;

    @computed
    private get showAllUsersTypesToggleButton(): boolean {
        return this.props.activity.userTypes.length > this.props.userTypesListLimit;
    }

    @computed
    private get activityRequirements(): string[] {
        const requirements: string[] = [];

        if (this.props.activity.isDescriptionRequired) {
            requirements.push('Activity description');
        }

        if (this.props.activity.areFilesRequired) {
            requirements.push('Files worked on');
        }

        if (this.props.activity.isProjectCampaignRequired) {
            requirements.push('Project + campaign');
        }

        if (this.props.activity.isSpotVersionRequired) {
            requirements.push('Spot + version');
        }

        return requirements;
    }

    @computed
    private get visibleUsersTypes(): ActivityUserType[] {
        const { activity, usersTypes, userTypesListLimit } = this.props;

        return activity.userTypes && activity.userTypes.length > 0
            ? activity.userTypes.length >= usersTypes.length
                ? activity.userTypes
                : activity.userTypes.length > userTypesListLimit && !this.showAllUsersTypes
                    ? activity.userTypes.filter((_type, typeIndex) => typeIndex < userTypesListLimit)
                    : activity.userTypes
            : [];
    }

    @computed
    private get visibleToAllUsersTypes(): boolean {
        return this.props.activity.userTypes.length >= this.props.usersTypes.length;
    }

    public render() {
        const { activity } = this.props;

        return (
            <React.Fragment key={'activity-' + activity.id}>
                <TableRow id={'activity-definition-row-' + activity.id}>
                    <TableCell align="left">
                        <Paragraph type={activity.isActive ? 'default' : 'dim'}>
                            <strong>#{activity.id}</strong> - <strong>{activity.name}</strong>
                        </Paragraph>
                    </TableCell>
                    <TableCell align="left">
                        <Paragraph type={activity.isActive ? 'default' : 'dim'}>{activity.typeName}</Paragraph>{' '}
                    </TableCell>
                    <TableCell align="center">
                        {(activity.isActive && <IconCheckmarkGreen marginLeftAuto={true} marginRightAuto={true} />) || (
                            <IconClose marginLeftAuto={true} marginRightAuto={true} />
                        )}
                    </TableCell>
                    <TableCell align="right">
                        <ButtonEdit
                            onClick={this.props.onActivityEditButtonClick(activity.id)}
                            float="right"
                            label="Edit"
                        />
                    </TableCell>
                </TableRow>

                {this.activityRequirements.length > 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className={s.requirementsContainerCell}>
                            <div className={s.requirements}>
                                <Paragraph className={s.label}>Requirements:</Paragraph>

                                {this.activityRequirements.map(req => (
                                    <p key={req} className={s.tag}>
                                        {req}
                                    </p>
                                ))}
                            </div>
                        </TableCell>
                    </TableRow>
                )}

                <TableRow type="compact">
                    <TableCell align="left" colSpan={4}>
                        <Paragraph
                            className={s.userTypesList}
                            type={this.visibleUsersTypes.length > 0 ? 'default' : 'dim'}
                        >
                            {this.visibleToAllUsersTypes
                                ? 'Visible to all users'
                                : this.visibleUsersTypes.length > 0
                                    ? 'Visible to: '
                                    : 'Not visible to any user'}

                            {!this.visibleToAllUsersTypes &&
                                this.visibleUsersTypes.map((userType, userTypeIndex) => (
                                    <span key={activity.id + '-' + userType.id}>
                                        {`${userTypeIndex > 0 ? ', ' : ''}${userType.name}`}
                                    </span>
                                ))}

                            {this.visibleUsersTypes.length < activity.userTypes.length && <span>{' and more...'}</span>}

                            {this.showAllUsersTypesToggleButton && (
                                <Button
                                    onClick={this.handleAllUserTypesToggle}
                                    className={s.showAllUserTypesButton}
                                    label={{
                                        color: this.showAllUsersTypes ? 'orange' : 'blue',
                                        text: this.showAllUsersTypes ? 'Show less user types' : 'Show all user types',
                                    }}
                                />
                            )}
                        </Paragraph>
                    </TableCell>
                </TableRow>

                <TableRow type="border">
                    <TableCell colSpan={7} />
                </TableRow>
            </React.Fragment>
        );
    }

    private handleAllUserTypesToggle = () => {
        this.showAllUsersTypes = !this.showAllUsersTypes;
    };
}
