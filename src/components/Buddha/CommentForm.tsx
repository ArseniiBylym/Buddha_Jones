import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { Button, ButtonLabelColorPropType } from '../Button';
import { TextArea, Input } from '../Form';
import { Paragraph } from '../Content';
import { LoadingShade, LoadingSpinner, LoadingIndicator } from '../Loaders';
import { computed } from 'mobx';
import { IconChatBubbleWhiteIcon } from '../Icons';

// Styles
const s = require('./CommentForm.css');

// Types
export type CommentFormStatusProp = 'default' | 'saving' | 'success' | 'error';

// Props
interface CommentFormProps {
    onChangeRaw?: ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | null;
    onChange?: ((value: string) => void) | null;
    onSubmit?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | null;
    viewOnly?: boolean;
    viewOnlyEmptyValueText?: string;
    removeTopMargin?: boolean;
    isSingleLine?: boolean;
    value: string;
    placeholder?: string;
    description?: string;
    descriptionIsDim?: boolean;
    textareaMinHeight?: number;
    status?: CommentFormStatusProp;
    label: string;
    labelSaving?: string;
    labelSuccess?: string;
    labelError?: string;
    loading?: boolean;
}

// Component
@observer
export class CommentForm extends React.Component<CommentFormProps, {}> {
    static get defaultProps(): CommentFormProps {
        return {
            onChangeRaw: null,
            onChange: null,
            onSubmit: null,
            viewOnly: false,
            viewOnlyEmptyValueText: '',
            removeTopMargin: false,
            isSingleLine: false,
            value: '',
            placeholder: '',
            description: '',
            descriptionIsDim: false,
            textareaMinHeight: 80,
            status: 'default',
            label: 'Save',
            labelSaving: 'Saving',
            labelSuccess: 'Saved',
            labelError: 'Could not save, try again',
            loading: false,
        };
    }

    @computed
    private get button(): { color: ButtonLabelColorPropType; label: string } {
        return this.props.status === 'saving'
            ? {
                  color: 'black',
                  label:
                      typeof this.props.labelSaving !== 'undefined' && this.props.labelSaving
                          ? this.props.labelSaving
                          : '',
              }
            : this.props.status === 'success'
                ? {
                      color: 'green',
                      label:
                          typeof this.props.labelSuccess !== 'undefined' && this.props.labelSuccess
                              ? this.props.labelSuccess
                              : '',
                  }
                : this.props.status === 'error'
                    ? {
                          color: 'orange',
                          label:
                              typeof this.props.labelError !== 'undefined' && this.props.labelError
                                  ? this.props.labelError
                                  : '',
                      }
                    : {
                          color: 'blue',
                          label: typeof this.props.label !== 'undefined' && this.props.label ? this.props.label : '',
                      };
    }

    public render() {
        return (
            <div className={s.comments}>
                <div className={classNames(s.commentForm, { [s.noMargin]: this.props.removeTopMargin })}>
                    {(this.props.viewOnly && (
                        <Paragraph>{this.props.value || this.props.viewOnlyEmptyValueText}</Paragraph>
                    )) ||
                        (this.props.isSingleLine && (
                            <Input
                                onChange={this.handleChange}
                                value={this.props.value}
                                label={this.props.placeholder || ''}
                                autoFocus={true}
                            />
                        )) || (
                            <TextArea
                                onChange={this.handleChange}
                                value={this.props.value}
                                label={this.props.placeholder || ''}
                                height={this.props.textareaMinHeight}
                                width={1152}
                                autoFocus={true}
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
                        <LoadingIndicator label={this.button.label} labelOnRight={false} isInline={true} />
                    )) ||
                        (!this.props.viewOnly && (
                            <Button
                                onClick={this.handleSubmit}
                                label={{
                                    text: this.button.label,
                                    color: this.button.color,
                                    size: 'small',
                                }}
                                icon={{
                                    background: 'blue',
                                    size: 'small',
                                    element: <IconChatBubbleWhiteIcon width={17} height={14} />,
                                }}
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

    private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChangeRaw) {
            this.props.onChangeRaw(e);
        }

        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    };

    private handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.onSubmit) {
            this.props.onSubmit(e);
        }
    };
}
