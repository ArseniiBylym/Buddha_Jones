import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Row, Col } from './../Section';

const s = require('./LoadingShade.css');

interface LoadingShadeProps {
    className?: string | null;
    background?: string | null;
    border?: string | null;
    contentCentered?: boolean;
    contentCenteredToTop?: boolean;
    isStatic?: boolean;
}

@observer
export class LoadingShade extends React.Component<LoadingShadeProps, {}> {
    static get defaultProps(): LoadingShadeProps {
        return {
            className: null,
            background: null,
            border: null,
            contentCentered: true,
            contentCenteredToTop: false,
            isStatic: false,
        };
    }

    private exists: boolean = true;

    @observable private visible: boolean = false;

    public componentDidMount() {
        setTimeout(() => {
            if (this.exists) {
                this.visible = true;
            }
        }, 128);
    }

    public componentWillUnmount() {
        this.exists = false;
    }

    public render() {
        return (
            <Row
                className={classNames(s.shade, this.props.className, {
                    [s.visible]: this.visible,
                    [s.alignLeft]: !this.props.contentCentered,
                    [s.alignTop]: this.props.contentCentered && this.props.contentCenteredToTop,
                    [s.static]: this.props.isStatic
                })}
                style={{
                    background: this.props.background || undefined,
                    border: this.props.border || undefined,
                }}
                removeGutter={true}
                removeMargins={true}
            >
                <Col size={0}>{this.props.children}</Col>
            </Row>
        );
    }
}
