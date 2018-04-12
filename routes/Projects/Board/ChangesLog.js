// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import zenscroll from 'zenscroll';
import { Row, Col } from './../../../components/Section';
import { HeaderSection } from './../../../components/Layout';
import { Button } from './../../../components/Button';
import { Person } from './../../../components/Buddha';

// Styles
import s from './ProjectBoard.css';
import { IconArrowLeftYellow, IconArrowRightYellow } from './../../../components/Icons';

// Props
const changesLogProps = {
    loading: PropTypes.bool,
    history: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.string,
        image: PropTypes.string,
        text: PropTypes.string,
        date: PropTypes.string
    }))
};

// Defaults
const changesLogDefaultProps = {
    loading: false,
    history: []
};

// Component
class ChangesLog extends React.Component {
    constructor(props) {
        super(props);

        this.limitCompactViewCount = 3;

        this.state = {
            showAll: false
        };

        this.table = null;
        this.referenceTable = (ref) => this.table = ref;
    }

    render() {
        return (
            <HeaderSection marginBottom={true}>

                <Row removeGutter={true}>

                    <Col size={6}>
                        <p>Changes log:</p>
                    </Col>

                    {(this.props.history.length > this.limitCompactViewCount) && (
                        <Col size={6} className={s.arrows}>
                            {this.renderExpandOrCollapseButton()}
                        </Col>
                    )}

                </Row>

                <table ref={this.referenceTable} className={s.changesList}>
                    <tbody>
                        {(this.props.history.length > 0) &&
                            this.renderHistory()
                        || (this.props.loading) && (
                            <tr key="loading-history">
                                <td colSpan={3} style={{ textAlign: 'left' }}>
                                    <p>Loading history...</p>
                                </td>
                            </tr>
                        ) || (
                            <tr key="no-changes">
                                <td colSpan={3} style={{ textAlign: 'left' }}>
                                    <p>No project history has been saved yet.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {(this.state.showAll) && (
                    <Row removeGutter={true}>
                        <Col size={12} className={s.arrows}>
                            {this.renderExpandOrCollapseButton()}
                        </Col>
                    </Row>
                )}

            </HeaderSection>
        );
    }

    renderExpandOrCollapseButton() {
        return (
            <Button
                onClick={e => this.handleChangesListExpansion(e)}
                float="right"
                icon={{
                    size: 'nopadding',
                    background: 'none',
                    element: this.state.showAll
                        ? <IconArrowLeftYellow width={15} height={11} />
                        : <IconArrowRightYellow width={15} height={11} />
                }}
                label={{
                    text: this.state.showAll
                        ? 'Hide complete project history'
                        : 'View complete project history',
                    onLeft: !this.state.showAll,
                    color: 'yellow',
                    size: 'small'
                }}
            />
        );
    }

    renderHistory() {
        return this.props.history
            .filter((change, changeIndex) => this.state.showAll ? true : changeIndex < this.limitCompactViewCount)
            .map((change, changeIndex) => {
            // Verify the date
            let timeAgo = '';
            let date = DateTime.fromISO(change.date.replace(' ', 'T'));
            if (date.isValid) {
                timeAgo = date.toLocaleString({
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } else {
                timeAgo = 'Recently';
            }

            // Push to rows array
            return (
                <tr key={`change-${change.id}`}>
                    <td>
                        <Person
                            image={change.image}
                            name={change.user}
                            nameOnLeft={false}
                            smallImage={true}
                            darkImage={true}
                        />
                    </td>
                    <td>
                        <p>{change.text}</p>
                    </td>
                    <td>
                        <p>{timeAgo}</p>
                    </td>
                </tr>
            );
        });
    }

    handleChangesListExpansion(e) {
        this.setState({
            showAll: !this.state.showAll
        }, () => {
            if (!this.state.showAll) {
                zenscroll.toY(0);
            }
        });
    }
}

ChangesLog.propTypes = changesLogProps;
ChangesLog.defaultProps = changesLogDefaultProps;

export default ChangesLog;
