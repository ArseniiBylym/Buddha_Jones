import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '.';
import Button from './../Button/Button';
import Dropdown from './../Form/Dropdown';

// Styles
import s from './Tabs.css';

// Props
const propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            content: PropTypes.element.isRequired
        })
    ),
    editableTabs: PropTypes.bool
};

// Default props
const defaultProps = {
    tabs: [],
    editableTabs: false
};

// Component
class Tabs extends React.Component {
    constructor(props, context) {
        super(props, context);

        let visibleTabs = [];
        let dropdownOptions = [];
        if (this.props.tabs.length > 0 && this.props.editableTabs === true) {
            visibleTabs = [this.props.tabs[0]];
            dropdownOptions = this.calculateDropdownOptions(this.props.tabs, visibleTabs);
        } else if (this.props.tabs.length > 0) {
            visibleTabs = this.props.tabs;
        }

        this.state = {
            activeTab: 0,
            fadeOut: false,
            inTransition: false,
            visibleTabs: visibleTabs,
            dropdownOptions: dropdownOptions
        };
    }

    componentWillUpdate(nextProps, nextState) {
        // Check if tabs or visible tabs change
        if (this.props.tabs.length !== nextProps.tabs.length) {
            this.setState(
                Object.assign({}, this.state, {
                    dropdownOptions: this.calculateDropdownOptions(nextProps.tabs, this.state.visibleTabs)
                })
            );
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Check if active tab is changing, animate transition if it does
        if (typeof prevState !== 'undefined' && this.state.activeTab !== prevState.activeTab) {
            // Check height of the container
            const tabContentContainer = this.refs.tabContentContainer;
            const tabContentContainerHeight = tabContentContainer.offsetHeight;

            // Animate height
            this.refs.tabsContent.style.height = tabContentContainerHeight + 'px';

            // Stop transition class when animation is finished
            setTimeout(() => {
                this.refs.tabsContent.style.height = 'auto';
                this.setState(
                    Object.assign({}, this.state, {
                        inTransition: false
                    })
                );
            }, 500);
        }
    }

    calculateDropdownOptions(tabs, visibleTabs) {
        tabs = typeof tabs !== 'undefined' ? tabs : this.props.tabs;
        visibleTabs = typeof visibleTabs !== 'undefined' ? visibleTabs : this.state.visibleTabs;
        let options = [];
        if (tabs.length > 0) {
            // Iterate all tabs
            tabs.map((tab, tabIndex) => {
                // Check if tab is one of visible tabs already
                let tabIsVisible = 0;
                visibleTabs.map((visibleTab, visibleTabIndex) => {
                    if (tab.label === visibleTab.label) {
                        tabIsVisible++;
                    }
                });
                if (tabIsVisible === 0) {
                    options.push({
                        value: tab.label,
                        label: tab.label
                    });
                }
            });
        }
        return options;
    }

    handleTabLabelClick(tabIndex) {
        if (typeof tabIndex !== 'undefined' && tabIndex !== this.state.activeTab) {
            // Get height of tabs container
            const tabContentContainer = this.refs.tabContentContainer;
            const tabContentContainerHeight = tabContentContainer.offsetHeight;
            this.refs.tabsContent.style.height = tabContentContainerHeight + 'px';

            // Fade out content
            this.setState(
                Object.assign({}, this.state, {
                    fadeOut: true,
                    inTransition: true
                })
            );

            // Change tab content
            setTimeout(() => {
                this.setState(
                    Object.assign({}, this.state, {
                        activeTab: tabIndex,
                        fadeOut: false
                    })
                );
            }, 300);
        }
    }

    handleTabEditDropdownChange(selected) {
        if (typeof selected !== 'undefined' && typeof selected.label !== 'undefined') {
            // Get label and visible tabs
            const newTabLabel = selected.label;

            // Find selected tab
            let selectedTab, selectedTabIndex;
            for (let i = 0; i < this.props.tabs.length; i++) {
                const tab = this.props.tabs[i];
                if (tab.label === newTabLabel) {
                    selectedTab = tab;
                    selectedTabIndex = i;
                    break;
                }
            }

            // Update state
            if (typeof selectedTab !== 'undefined') {
                // Next visible tabs
                const visibleTabs = this.state.visibleTabs.concat([selectedTab]);

                // Add new visible tab
                this.setState(
                    Object.assign({}, this.state, {
                        dropdownOptions: this.calculateDropdownOptions(this.props.tabs, visibleTabs),
                        visibleTabs: visibleTabs
                    })
                );

                // Change state
                setTimeout(() => {
                    this.handleTabLabelClick(selectedTabIndex);
                }, 128);
            }
        }
    }

    render() {
        // Render
        return (
            <div>
                <Row className={s.tabsHeader}>
                    {this.state.visibleTabs.map((tab, tabIndex) => (
                        <Col key={tabIndex}>
                            <Button
                                className={tabIndex === this.state.activeTab ? s.activeTab : undefined}
                                onClick={e => this.handleTabLabelClick(tabIndex)}
                                label={{
                                    text: tab.label,
                                    size: 'small',
                                    color: 'blue'
                                }}
                            />
                        </Col>
                    ))}

                    {(this.props.editableTabs === true && this.state.dropdownOptions.length > 0) && (
                        <Col>
                            <Dropdown
                                onChange={e => this.handleTabEditDropdownChange(e)}
                                type="oneline"
                                label="Add tab"
                                selected={{
                                    value: '',
                                    label: ''
                                }}
                                options={this.state.dropdownOptions}
                            />
                        </Col>
                    )}

                </Row>
                <div
                    ref="tabsContent"
                    className={this.state.inTransition === true ? s.tabsContent + ' ' + s.contentTransition : s.tabsContent}
                >
                    <div ref="tabContentContainer" style={this.state.fadeOut === true ? { opacity: 0 } : null}>
                        {this.props.tabs[this.state.activeTab].content}
                    </div>
                </div>
            </div>
        );
    }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
