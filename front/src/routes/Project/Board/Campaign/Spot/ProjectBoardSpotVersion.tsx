import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { VersionStatus } from 'types/projectDetails';
import { ProjectsDetailsActions } from 'actions';
import { Tooltip, Tag } from 'components/Content';

// Styles
const s = require('./ProjectBoardSpot.css');

// Props
interface ProjectBoardSpotVersionProps {
    isEditFormVisible: boolean;
    projectId: number;
    projectCampaignId: number;
    spotId: number;
    id: number;
    name: string;
    note: string | null;
    status: VersionStatus | null;
    userCanEdit?: any;
}

// Component
@observer
export class ProjectBoardSpotVersion extends React.Component<ProjectBoardSpotVersionProps, {}> {
    public render() {
        return (
            <Tooltip text={this.props.note ? this.props.note : ''}>
                <Tag
                    onTagClick={this.props.userCanEdit ? this.handleVersionEdit : undefined}
                    onEditButtonClick={this.props.userCanEdit ? this.handleVersionEdit : undefined}
                    className={classNames(s.versionName)}
                    showInfoIcon={this.props.note ? true : false}
                    isBig={true}
                    title={this.props.name}
                    isTitleBold={true}
                    otherLabels={
                        this.props.status
                            ? [
                                  {
                                      text: this.props.status.name,
                                  },
                              ]
                            : []
                    }
                />
            </Tooltip>
        );
    }

    private handleVersionEdit = async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        ProjectsDetailsActions.openVersionEditModal({
            projectId: this.props.projectId,
            projectCampaignId: this.props.projectCampaignId,
            spotId: this.props.spotId,
            versionId: this.props.id,
            versionName: this.props.name,
            versionStatus: this.props.status,
            versionNote: this.props.note,
        });
    };
}
