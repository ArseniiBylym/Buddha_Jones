import * as React from 'react';
import PropTypes from 'prop-types';
import { Section, Row, Col } from './../../../components/Section';
import { CommentForm } from './../../../components/Buddha';
import { ButtonEdit } from './../../../components/Button';
import { statuses } from './../../../helpers/status';

const propTypes = {
    type: PropTypes.oneOf(['description', 'budget']),
    onSave: PropTypes.func,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    emptyValueLabel: PropTypes.string,
    editLabel: PropTypes.string,
    cancelEditLabel: PropTypes.string,
    value: PropTypes.string,
    status: PropTypes.oneOf(['Default', 'Saving', 'Success', 'Error']),
};

const defaultProps = {
    type: 'description',
    onSave: null,
    title: 'Description',
    placeholder: 'Details...',
    emptyValueLabel: 'No details',
    editLabel: 'Edit',
    cancelEditLabel: 'Cancel edit',
    value: '',
    status: statuses.default,
};

class CampaignDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editable: false,
            savedValue: '',
        };
    }

    render() {
        return (
            <Section
                title={this.props.title}
                noSeparator={true}
                headerElements={[
                    {
                        key: 'edit-note-button',
                        element: (
                            <ButtonEdit
                                onClick={e => this.handleNotesEditableToggle(e)}
                                label={this.state.editable ? this.props.cancelEditLabel : this.props.editLabel}
                                float="right"
                            />
                        ),
                    },
                ]}
            >
                {(this.props.type === 'description' && (
                    <Row>
                        <Col size={9}>{this.renderCommentForm()}</Col>
                        <Col size={3}>{this.props.children}</Col>
                    </Row>
                )) ||
                    this.renderCommentForm()}
            </Section>
        );
    }

    renderCommentForm() {
        return (
            <CommentForm
                onChange={e => this.handleNotesChange(e)}
                onSubmit={e => this.handleNotesSubmit(e)}
                value={this.state.editable ? this.state.savedValue : this.props.value || ''}
                placeholder={this.props.placeholder}
                viewOnlyEmptyValueText={this.props.emptyValueLabel}
                viewOnly={this.state.editable === false}
                status={this.props.status}
                label="Save note"
                labelSaving="Saving note"
                labelSuccess="Saved note"
                labelError="Could not save note, try again"
            />
        );
    }

    handleNotesEditableToggle(e) {
        if (this.state.editable) {
            this.setState({
                savedValue: '',
                editable: false,
            });
        } else {
            this.setState({
                savedValue: this.props.value || '',
                editable: true,
            });
        }
    }

    handleNotesChange(e) {
        this.setState({
            savedValue: e.target.value,
        });
    }

    handleNotesSubmit(e) {
        if (this.props.onSave) {
            this.props.onSave(this.state.savedValue);

            this.setState({
                savedValue: '',
                editable: false,
            });
        }
    }
}

CampaignDescription.propTypes = propTypes;
CampaignDescription.defaultProps = defaultProps;

export default CampaignDescription;
