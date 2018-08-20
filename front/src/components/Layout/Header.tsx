import * as React from 'react';
import * as classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { AppOnlyStoreState } from '../../store/AllStores';
import { Row, Col } from '../Section/index';

// Styles
const s = require('./Header.css');

// Props
interface HeaderProps {}

// Component
@inject('store')
@observer
export class Header extends React.Component<HeaderProps & AppOnlyStoreState, {}> {
    public render() {
        if (!this.props.store) {
            return null;
        }

        const { header } = this.props.store;

        return (
            <div className={s.header}>
                <Col className={s.headerText}>
                    {header &&
                        header.title &&
                        header.title.trim() !== '' && (
                            <h1 className={s.headerTitle}>
                                {header.preTitleSpan &&
                                    header.preTitleSpan.trim() !== '' && <span>{header.preTitleSpan}</span>}
                                {header.title}
                            </h1>
                        )}
                    {header &&
                        header.subTitle &&
                        header.subTitle.trim() !== '' && (
                            <h3 className={s.headerSubTitle}>
                                {header &&
                                    header.preSubTitleSpan &&
                                    header.preSubTitleSpan.trim() !== '' && <span>{header.preSubTitleSpan}</span>}
                                {header.subTitle}
                            </h3>
                        )}
                </Col>

                {header &&
                    typeof header.elementsOnLeft !== 'undefined' &&
                    header.elementsOnLeft &&
                    typeof header.elementsOnLeft.length === 'number' &&
                    header.elementsOnLeft.length > 0 && (
                        <Col size={1} className={classNames(s.headerElements, s.headerElementsOnLeft)}>
                            <Row removeGutter={true}>
                                {header.elementsOnLeft.map((element, index) => <Col key={index}>{element}</Col>)}
                            </Row>
                        </Col>
                    )}

                {header &&
                    typeof header.elements !== 'undefined' &&
                    header.elements &&
                    typeof header.elements.length === 'number' &&
                    header.elements.length > 0 && (
                        <Col size={1} className={s.headerElements}>
                            <Row removeGutter={true}>
                                {header.elements.map((element, index) => <Col key={index}>{element}</Col>)}
                            </Row>
                        </Col>
                    )}
            </div>
        );
    }
}
