import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectBoardActions from './../../../actions/ProjectBoard';
import { capitalize as _capitalize } from 'lodash';
import AnimateHeight from 'react-animate-height';
import { Section } from './../../../components/Section';
import { Toggle, TextArea } from './../../../components/Form';
import { ButtonEdit, ButtonSave } from './../../../components/Button';
import { statuses } from './../../../helpers/status';

// Styles
const s = require('./WritingAndMusicTeams.css');

// Props
const propTypes = {
    projectId: PropTypes.number.isRequired,
    campaignId: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['music', 'writing']).isRequired,
    toggle: PropTypes.bool.isRequired,
    notes: PropTypes.string.isRequired,
};

// Defaults
const defaultProps = {
    type: 'writing',
    toggle: false,
    notes: '',
};

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actionsProjectBoard: bindActionCreators(projectBoardActions, dispatch)
    };
};

// Component
class WritingAndMusicTeams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saving: statuses.default,
            editing: false,
            toggle: this.props.toggle,
            notes: this.props.notes,
        };

        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    render() {
        const { type } = this.props;
        const { editing } = this.state;

        return (
            <Section
                noSeparator={true}
                title={'Request ' + (type === 'music' ? 'music' : 'writing') + ' team'}
                headerElements={[{
                    element:
                        <ButtonEdit
                            onClick={e => this.handleEditToggle()}
                            label={editing ? 'Cancel' : 'Edit request'}
                        />
                }]}
            >
                {editing ? this.renderEditable() : this.renderViewable()}
            </Section>
        );
    }

    renderViewable() {
        const { toggle, notes, type } = this.props;

        return (
            <div className={s.view}>

                <h5>
                    {(toggle) && (
                        <strong>{`${_capitalize(type)} team has been requested`}</strong>
                    ) || (
                        <span>{`No ${type} team requested`}</span>
                    )}
                </h5>

                <p>
                    <span>{notes !== null && notes !== '' ? 'Notes: ' : 'No details defined.'}</span>
                    {notes !== null && notes !== '' ? notes : null}
                </p>

            </div>
        );
    }

    renderEditable() {
        const { type } = this.props;
        const { toggle, notes, saving } = this.state;

        return (
            <div>

                <Toggle
                    align="left"
                    isRight={toggle}
                    left={{ label: 'No', value: false }}
                    right={{ label: 'Yes', value: true }}
                    onChange={e => this.handleTogglingRequest(e)}
                />

                <AnimateHeight duration={300} height={toggle ? 'auto' : 0}>
                    <TextArea
                        className={s.textarea}
                        width={512}
                        height={96}
                        value={notes}
                        label={`${_capitalize(type)} team notes...`}
                        onChange={e => this.handleChangingNote(e)}
                    />
                </AnimateHeight>

                <ButtonSave
                    onClick={e => this.handleSavingChanges()}
                    float="right"
                    saving={saving === statuses.saving || saving === statuses.success}
                    label={
                        saving === statuses.default
                            ? 'Save changes'
                            : saving === statuses.saving
                                ? 'Saving changes'
                                : saving === statuses.error
                                    ? 'Could not save, try again'
                                    : saving === statuses.success
                                        ? 'Saved changes'
                                        : null
                    }
                    labelColor={
                        saving === statuses.default
                            ? 'blue'
                            : saving === statuses.success
                                ? 'green'
                                : saving === statuses.error
                                    ? 'orange'
                                    : 'black'
                    }
                />

            </div>
        );
    }

    handleEditToggle() {
        this.setState({
            editing: !this.state.editing
        });
    }

    handleTogglingRequest(bool) {
        this.setState({
            toggle: bool
        });
    }

    handleChangingNote(e) {
        this.setState({
            notes: e.target.value
        });
    }

    handleSavingChanges() {
        this.setState({
            saving: statuses.saving
        });

        // TODO
        this.props.actionsProjectBoard.toggleCampaignsWritingOrMusicTeamRequest(
            this.props.projectId,
            this.props.campaignId,
            this.props.type,
            this.state.toggle,
            this.state.notes
        ).then(() => {
            this.setState({
                saving: statuses.success
            });

            setTimeout(() => {
                if (this.componentIsMounted && this.state.saving === statuses.success) {
                    this.setState({
                        saving: statuses.default,
                        editing: false
                    });
                }
            }, 1024);
        }).catch((error) => {
            this.setState({
                saving: statuses.error
            });
        });
    }
};

WritingAndMusicTeams.propTypes = propTypes;
WritingAndMusicTeams.defaultProps = defaultProps;

export default connect(null, mapDispatchToProps)(WritingAndMusicTeams);
