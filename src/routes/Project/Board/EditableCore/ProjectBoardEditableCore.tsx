import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { HeaderSection, Row, Col } from 'components/Section';
import { Input } from 'components/Form';
import { ButtonSave } from 'components/Button';
import { DatePicker } from 'components/Calendar';
import { NotificationsActions, ProjectsDetailsActions } from 'actions';
import { Paragraph } from 'components/Content';

// Styles
const s = require('./ProjectBoardEditableCore.css');

// Props
interface ProjectBoardEditableCoreProps {
    onEditingEnd: () => void;
    editing: boolean;
    userCanEditProjectName: boolean;
    userCanEditProjectCodeName: boolean;
    userCanEditProjectReleaseDate: boolean;
    projectId: number;
    projectName: string | null;
    projectCodeName: string | null;
    projectReleaseDate: Date | null;
}

// Component
@observer
export class ProjectBoardEditableCore extends React.Component<ProjectBoardEditableCoreProps, {}> {
    private retriesCount: number = 0;

    @observable private wereChangesMade: boolean = false;
    @observable private projectName: string = '';
    @observable private projectCodeName: string = '';
    @observable private projectReleaseDate: Date | null = null;
    @observable private status: 'default' | 'saving' | 'success' | 'error' = 'default';

    public componentDidMount() {
        if (this.props.editing) {
            this.copyPropsToState(this.props);
        }
    }

    public componentWillReceiveProps(nextProps: ProjectBoardEditableCoreProps) {
        if (this.props.editing !== nextProps.editing && nextProps.editing) {
            this.wereChangesMade = false;
            this.retriesCount = 0;
            this.status = 'default';
            this.copyPropsToState(nextProps);
        }
    }

    public render() {
        return (this.props.userCanEditProjectName ||
            this.props.userCanEditProjectCodeName ||
            this.props.userCanEditProjectReleaseDate) &&
            this.props.editing ? (
            <HeaderSection>
                <form onSubmit={this.handleFormSubmit}>
                    <Row className={s.fieldsRow}>
                        {this.props.userCanEditProjectName && (
                            <Col
                                size={
                                    this.props.userCanEditProjectName &&
                                    this.props.userCanEditProjectCodeName &&
                                    this.props.userCanEditProjectReleaseDate
                                        ? 4
                                        : this.props.projectCodeName || this.props.userCanEditProjectReleaseDate
                                            ? 6
                                            : 12
                                }
                            >
                                <Paragraph>Project name</Paragraph>
                                <Input
                                    onChange={this.handleProjectNameOrCodeNameChange('name')}
                                    value={this.projectName}
                                    label=""
                                />
                            </Col>
                        )}

                        {this.props.userCanEditProjectCodeName && (
                            <Col
                                size={
                                    this.props.userCanEditProjectName &&
                                    this.props.projectCodeName &&
                                    this.props.userCanEditProjectReleaseDate
                                        ? 4
                                        : this.props.userCanEditProjectName || this.props.userCanEditProjectReleaseDate
                                            ? 6
                                            : 12
                                }
                            >
                                <Paragraph>Project code name</Paragraph>
                                <Input
                                    onChange={this.handleProjectNameOrCodeNameChange('code')}
                                    value={this.projectCodeName}
                                    label=""
                                />
                            </Col>
                        )}

                        {this.props.userCanEditProjectReleaseDate && (
                            <Col
                                size={
                                    this.props.userCanEditProjectName &&
                                    this.props.userCanEditProjectCodeName &&
                                    this.props.userCanEditProjectReleaseDate
                                        ? 4
                                        : this.props.userCanEditProjectName || this.props.projectCodeName
                                            ? 6
                                            : 12
                                }
                            >
                                <Paragraph>Project release date</Paragraph>
                                <DatePicker
                                    onChange={this.handleProjectReleaseDateChange}
                                    type="field"
                                    value={this.projectReleaseDate}
                                    noValueText="Unknown"
                                    label=""
                                />
                            </Col>
                        )}
                    </Row>
                    <Row className={s.saveRow}>
                        <Col size={12}>
                            <ButtonSave
                                onClick={this.handleProjectChangesSubmit}
                                float="right"
                                label={
                                    this.status === 'error'
                                        ? 'Could not save changes, try again'
                                        : this.wereChangesMade === false
                                            ? 'Close'
                                            : 'Save changes'
                                }
                                labelColor={this.status === 'error' ? 'yellow' : 'white'}
                                iconBackground="blue"
                                savingLabel="Saving changes"
                                isSaving={this.status === 'saving'}
                            />
                        </Col>
                    </Row>
                </form>
            </HeaderSection>
        ) : null;
    }

    private handleProjectNameOrCodeNameChange = (type: 'name' | 'code') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (type === 'code') {
            this.projectCodeName = value;
        } else {
            this.projectName = value;
        }
        this.wereChangesMade = true;
    };

    private handleProjectReleaseDateChange = (date: Date | null) => {
        this.projectReleaseDate = date;
        this.wereChangesMade = true;
    };

    @action
    private handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    @action
    private handleProjectChangesSubmit = async (): Promise<boolean> => {
        try {
            if (this.wereChangesMade === false) {
                this.props.onEditingEnd();
                return true;
            }

            if (this.projectName.trim() === '' && this.projectCodeName.trim() === '') {
                NotificationsActions.AlertUser('Project requires name or code name', null, 15);
                return false;
            }

            this.status = 'saving';

            await ProjectsDetailsActions.changeProjectCoreDetails(this.props.projectId, {
                ...(this.props.userCanEditProjectName
                    ? {
                          name: this.projectName,
                      }
                    : {}),
                ...(this.props.userCanEditProjectCodeName
                    ? {
                          codeName: this.projectCodeName,
                      }
                    : {}),
                ...(this.props.userCanEditProjectReleaseDate
                    ? {
                          releaseDate: this.projectReleaseDate,
                      }
                    : {}),
            });

            this.props.onEditingEnd();

            return true;
        } catch (error) {
            if (this.retriesCount > 5) {
                this.status = 'error';
                this.retriesCount = 0;
                throw error;
            } else {
                setTimeout(() => {
                    this.retriesCount++;
                    this.handleProjectChangesSubmit();
                }, 768);
                return false;
            }
        }
    };

    private copyPropsToState = (props: ProjectBoardEditableCoreProps) => {
        this.projectName = props.projectName || '';
        this.projectCodeName = props.projectCodeName || '';
        this.projectReleaseDate = props.projectReleaseDate || null;
    };
}
