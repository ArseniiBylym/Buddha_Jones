import * as React from 'react';
import * as classNames from 'classnames';
import * as dateFormat from 'date-fns/format';
import { observer } from 'mobx-react';
import { formatMoney } from 'accounting';
import { CampaignDetails } from 'types/projectDetails';
import { Section, Row, Col, ClearFix } from 'components/Section';
import { ButtonClose, ButtonEdit, ButtonSave } from 'components/Button';
import { observable, action } from 'mobx';
import { Paragraph } from 'components/Content';
import { DatePicker } from 'components/Calendar';
import { Counter, Input } from 'components/Form';
import { ProjectsDetailsActions } from 'actions';

// Styles
const s = require('./ProjectBoardCampaignMisc.css');

// Props
interface ProjectBoardCampaignMiscProps {
    userCanViewBudget: boolean;
    userCanEditBudget: boolean;
    userCanViewMaterialsDate: boolean;
    userCanEditMaterialsDate: boolean;
    projectId: number;
    campaign: CampaignDetails;
}

// Component
@observer
export class ProjectBoardCampaignMisc extends React.Component<ProjectBoardCampaignMiscProps, {}> {
    @observable private isInEditMode: boolean = false;
    @observable private budget: number | null = null;
    @observable private budgetNotes: string = '';
    @observable private budgetModified: boolean = false;
    @observable private graphicsNotes: string = '';
    @observable private graphicsModified: boolean = false;
    @observable private dateMaterialsWillBeReceived: Date | null = null;
    @observable private dateMaterialsWillBeReceivedModifed: boolean = false;
    @observable private status: 'default' | 'saving' | 'success' | 'error' = 'default';

    public render() {
        return this.props.userCanViewBudget || this.props.userCanViewMaterialsDate ? (
            <div className={classNames(s.miscContainer, { [s.editing]: this.isInEditMode })}>
                <Section
                    title="Details"
                    noSeparator={true}
                    headerElements={
                        this.props.userCanEditBudget || this.props.userCanEditMaterialsDate
                            ? [
                                  {
                                      key: 'edit-note-button',
                                      element: (
                                          <>
                                              {this.isInEditMode &&
                                                  <ButtonClose
                                                      float="right"
                                                      onClick={this.handleEditingToggle}
                                                      label={'Cancel'}
                                                  />
                                              }
                                              {!this.isInEditMode &&
                                                  <ButtonEdit
                                                      float="right"
                                                      onClick={this.handleEditingToggle}
                                                      label={'Edit details'}
                                                  />
                                              }
                                          </>
                                      ),
                                  },
                              ]
                            : []
                    }
                >
                    {(this.isInEditMode && (
                        <Row className={s.editForm}>
                            <Col size={12}>
                                {this.props.userCanEditBudget && (
                                    <Counter
                                        onChange={this.handleBudgetChange}
                                        fieldMaxWidth={128}
                                        label="Campaign budget"
                                        value={this.budget || 0}
                                        minValue={0}
                                        multipleOf={0.01}
                                        decimals={2}
                                        showPlusMinus={false}
                                        showAddedTextOnInput={true}
                                        readOnlyTextBeforeValue="$"
                                    />
                                )}

                                {this.props.userCanEditBudget && (
                                    <div className={s.budgetNotesWrapper}>
                                        <Paragraph>Campaign budget notes</Paragraph>
                                        <Input
                                            maxWidth={1152}
                                            onChange={this.handleBudgetNotesChange}
                                            value={this.budgetNotes}
                                            label={this.budgetNotes ? '' : 'No budget notes'}
                                        />
                                    </div>
                                )}

                                {this.props.userCanEditBudget && (
                                    <div className={s.budgetNotesWrapper}>
                                        <Paragraph>Graphics budget notes</Paragraph>
                                        <Input
                                            maxWidth={1152}
                                            onChange={this.handleGraphicsNotesChange}
                                            value={this.graphicsNotes}
                                            label={this.graphicsNotes ? '' : 'No graphics notes'}
                                        />
                                    </div>
                                )}

                                {this.props.userCanEditMaterialsDate && (
                                    <div className={s.dateMaterialsWillBeReceivedWrapper}>
                                        <DatePicker
                                            onChange={this.handleMaterialsDateChange}
                                            label="Date materials will be received"
                                            value={this.dateMaterialsWillBeReceived}
                                            noValueText="No date defined"
                                        />
                                    </div>
                                )}

                                <ButtonSave
                                    onClick={this.handleSaveChanges}
                                    float="right"
                                    label={
                                        this.status === 'error' ? 'Could not save, please try again' : 'Save details'
                                    }
                                    labelColor={this.status === 'error' ? 'orange' : 'blue'}
                                    savingLabel="Saving"
                                    isSaving={this.status === 'saving'}
                                />

                                <ClearFix />
                            </Col>
                        </Row>
                    )) || (
                        <Row className={s.valuesRow}>
                            <Col>
                                {this.props.userCanViewBudget && (
                                    <Paragraph>
                                        <span>Campaign budget: </span>
                                        {(this.props.campaign.budget !== null && (
                                            <strong>{formatMoney(this.props.campaign.budget, '$', 2, ',', '.')}</strong>
                                        )) || <em>no budget defined.</em>}
                                    </Paragraph>
                                )}

                                {this.props.userCanViewBudget &&
                                    this.props.campaign.budgetNotes && (
                                        <Paragraph>
                                            <span>Campaign budget notes: </span>
                                            {this.props.campaign.budgetNotes}
                                        </Paragraph>
                                    )}

                                {this.props.userCanViewBudget &&
                                    this.props.campaign.graphicsBudgetNote && (
                                        <Paragraph>
                                            <span>Graphics budget notes: </span>
                                            {this.props.campaign.graphicsBudgetNote}
                                        </Paragraph>
                                )}

                                {this.props.userCanViewMaterialsDate && (
                                    <Paragraph>
                                        <span>Date materials will be received: </span>
                                        {(this.props.campaign.dateMaterialsWillBeReceived !== null && (
                                            <strong>
                                                {dateFormat(
                                                    this.props.campaign.dateMaterialsWillBeReceived,
                                                    'MM/DD/YYYY'
                                                )}
                                            </strong>
                                        )) || <em>no date defined.</em>}
                                    </Paragraph>
                                )}
                            </Col>
                        </Row>
                    )}
                </Section>
            </div>
        ) : null;
    }

