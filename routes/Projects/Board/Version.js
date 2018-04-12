import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectBoardActions from './../../../actions/ProjectBoard';
import { Col } from './../../../components/Section';
import { Button } from './../../../components/Button';
import { statuses } from './../../../helpers/status';

// Styles
const s = require('./Version.css');
import { IconPlusWhite } from './../../../components/Icons';

// Props
const propTypes = {
    projectId: PropTypes.number.isRequired,
    campaignId: PropTypes.number.isRequired,
    spotId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    editable: PropTypes.bool,
};

// Defaults
const defaultProps = {
    id: null,
    name: null,
    editable: false,
};

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actionsProjectBoard: bindActionCreators(projectBoardActions, dispatch)
    };
};

// Component
class Version extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            removing: statuses.default
        };
    }

    render() {
        return (
            <Col
                className={classNames(s.versionName, {
                    [s.removingVersion]: this.state.removing === statuses.saving
                })}
            >

                <h6>
                    {
                        this.state.removing === statuses.default
                            ? this.props.name
                            : this.state.removing === statuses.saving
                                ? 'Removing ' + this.props.name + '...'
                                : this.state.removing === statuses.error
                                    ? 'Could not remove ' + this.props.name + ', try again'
                                    : this.state.removing === statuses.success
                                        ? 'Removed ' + this.props.name
                                        : ''
                    }
                </h6>

                {(this.props.editable) && (
                    <Button
                        onClick={e => this.handleVersionRemoval(e)}
                        className={s.rotate45}
                        icon={{
                            size: 'small',
                            background: this.state.removing === statuses.saving
                                ? 'none-alt'
                                : 'orange',
                            element:
                                <IconPlusWhite
                                    width={12}
                                    marginLeft={-6}
                                    height={12}
                                    marginTop={-6}
                                />
                        }}
                    />
                )}

            </Col>
        );
    };

    handleVersionRemoval(e) {
        this.setState({
            removing: statuses.saving
        });

        this.props.actionsProjectBoard.removeProjectVersion(
            this.props.projectId,
            this.props.campaignId,
            this.props.spotId,
            this.props.id
        ).catch ((error) => {
            this.setState({
                removing: statuses.error
            });
        });
    }
}

Version.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(Version);
