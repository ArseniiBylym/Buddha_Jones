import * as React from 'react';
import * as classNames from 'classnames';
import { Row, Col } from '.';

// Styles
const s = require('./HeaderSection.css');

// Props
interface HeaderSectionProps {
    className?: string | null;
    hasMarginOnBottom?: boolean;
}

// Component
export class HeaderSection extends React.Component<HeaderSectionProps, {}> {
    static get defaultProps(): HeaderSectionProps {
        return {
            className: null,
            hasMarginOnBottom: false,
        };
    }

    public render() {
        return (
            <div
                className={classNames(
                    'headerSection',
                    {
                        ['headerSectionWithMargin']: this.props.hasMarginOnBottom,
                    },
                    this.props.className
                )}
            >
                <hr className={s.separator} />
                <Row className={s.contentRow} removeGutter={true}>
                    <Col className={s.contentCol}>{this.props.children}</Col>
                </Row>
            </div>
        );
    }
}
