import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { debounce as _debounce } from 'lodash';
import { Row, Col } from './../Section';
import { LoadingSpinner, LoadingShade } from './../Loaders';
import { Input, OptionsList } from '.';
import { Button } from './../Button';
import { getFlatListOfOptions } from './NestedOptionsSelectors';

// Styles
import s from './NestedOptionsList.css';

// Props
const propTypes = {
    onChange: PropTypes.func,
    search: PropTypes.bool,
    searchLabel: PropTypes.string,
    searchAutoFocus: PropTypes.bool,
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
                PropTypes.object,
                PropTypes.array,
            ]).isRequired,
            label: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                        PropTypes.bool,
                        PropTypes.object,
                        PropTypes.array,
                    ]).isRequired,
                    label: PropTypes.string.isRequired,
                })
            )
        })
    ),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object, PropTypes.array]),
    selectedIcon: PropTypes.element,
    noOptionsLabel: PropTypes.string,
    loading: PropTypes.bool,
};

// Defaults
const defaultProps = {
    onChange: null,
    search: false,
    searchLabel: null,
    searchAutoFocus: false,
    value: null,
    selectedIcon: null,
    noOptionsLabel: 'No results available',
    loading: false,
};

// Deriviations
const mapStateToProps = (state, ownProps) => {
    return {
        flatOptions: getFlatListOfOptions(state, ownProps),
    };
};

// Component
class NestedOptionsList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            containerHeight: 0,
            optionsListHeight: 0,
            groupId: null,
            searchText: '',
        };

        this.container = null;
        this.searchContainer = null;
        this.labelContainer = null;
        this.searchField = null;
        this.referenceContainer = (ref) => this.container = ref;
        this.referenceSearchContainer = (ref) => this.searchContainer = ref;
        this.referenceLabelContainer = (ref) => this.labelContainer = ref;
        this.referenceSearchField = (ref) => this.searchField = ref;
    }

    componentDidMount() {
        this.setListHeight();
    }

    setListHeight() {
        // Set fixed height of the component
        if (this.container) {
            // Get heights
            const containerParent = this.container.parentElement;
            const containerHeight = containerParent && containerParent.className.indexOf('dropdownGroup') !== -1
                ? containerParent.offsetHeight : 0;
            const searchContainerHeight = this.searchContainer ? this.searchContainer.offsetHeight : 0;
            const labelContainerHeight = this.labelContainer ? this.labelContainer.offsetHeight : 0;

            this.setState({
                containerHeight: containerHeight,
                optionsListHeight: containerHeight - searchContainerHeight - labelContainerHeight
            });
        }
    }

    render() {
        return (
            <div
                ref={this.referenceContainer}
                className={s.nestedOptionsList}
                style={
                    this.state.containerHeight > 0
                        ? { height: this.state.containerHeight + 'px' }
                        : { height: 'auto' }
                }
            >

                {(this.props.search) && (
                    <div
                        ref={this.referenceSearchContainer}
                        className={classNames('optionsListSearch', s.searchContainer)}
                    >
                        <Input
                            ref={this.referenceSearchField}
                            onChange={e => this.handleOptionsSearch(e)}
                            value={this.state.searchText}
                            label={this.props.searchLabel || 'Search...'}
                            autoFocus={this.props.searchAutoFocus}
                        />
                    </div>
                )}

                {
                    (this.state.groupId !== null) || (this.props.search && this.state.searchText.trim().length > 0)
                        ? this.renderOptionsList()
                        : this.renderGroupsList()
                }

            </div>
        );
    }

    renderGroupsList() {
        return (
            <div
                className={s.optionsListContainer}
                style={{ height: this.state.optionsListHeight > 0 ? this.state.optionsListHeight + 'px' : 'auto' }}
            >
                <OptionsList
                    onChange={e => this.handleGroupClick(e)}
                    className={s.optionsList}
                    value={this.props.value !== null ? this.props.value : undefined}
                    loadingOptions={this.props.loading}
                    options={this.props.groups.filter((group) => typeof group.options !== 'undefined').map((group) => ({
                        value: group.value,
                        label: group.label,
                    }))}
                />
            </div>
        );
    }

    renderOptionsList() {
        let optionsValues = [];
        const searchValue = this.state.searchText.toLowerCase().trim();

        if (searchValue.length > 0) {
            optionsValues = this.props.flatOptions.filter(option =>
                typeof option.label === 'string' && option.label
                    ? option.label.toLowerCase().indexOf(searchValue) !== -1
                    : false
            );
        } else {
            let groupFound = -1;
            this.props.groups.some((group, groupIndex) => {
                if (group.value === this.state.groupId) {
                    groupFound = groupIndex;
                    return true;
                }
            });

            optionsValues = groupFound !== -1 ? this.props.groups[groupFound].options : [];
        }

        return (
            <div
                className={s.optionsListContainer}
                style={{ height: this.state.optionsListHeight > 0 ? this.state.optionsListHeight + 'px' : 'auto' }}
            >
                <OptionsList
                    className={s.optionsList}
                    onChange={e => this.handleOptionClick(e)}
                    value={this.props.value !== null ? this.props.value : undefined}
                    selectedIcon={this.props.selectedIcon}
                    loadingOptions={this.props.loading}
                    options={[
                        ...(this.state.groupId !== null ? [{ value: 'goBack', label: '←' }] : []),
                        ...optionsValues,
                        ...(optionsValues.length === 0 ? [{ value: 'goBackAlt', label: this.props.noOptionsLabel }] : [])
                    ]}
                />
            </div>
        );
    }

    handleOptionsSearch(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    toggleBetweenGroupsAndOptions(groupId) {
        if (this.state.groupId !== groupId) {
            this.setState({
                groupId,
                searchText: groupId === null ? '' : this.state.searchText
            }, () => {
                this.setListHeight();
            });
        }
    }

    handleGroupClick(group) {
        if (typeof group !== 'undefined' && typeof group.value !== 'undefined') {
            this.toggleBetweenGroupsAndOptions(group.value);
        }
    }

    handleOptionClick(option) {
        if (typeof option !== 'undefined') {
            if (option.value === 'goBack' || option.value === 'goBackAlt') {
                this.toggleBetweenGroupsAndOptions(null);
            } else if (this.props.onChange) {
                this.props.onChange(option);
            }
        }
    }
}

NestedOptionsList.propTypes = propTypes;
NestedOptionsList.defaultProps = defaultProps;

export default connect(mapStateToProps)(NestedOptionsList);
