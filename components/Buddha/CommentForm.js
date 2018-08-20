import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { isNil as _isNil } from 'lodash';
import { Button } from './../Button';
import { TextArea } from './../Form';
import { Paragraph } from './../Content';
import { LoadingShade, LoadingSpinner, LoadingIndicator } from './../Loaders';

// Selectors
import { getButton } from './CommentFormSelectors';

// Styles
const s = require('./CommentForm.css');
import { IconChatBubbleWhiteIcon } from './../Icons';
import { statuses } from '../../helpers/status';

// Props
const propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    viewOnly: PropTypes.bool,
    viewOnlyEmptyValueText: PropTypes.string,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    description: PropTypes.string,
    descriptionIsDim: PropTypes.bool,
    textareaMinHeight: PropTypes.number,
    status: PropTypes.oneOf(['default', 'saving', 'success', 'error']),
    label: PropTypes.string.isRequired,
    labelSaving: PropTypes.string,
    labelSuccess: PropTypes.string,
    labelError: PropTypes.string,
    loading: PropTypes.bool,
};

// Defaults
const defaultProps = {
    onChange: null,
    onSubmit: null,
    viewOnly: false,
    viewOnlyEmptyValueText: '',
    value: '',
    placeholder: null,
    description: null,
    descriptionIsDim: false,
    textareaMinHeight: 80,
    status: 'default',
    label: 'Save',
    labelSaving: 'Saving',
    labelSuccess: 'Saved',
    labelError: 'Could not save, try again',
    loading: false,
};

// Deriviations
const mapStateToProps = (state, ownProps) => {
    return {
        button: getButton(ownProps),
    };
};

// Component
class CommentFormComponent extends React.Component {
    render() {
        return (
            <div className={s.comments}>
                <div className={s.commentForm}>
                    {(this.props.viewOnly && (
                        <Paragraph>{this.props.value || this.props.viewOnlyEmptyValueText}</Paragraph>
                    )) || (
                        <TextArea
                            onChange={e => this.handleCommentChange(e)}
                            value={this.props.value}
                            label={!_isNil(this.props.placeholder) ? this.props.placeholder : undefined}
                            height={this.props.textareaMinHeight}
                            width={1152}
                        />
                    )}
                </div>

                <div className={s.commentButtonContainer}>
                    {this.props.description && (
                        <Paragraph className={s.commentMessage} type={this.props.descriptionIsDim ? 'dim' : 'default'}>
                            {this.props.description}
                        </Paragraph>
                    )}

                    {(this.props.status === 'saving' && (
                        <LoadingIndicator label={this.props.button.label} labelOnRight={false} isInline={true} />
                    )) ||
                        (!this.props.viewOnly && (
                            <Button
                                onClick={e => this.handleCommentSubmit(e)}
                                label={{
                                    text: this.props.button.label,
                                    color: this.props.button.color,
                                    size: 'small',
                                }}
                                icon={{
                                    background: 'blue',
                                    size: 'small',
                                    element: (
                                        <IconChatBubbleWhiteIcon
                                            width={17}
                                            marginLeft={-8}
                                            height={14}
                                            marginTop={-6}
                                        />
                                    ),
                                }}
                                disabled={
                                    false /*this.props.status !== statuses.defalt && this.props.status !== statuses.success*/
                                }
                            />
                        ))}
                </div>

                {this.props.children}

                {this.props.loading && (
                    <LoadingShade background="rgba(247, 247, 247, 0.9)" contentCentered={true}>
                        <LoadingSpinner size={48} />
                    </LoadingShade>
                )}
            </div>
        );
    }

    handleCommentChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    handleCommentSubmit(e) {
        if (this.props.onSubmit) {
            this.props.onSubmit(e);
        }
    }
}

CommentFormComponent.propsTypes = propTypes;
const CommentForm = connect(mapStateToProps)(CommentFormComponent);
CommentForm.defaultProps = defaultProps;

export default CommentForm;
