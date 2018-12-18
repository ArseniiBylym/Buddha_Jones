import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Button } from '../Button';
import { IconEditPencilBlue, IconEllipsis } from '../Icons';

// Styles
const s = require('./Tag.css');

// Props
interface TagProps {
    onTagClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onTagClickCapture?: (e: React.MouseEvent<HTMLElement>) => void;
    onEditButtonClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onEditButtonClickCapture?: (e: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    titleClassName?: string;
    editButtonLabel?: string;
    title: string | null;
    isTitleBold?: boolean;
    isTitleDim?: boolean;
    otherLabels?: Array<{
        text: string;
        isBold?: boolean;
    }>;
    showInfoIcon?: boolean;
    isBig?: boolean;
}

// Component
@observer
export class Tag extends React.Component<TagProps, {}> {
    static get defaultProps(): TagProps {
        return {
            onTagClick: undefined,
            onTagClickCapture: undefined,
            onEditButtonClick: undefined,
            onEditButtonClickCapture: undefined,
            className: undefined,
            titleClassName: undefined,
            editButtonLabel: '',
            title: '',
            isTitleBold: true,
            isTitleDim: false,
            otherLabels: [],
            showInfoIcon: false,
            isBig: false,
        };
    }

    public render() {
        return this.props.title || (this.props.otherLabels && this.props.otherLabels.length > 0) ? (
            <div
                className={classNames(
                    s.tag,
                    {
                        [s.big]: this.props.isBig,
                        [s.noPaddingOnRight]:
                            (this.props.otherLabels && this.props.otherLabels.length > 0) ||
                            (typeof this.props.onEditButtonClick !== 'undefined' ||
                                typeof this.props.onEditButtonClickCapture !== 'undefined'),
                        [s.clickable]:
                            typeof this.props.onTagClick !== 'undefined' ||
                            typeof this.props.onTagClickCapture !== 'undefined',
                    },
                    this.props.className
                )}
                onClick={this.handleTagClick(false)}
                onClickCapture={this.handleTagClick(true)}
            >
                {this.props.showInfoIcon && (
                    <p className={s.infoIcon}>
                        <IconEllipsis width={15} height={11} />
                    </p>
                )}

                {this.props.title && (
                    <p
                        className={classNames(
                            s.title,
                            {
                                [s.bold]: this.props.isTitleBold,
                                [s.dim]: this.props.isTitleDim,
                            },
                            this.props.titleClassName
                        )}
                    >
                        {this.props.title}
                    </p>
                )}

                {this.props.otherLabels &&
                    this.props.otherLabels.map((label, labelIndex) =>
                        label !== null && label.text !== '' ? (
                            <p
                                key={label.text}
                                className={classNames(s.label, {
                                    [s.bold]: label.isBold,
                                    [s.first]: labelIndex === 0,
                                })}
                            >
                                {label.text}
                            </p>
                        ) : null
                    )}

                {(typeof this.props.onEditButtonClick !== 'undefined' ||
                    typeof this.props.onEditButtonClickCapture !== 'undefined') && (
                    <p className={s.editButton}>
                        <Button
                            onClick={this.handleEditClick(false)}
                            onClickCapture={this.handleEditClick(true)}
                            icon={{
                                size: 'small',
                                background: 'white',
                                element: <IconEditPencilBlue width={14} height={14} />,
                            }}
                            label={
                                typeof this.props.onEditButtonClick !== 'undefined' && this.props.editButtonLabel
                                    ? {
                                          text: this.props.editButtonLabel,
                                          color: 'blue',
                                          onLeft: true,
                                      }
                                    : undefined
                            }
                        />
                    </p>
                )}
            </div>
        ) : null;
    }

    private handleTagClick = (capture: boolean) => (e: React.MouseEvent<HTMLDivElement>) => {
        if (capture === false && this.props.onTagClick) {
            this.props.onTagClick(e);
        } else if (capture === true && this.props.onTagClickCapture) {
            this.props.onTagClickCapture(e);
        }
    };

    private handleEditClick = (capture: boolean) => (e: React.MouseEvent<HTMLButtonElement>) => {
        if (capture === false && this.props.onEditButtonClick) {
            this.props.onEditButtonClick(e);
        } else if (capture === true && this.props.onEditButtonClickCapture) {
            this.props.onEditButtonClickCapture(e);
        }
    };
}
