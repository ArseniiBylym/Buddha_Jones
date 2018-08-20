import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Section, Row, Col } from 'components/Section';
import { ButtonEdit } from 'components/Button';
import { CommentForm } from 'components/Buddha';
import { ProjectsActions } from 'actions';

// Props
interface ProjectBoardDescriptionProps {
    userCanView: boolean;
    userCanEdit: boolean;
    note: string | null;
    projectId: number;
}

// Component
@observer
export class ProjectBoardDescription extends React.Component<ProjectBoardDescriptionProps, {}> {
    @observable private isInEditMode: boolean = false;
    @observable private editedNote: string = '';
    @observable private saveStatus: 'default' | 'saving' | 'success' | 'error' = 'default';

    constructor(props: ProjectBoardDescriptionProps) {
        super(props);
    }

    public render() {
        return this.props.userCanView ? (
            <Section
                title="Description"
                noSeparator={true}
                headerElements={
                    this.props.userCanEdit
                        ? [
                              {
                                  key: 'edit-note-button',
                                  element: (
                                      <ButtonEdit
                                          float="right"
                                          onClick={this.handleProjectDescriptionEditModeToggle}
                                          label={this.isInEditMode ? 'Cancel edit' : 'Edit project description'}
                                      />
                                  ),
                              },
                          ]
                        : []
                }
            >
                <Row>
                    <Col size={12}>
                        <CommentForm
                            onChange={this.handleNotesChange}
                            onSubmit={this.handleNotesSubmit}
                            value={this.isInEditMode ? this.editedNote : this.props.note || ''}
                            placeholder="Details regarding requested work..."
                            viewOnlyEmptyValueText="Project has no details."
                            viewOnly={this.isInEditMode === false}
                            status={this.saveStatus}
                            label="Save note"
                            labelSaving="Saving note"
                            labelSuccess="Saved note"
                            labelError="Could not save note, try again"
                        />
                    </Col>
                </Row>
            </Section>
        ) : null;
    }

    private handleProjectDescriptionEditModeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.toggleEditMode();
    };

    @action
    private handleNotesChange = (value: string) => {
        this.editedNote = value;
    };

    private handleNotesSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.saveNote();
    };

    @action
    private toggleEditMode = () => {
        if (this.isInEditMode) {
            this.saveStatus = 'default';
            this.editedNote = '';
            this.isInEditMode = false;
        } else {
            this.editedNote = this.props.note || '';
            this.isInEditMode = true;
        }
    };

    @action
    private saveNote = async (): Promise<boolean> => {
        try {
            this.saveStatus = 'saving';

            await ProjectsActions.updateProjectNote(this.props.projectId, this.editedNote);
            this.isInEditMode = false;
            this.editedNote = '';

            this.saveStatus = 'success';

            setTimeout(() => {
                if (this.saveStatus === 'success') {
                    this.saveStatus = 'default';
                }
            }, 2048);

            return true;
        } catch (error) {
            this.saveStatus = 'error';
            throw error;
        }
    };
}
