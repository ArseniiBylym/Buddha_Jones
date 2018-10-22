import * as React from 'react';
import * as classNames from 'classnames';
import * as dateFormat from 'date-fns/format';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Section, Row, Col } from 'components/Section';
import { ButtonBack, ButtonSend } from 'components/Button';
import { ClientsFilter } from 'components/Buddha';
import { Input, TextArea } from 'components/Form';
import { AppState } from '../../../store/AllStores';
import { HeaderActions, NotificationsActions, ProjectsActions } from 'actions';
import { history } from 'App';
import { ProjectCreateData } from 'types/projectDetails';
import { DatePicker } from 'components/Calendar';

// Styles
const s = require('./ProjectCreate.css');

// Component
@observer
export default class ProjectCreatePage extends React.Component<AppState, {}> {
    @observable private name: string = '';
    @observable private codeName: string = '';
    @observable private studio: { id: number; name: string } | null = null;
    @observable private releaseDate: Date | null = null;
    @observable private notes: string = '';
    @observable private isUploading: boolean = false;
    @observable private uploadRetries: number = 0;

    public componentDidMount() {
        this.loadPageHeader();
    }

    public render() {
        return (
            <div>
                <Section noSeparator={true}>
                    <Row className={s.row}>
                        <Col className={s.size8Col} size={8}>
                            <Input
                                className={s.nameFieldGroup}
                                fieldClassName={s.name}
                                onChange={this.handleProjectNameChange('name')}
                                autoFocus={true}
                                value={this.name}
                                label="Project name"
                                type="text"
                            />
                        </Col>
                        <Col className={s.size4Col} size={4}>
                            <ClientsFilter
                                className={s.client}
                                align="right"
                                type="field"
                                maxWidth={640}
                                clientId={this.studio !== null ? this.studio.id : null}
                                clientName={this.studio !== null ? this.studio.name : null}
                                onChange={this.handleStudioFilterChange}
                                label="Pick studio"
                                allAreAllowed={false}
                                truncuateLabelTo={96}
                                src={'studios'}
                            />
                        </Col>
                    </Row>
                    <Row className={classNames(s.row, s.codeNameAndReleaseDateRow)}>
                        <Col className={s.size8Col} size={8}>
                            <Input
                                className={s.nameFieldGroup}
                                fieldClassName={s.name}
                                onChange={this.handleProjectNameChange('codeName')}
                                value={this.codeName}
                                label="Project code name"
                                type="text"
                            />
                        </Col>
                        <Col className={s.size4Col} size={4}>
                            <DatePicker
                                onChange={this.handleProjectsReleaseDateChange}
                                className={s.releaseDate}
                                align="right"
                                type="field"
                                label="Release date"
                                value={this.releaseDate}
                                noValueText="Unknown"
                            />
                        </Col>
                    </Row>
                    <Row className={classNames(s.row, s.notesRow)}>
                        <Col>
                            <TextArea
                                fieldClassName={s.notes}
                                value={this.notes}
                                onChange={this.handleNotesChange}
                                label="Project notes (optional)"
                                width={1152}
                                height={128}
                            />
                        </Col>
                    </Row>
                    <Row className={s.buttonRow}>
                        <Col>
                            <ButtonSend
                                onClick={this.handleSubmit}
                                label="Create new project"
                                savingLabel="Creating"
                                saving={this.isUploading}
                                float="right"
                            />
                        </Col>
                    </Row>
                </Section>
            </div>
        );
    }

    private handleBackToBoardNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
        history.push('/portal/projects/1');
    };

    @action
    private loadPageHeader = () => {
        HeaderActions.setMainHeaderTitles('Define new project');
        HeaderActions.setMainHeaderElements([
            <ButtonBack key="back" label="Back to projects board" onClick={this.handleBackToBoardNavigation} />,
        ]);
    };

    private handleStudioFilterChange = (studio: { id: number; name: string } | null = null) => {
        this.studio =
            studio !== null
                ? {
                      id: studio.id,
                      name: studio.name,
                  }
                : null;
    };

    private handleProjectsReleaseDateChange = (date: Date | null) => {
        this.releaseDate = date;
    };

    private handleProjectNameChange = (whichName: 'name' | 'codeName') => (e: React.ChangeEvent<HTMLInputElement>) => {
        this[whichName] = e.target.value;
    };

    private handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.notes = e.target.value;
    };

    private handleSubmit = (e?: React.MouseEvent<HTMLButtonElement>) => {
        let projectData: ProjectCreateData = {
            id: 0,
            name: this.name.trim(),
            codeName: this.codeName.trim(),
            studioId: this.studio !== null ? this.studio.id : null,
            studioName: this.studio !== null ? this.studio.name : null,
            releaseDate: this.releaseDate !== null ? dateFormat(this.releaseDate, 'YYYY-MM-DD') : null,
            notes: this.notes.trim(),
        };

        if (projectData.name.length === 0 && projectData.codeName.length === 0) {
            NotificationsActions.AlertUser('Project name or code name is required');
            return;
        }

        if (projectData.studioId === null) {
            NotificationsActions.AlertUser('Project studio is required');
            return;
        }

        this.isUploading = true;

        ProjectsActions.createProject(projectData)
            .then(projectId => {
                // Update project ID returned by the API
                projectData.id = projectId;

                // Stop loading
                this.uploadRetries = 0;
                this.isUploading = false;

                // Change page to project page
                history.push(
                    '/portal/project/' +
                        projectData.studioId +
                        '/' +
                        projectData.studioName +
                        '/' +
                        projectData.id +
                        '/' +
                        projectData.name || projectData.codeName
                );
            })
            .catch(error => {
                if (this.uploadRetries > 5) {
                    this.isUploading = false;
                    this.uploadRetries = 0;
                    NotificationsActions.AlertUser('Could not create the project, please try again');
                } else {
                    setTimeout(() => {
                        this.uploadRetries++;
                        this.handleSubmit();
                    }, 768);
                }
            });
    };
}
