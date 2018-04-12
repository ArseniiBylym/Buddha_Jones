import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import * as API from './../../../actions/api';
import DropdownContainer from './../../../components/Form/DropdownContainer';
import OptionsList from './../../../components/Form/OptionsList';

const propTypes = {
    onChange: PropTypes.func,
    onNewCreated: PropTypes.func,
    onNewCreating: PropTypes.func,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    label: PropTypes.string,
    valueLabel: PropTypes.string,
    truncuateLabelTo: PropTypes.number,
    excludeIds: PropTypes.arrayOf(PropTypes.number),
    projectId: PropTypes.number,
    disabledCreating: PropTypes.bool,
    closeWhenPicked: PropTypes.bool
};

const defaultProps = {
    onChange: null,
    onNewCreated: null,
    onNewCreating: null,
    align: 'right',
    excludeIds: [],
    label: 'Pick campaign',
    truncuateLabelTo: 32,
    disabledCreating: false,
    closeWhenPicked: true
};

/**
 * UserTypePicker
 */
class UserTypePicker extends React.Component {

    /**
    * UserTypePicker Constructor
    * @param {props} props from parent component
    * @return {void}
    */
    constructor(props) {
        super(props);

        this.state = {
            selected: {
                value: '',
                label: ''
            },
            userTypes: [],
            options: [],
            query: '',
            loadingOptions: false,
            saving: false,
            directHint: null
        };
    }

    /**
    * React lifecycle function -
    * - invoked immediately after a component is mounted
    * @return {void}
    */
    componentDidMount() {
        this.fetchUserType({
            length: 9999,
            offset: 0
        });
    }

    /**
    * Close picker dropdown
    * @return {void}
    */
    closeDropdown() {
        if (typeof this.refs !== 'undefined' && typeof this.refs.userTypePickerDropdown !== 'undefined') {
            const dropdown = this.refs.userTypePickerDropdown;
            if (typeof dropdown.closeDropdown !== 'undefined') {
                dropdown.closeDropdown();
            }
        }
    }

    /**
    * Fetch userType data
    * @param {json} fetch options
    * @return {void}
    */
    fetchUserType(params) {
        this.setState({
            loadingOptions: true
        });
        API.get(API.USER_TYPE, params)
            .then(response => {
                this.setState({
                    loadingOptions: false,
                    userTypes: response
                }, () => {
                    this.filterUserTypesToOptions();
                });
            }).catch(error => {
                this.setState({
                    loadingOptions: false
                });
            });
    }

    /**
    * Set options of UserType Picker
    * @return {void}
    */
    filterUserTypesToOptions(cb) {
        this.setState({
            options: this.state.userTypes.map(c => {
                    return {
                        value: c.id,
                        label: c.type_name
                    };
                })
        });
    }

    /**
    * Handle select or create userType value
    * @param {json} a expnese data
    * @return {void}
    */
    handleSelectOrCreate(e) {
        if (e.value === 'createUserType') {
            //
        } else {
            // Select the campaign
            this.setState({
                selected: e
            });

            if (this.props.onChange) {
                this.props.onChange(e);
            }

            if (this.props.closeWhenPicked) {
                this.closeDropdown();
            }
        }
    }

    /**
    * Search userType
    * @param {str} Input value
    * @return {void}
    */
    handleSearchQuery(e) {
        this.setState({
            query: e.replace(/\b\w/g, l => l.toUpperCase())  // Capitalize
        }, () => {
            if (this.state.query === '' || this.isExactlyMatch(this.state.query)) {
                // Remove direct hint
                this.setState({
                    directHint: null
                });
            } else if (this.props.disabledCreating === false) {
                // Set direct hint
                this.setState({
                    directHint: {
                        value: 'createUserType',
                        label: 'Create new userType: ' + this.state.query
                    }
                });
            }
        });
    }

    /**
    * Compare input value
    * @param {str} Input value
    * @return {void}
    */
    isExactlyMatch(query) {
        return !!this.state.options.find(option => option.label.toLowerCase() === query.trim().toLowerCase());
    }

    /**
    * Render UserTypePicker component
    * @return {jsxresult} result in jsx format
    */
    render() {
        if (this.state.saving) {
            return (
                <div className="userTypePicker">
                    <p>Saving new userType...</p>
                </div>
            );
        } else {
            return (
                <div className="campaignPicker">
                    <DropdownContainer
                        ref="userTypePickerDropdown"
                        align={this.props.align}
                        minWidth={210}
                        overflowAuto={true}
                        label={this.props.label}
                        value={this.state.selected.label}
                    >
                        <OptionsList
                            onChange={e => this.handleSelectOrCreate(e)}
                            search={{
                                autoFocus: true,
                                label: 'Search or create userType by name...',
                                onChange: (e) => this.handleSearchQuery(e),
                                value: this.state.query
                            }}
                            value={this.state.selected.value}
                            options={this.state.options}
                            loadingOptions={this.state.loadingOptions}
                            directHint={this.state.directHint}
                        />
                    </DropdownContainer>
                </div>
            );
        }
    }
}

UserTypePicker.propTypes = propTypes;
UserTypePicker.defaultProps = defaultProps;

export default UserTypePicker;
