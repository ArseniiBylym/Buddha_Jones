import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { Row, Col } from './index';

require('./Section.css');

export interface SectionElement {
    key?: string | number;
    element: JSX.Element;
    minWidth?: number;
    maxWidth?: number;
}

interface Props {
    innerRef?: (ref: HTMLDivElement) => void;
    className?: string | null;
    title?: string;
    subTitle?: string;
    noSeparator?: boolean;
    removeTitleGutter?: boolean;
    removeTitleMargins?: boolean;
    headerElements?: SectionElement[];
}

@observer
export class Section extends React.Component<Props, {}> {
    static get defaultProps(): Props {
        return {
            className: null,
            title: '',
            subTitle: '',
            noSeparator: false,
            removeTitleGutter: true,
            removeTitleMargins: false,
            headerElements: [],
        };
    }

    public render() {
        return (
            <div ref={this.referenceContainer} className={classNames('section', this.props.className)}>
                {this.props.noSeparator === false && <hr/>}

                {(this.props.title ||
                    this.props.subTitle ||
                    (typeof this.props.headerElements !== 'undefined' && this.props.headerElements.length > 0)) && (
                    <Row
                        className={'sectionHeader'}
                        removeGutter={this.props.removeTitleGutter}
                        removeMargins={this.props.removeTitleMargins}
                    >
                        {(this.props.title || this.props.subTitle) && (
                            <Col className={'sectionHeaderTitle'}>
                                <h3>
                                    <strong>{this.props.title}</strong>
                                    {this.props.title && this.props.subTitle && <em> — </em>}
                                    <span>{this.props.subTitle + ':'}</span>
                                </h3>
                            </Col>
                        )}

                        {typeof this.props.headerElements !== 'undefined' &&
                        this.props.headerElements.length > 0 && (
                            <Col className={'sectionElements'}>
                                <Row removeGutter={true}>
                                    {this.props.headerElements.map((el, index) => {
                                        if (typeof el !== 'undefined' && el !== null) {
                                            return (
                                                <Col
                                                    key={
                                                        typeof el.key !== 'undefined' && el.key
                                                            ? el.key
                                                            : 'element-' + index
                                                    }
                                                    minWidth={typeof el.minWidth !== 'undefined' ? el.minWidth : 0}
                                                    maxWidth={typeof el.maxWidth !== 'undefined' ? el.maxWidth : 0}
                                                >
                                                    {el.element}
                                                </Col>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </Row>
                            </Col>
                        )}
                    </Row>
                )}

                {typeof this.props.children !== 'undefined' &&
                this.props.children && <div className={'sectionInner'}>{this.props.children}</div>}
            </div>
        );
    }

    private referenceContainer = (ref: HTMLDivElement) => {
        if (this.props.innerRef) {
            this.props.innerRef(ref);
        }
    };
}
