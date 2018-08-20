import * as React from 'react';
import * as classNames from 'classnames';
import { observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import capitalize from 'lodash-es/capitalize';
import AnimateHeight from 'react-animate-height';
import { Section } from 'components/Section';
import { ButtonEdit, ButtonSave } from 'components/Button';
import { TextArea, Toggle, ToggleSideContent } from 'components/Form';
import { AppOnlyStoreState } from 'store/AllStores';
import { ProjectsDetailsActions } from 'actions';

// Styles
const s = require('./ProjectBoardCampaignWritingOrMusicTeamContent.css');

// Types
export type ProjectBoardCampaignWritingOrMusicTeamTypeProp = 'music' | 'writing';

// Props
interface ProjectBoardCampaignWritingOrMusicTeamContentProps {
    userCanEdit: boolean;
    projectId: number;
    projectCampaignId: number;
    campaignId: number;
    type: ProjectBoardCampaignWritingOrMusicTeamTypeProp;
}

// Component
@inject('store')
@observer
export class ProjectBoardCampaignWritingOrMusicTeamContent extends React.Component<
    ProjectBoardCampaignWritingOrMusicTeamContentProps & AppOnlyStoreState,
    {}
> {
    @observable private isEditing: boolean = false;
    @observable
    private form = {
        notes: '',
        toggle: false,
    };
    @observable private status: 'none' | 'saving' | 'success' | 'error' = 'none';

    @computed
    private get projectCampaignState(): {
        toggle: boolean;
        notes: string | null;
    } {
        if (!this.props.store) {
            return {
                toggle: false,
                notes: null,
            };
        }

        const { projectsDetails } = this.props.store;

        const projectIndex = projectsDetails.fetchedProjectsIdsFlat.indexOf(this.props.projectId);
        if (projectIndex !== -1) {
            const campaign = projectsDetails.fetchedProjects[projectIndex].campaigns.find(
                c => c.projectCampaignId === this.props.projectCampaignId
            );

            if (typeof campaign !== 'undefined') {
                return this.props.type === 'music'
                    ? {
                          toggle: campaign.musicTeam,
                          notes: campaign.musicTeamNotes,
                      }
                    : this.props.type === 'writing'
                        ? {
                              toggle: campaign.writingTeam,
                              notes: campaign.writingTeamNotes,
                          }
                        : {
                              toggle: false,
                              notes: null,
                          };
            }
        }

        return {
            toggle: false,
            notes: null,
        };
    }

    @computed
    private get toggle(): boolean {
        return this.isEditing ? this.form.toggle : this.projectCampaignState.toggle;
    }

    @computed
    private get notes(): string {
        return this.isEditing ? this.form.notes : this.projectCampaignState.notes || '';
    }

    public render() {
        return (
            <Section
                className={classNames(s.section, {
                    [s.editing]: this.isEditing,
                })}
                noSeparator={true}
                title={this.props.type === 'music' ? 'Music' : 'Writing'}
                headerElements={
                    this.props.userCanEdit
                        ? [
                              {
                                  element: (
                                      <ButtonEdit
                                          onClick={this.handleEditToggle}
                                          label={this.isEditing ? 'Cancel' : 'Edit request'}
                                      />
                                  ),
                              },
                          ]
                        : []
                }
            >
                {this.isEditing ? this.renderEditable() : this.renderViewable()}
            </Section>
        );
    }

    private renderViewable() {
        return (
            <div className={s.view}>
                <h5>
                    {(this.toggle && <strong>{`${capitalize(this.props.type)} team has been requested`}</strong>) || (
                        <span>{`No ${this.props.type} team requested`}</span>
                    )}
                </h5>

                <p>
                    <span>
                        {this.toggle && this.notes !== null && this.notes !== '' ? 'Notes: ' : 'No details defined.'}
                    </span>
                    {this.toggle && this.notes !== null && this.notes !== '' ? this.notes : null}
                </p>
            </div>
        );
    }

    private renderEditable() {
        return (
            <div>
                <Toggle
                    onChange={this.handleTogglingRequest}
                    toggleIsSetToRight={this.toggle}
                    toggleOnLeft={{ label: 'No', value: false }}
                    toggleOnRight={{ label: 'Yes', value: true }}
                    align="left"
                />

                <AnimateHeight duration={300} height={this.toggle ? 'auto' : 0}>
                    <TextArea
                        className={s.textarea}
                        width={512}
                        height={96}
                        value={this.notes}
                        label={`${capitalize(this.props.type)} team notes...`}
                        onChange={this.handleChangingNote}
                    />
                </AnimateHeight>

                <div className={s.summary}>
                    <ButtonSave
                        onClick={this.handleSavingChanges}
                        isSaving={this.status === 'saving' || this.status === 'success'}
                        label={
                            this.status === 'none'
                                ? 'Save changes'
                                : this.status === 'saving'
                                    ? 'Saving changes'
                                    : this.status === 'error'
                                        ? 'Could not save, try again'
                                        : this.status === 'success'
                                            ? 'Saved changes'
                                            : null
                        }
                        labelColor={
                            this.status === 'none'
                                ? 'blue'
                                : this.status === 'success'
                                    ? 'green'
                                    : this.status === 'error'
                                        ? 'orange'
                                        : 'black'
                        }
                    />
                </div>
            </div>
        );
    }

    private handleEditToggle = () => {
        const startEditing = this.isEditing === false;

        this.isEditing = !this.isEditing;

        if (startEditing) {
            this.form.notes = this.projectCampaignState.notes || '';
            this.form.toggle = this.projectCampaignState.toggle || false;
        }
    };

    private handleTogglingRequest = (isSetToRight: boolean, selectedSideContent: ToggleSideContent) => {
        this.form.toggle = isSetToRight;
    };

    private handleChangingNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.form.notes = e.target.value;
    };

    private handleSavingChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            this.status = 'saving';

            await ProjectsDetailsActions.changeWritingOrMusicProjectCampaignRequest(
                this.props.type,
                this.props.projectId,
                this.props.projectCampaignId,
                this.form.toggle,
                this.form.notes
            );

            this.status = 'success';
            this.isEditing = false;

            setTimeout(() => {
                this.status = 'none';
            }, 2048);
        } catch (error) {
            this.status = 'error';
            throw error;
        }
    };
}