    @action
    private handleEditingToggle = () => {
        if (!this.isInEditMode) {
            this.budget = this.props.campaign.budget;
            this.budgetNotes = this.props.campaign.budgetNotes || '';
            this.dateMaterialsWillBeReceived = this.props.campaign.dateMaterialsWillBeReceived;
            this.status = 'default';
        }

        this.isInEditMode = !this.isInEditMode;
    };

    @action
    private handleBudgetChange = (count: { value: number; text: string }) => {
        this.budget = count.value;
        this.budgetModified = true;
    };

    @action
    private handleBudgetNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.budgetNotes = e.target.value;
        this.budgetModified = true;
    };

    @action
    private handleGraphicsNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.graphicsNotes = e.target.value;
        this.graphicsModified = true;
    };

    @action
    private handleMaterialsDateChange = (date: Date | null) => {
        this.dateMaterialsWillBeReceived = date;
        this.dateMaterialsWillBeReceivedModifed = true;
    };

    @action
    private handleSaveChanges = async () => {
        try {
            this.status = 'saving';

            if (this.budgetModified && this.props.userCanEditBudget) {
                await ProjectsDetailsActions.changeProjectCampaignBudget(
                    this.props.projectId,
                    this.props.campaign.projectCampaignId,
                    this.budget,
                    this.budgetNotes || null
                );
            }

            if (this.graphicsModified && this.props.userCanEditBudget) {
                await ProjectsDetailsActions.changeProjectCampaignGraphicsBudget(
                    this.props.projectId,
                    this.props.campaign.projectCampaignId,
                    this.graphicsNotes || null
                );
            }

            if (this.dateMaterialsWillBeReceivedModifed && this.props.userCanEditMaterialsDate) {
                await ProjectsDetailsActions.changeProjectCampaignDateMaterialsWillBeReceived(
                    this.props.projectId,
                    this.props.campaign.projectCampaignId,
                    this.dateMaterialsWillBeReceived
                );
            }

            this.status = 'success';
            this.isInEditMode = false;
        } catch (error) {
            this.status = 'error';
            throw error;
        }
    };
}
