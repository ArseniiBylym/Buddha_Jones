import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { Section, Row, Col } from 'components/Section';
import { ButtonClose, ButtonEdit } from 'components/Button';
import { CommentForm } from 'components/Buddha';
import { ProjectsDetailsActions } from 'actions';

// Styles
const s = require('./ProjectBoardCampaignDescription.css');

// Props
interface ProjectBoardCampaignDescriptionProps {
    userCanView: boolean;
    userCanEdit: boolean;
    projectId: number;
    campaignId: number;
    projectCampaignId: number;
    notes: string;
}

// Component
@observer
export class ProjectBoardCampaignDescription extends React.Component<ProjectBoardCampaignDescriptionProps, {}> {
    @observable private isInEditMode: boolean = false;
    @observable private notes: string = '';
    @observable private saveStatus: 'default' | 'saving' | 'success' | 'error' = 'default';

    public render() {
        return this.props.userCanView ? (
            <div
                className={classNames(s.descriptionContainer, {
                    [s.editing]: this.isInEditMode,
                })}
            >
                <Section
                    title="Description"
                    noSeparator={true}
                    headerElements={
                        this.props.userCanEdit
                            ? [
                                  {
                                      key: 'edit-note-button',
                                      element: (
                                          <>
                                              {this.isInEditMode &&
                                                  <ButtonClose
                                                      float="right"
                                                      onClick={this.handleCampaignDescriptionToggle}
                                                      label={'Cancel'}
                                                  />
                                              }
                                              {!this.isInEditMode &&
                                                  <ButtonEdit
                                                      float="right"
                                                      onClick={this.handleCampaignDescriptionToggle}
                                                      label={'Edit campaign description'}
                                                  />
                                              }
                                          </>
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
                                value={this.isInEditMode ? this.notes : this.props.notes || ''}
                                placeholder="Campaign description..."
                                viewOnlyEmptyValueText="Campaign has no description."
                                viewOnly={this.isInEditMode === false}
                                removeTopMargin={true}
                                status={this.saveStatus}
                                label="Save description"
                                labelSaving="Saving description"
                                labelSuccess="Saved description"
                                labelError="Could not save description, try again"
                            />
                        </Col>
                    </Row>
                </Section>
            </div>
        ) : null;
    }

    @action
    private handleCampaignDescriptionToggle = () => {
        if (!this.isInEditMode === true) {
            this.notes = this.props.notes;
        }

        this.isInEditMode = !this.isInEditMode;
        this.saveStatus = 'default';
    };

    @action
    private handleNotesChange = (value: string) => {
        this.notes = value;
    };

    @action
    private handleNotesSubmit = async () => {
        try {
            this.saveStatus = 'saving';

            await ProjectsDetailsActions.changeProjectCampaignDescription(
                this.props.projectId,
                this.props.projectCampaignId,
                this.notes
            );

            this.saveStatus = 'success';
            this.isInEditMode = false;
        } catch (error) {
            this.saveStatus = 'error';
            throw error;
        }
    };
}
