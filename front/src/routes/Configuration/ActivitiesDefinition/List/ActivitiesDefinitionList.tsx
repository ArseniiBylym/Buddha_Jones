import { ActivitiesDefinitionListEntry } from '.';
import { ActivitiesActions, HeaderActions, UsersActions } from 'actions';
import { history } from 'App';
import { ButtonAdd } from 'components/Button';
import { Paragraph } from 'components/Content';
import {
    DropdownContainer,
    InputSearch,
    OptionsList,
    OptionsListValuePropType
    } from 'components/Form';
import { LoadingSpinner } from 'components/Loaders';
import { Col, Row, Section } from 'components/Section';
import { Table, TableCell, TableRow } from 'components/Table';
import { computed, reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppState } from 'store/AllStores';

const zenscroll = require('zenscroll');

type ComponentProps = AppState;

@inject('store')
@observer
class ActivitiesDefinitionList extends React.Component<ComponentProps, {}> {
    private USER_TYPES_LIMIT_TO_LIST: number = 5;

    @computed
    private get essentialDataIsLoading(): boolean {
        if (this.props.store) {
            return Boolean(
                this.props.store.activities.activitiesLoading ||
                    this.props.store.activities.activitiesTypesLoading ||
                    this.props.store.users.typesLoading
            );
        }

        return true;
    }

    @computed
    private get filterByTypeName(): string | null {
        if (this.props.store) {
            const typeId = this.props.store.activities.filterActivitiesByTypeId;
            if (typeId !== null) {
                const type = this.props.store.activities.activitiesTypes.find(t => t.id === typeId);
                if (type) {
                    return type.name;
                }
            }
        }

        return null;
    }

    private typeDropdown: DropdownContainer | null = null;

    public componentDidMount() {
        // Fetch required data
        ActivitiesActions.fetchActivityList();
        ActivitiesActions.fetchActivitiesTypes();
        UsersActions.fetchUsersTypes();

        // Set header
        HeaderActions.setMainHeaderTitlesAndElements(
            'Activities list',
            'Configuration',
            null,
            null,
            [
                <ButtonAdd
                    key="define-new-activity-button"
                    onClick={this.handleOpenNewActivityPage}
                    isWhite={true}
                    label="Define new activity"
                />,
            ],
            [],
            false
        );

        // Scroll to element
        if (
            this.props.match &&
            this.props.match.params &&
            typeof this.props.match.params['fromEntry'] !== 'undefined'
        ) {
            const getRow = document.getElementById(
                'activity-definition-row-' + this.props.match.params['fromEntry'].trim()
            );
            if (getRow) {
                zenscroll.to(getRow, 0);
            }
        }
    }

    public constructor(props: ComponentProps) {
        super(props);

        reaction(
            () => this.essentialDataIsLoading,
            isLoading => {
                if (!isLoading) {
                    // Scroll to element
                    if (
                        this.props.match &&
                        this.props.match.params &&
                        typeof this.props.match.params['fromEntry'] !== 'undefined'
                    ) {
                        const getRow = document.getElementById(
                            'activity-definition-row-' + this.props.match.params['fromEntry'].trim()
                        );
                        if (getRow) {
                            zenscroll.to(getRow, 0);
                        }
                    }
                }
            }
        );
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { users } = this.props.store;

        return !this.essentialDataIsLoading ? (
            <Section
                noSeparator={true}
                title="All activities"
                headerElements={[
                    {
                        key: 'type-filter',
                        element: (
                            <DropdownContainer
                                ref={this.referenceTypeDropdown}
                                label="Filter by type"
                                value={this.filterByTypeName || 'All'}
                                minWidth={256}
                            >
                                <OptionsList
                                    onChange={this.handleActivityTypeIdChange}
                                    value={this.props.store.activities.filterActivitiesByTypeId}
                                    options={[
                                        ...[
                                            {
                                                value: null,
                                                label: 'All',
                                            },
                                        ],
                                        ...this.props.store.activities.activitiesTypes.map(type => ({
                                            value: type.id,
                                            label: type.name,
                                        })),
                                    ]}
                                />
                            </DropdownContainer>
                        ),
                    },
                    {
                        key: 'search-filter',
                        element: (
                            <InputSearch
                                onChange={this.handleActivitySearchChange}
                                value={this.props.store.activities.filterActivitiesBySearch}
                                label="Search activity..."
                            />
                        ),
                    },
                ]}
            >
                <Table
                    header={[
                        { title: 'Activity', align: 'left' },
                        { title: 'Type', align: 'left' },
                        { title: 'Status', align: 'center' },
                        { title: 'Action', align: 'right' },
                    ]}
                >
                    {this.props.store.activities.filteredActivities.map(activity => (
                        <ActivitiesDefinitionListEntry
                            key={activity.id}
                            onActivityEditButtonClick={this.handleActivityEdit}
                            userTypesListLimit={this.USER_TYPES_LIMIT_TO_LIST}
                            usersTypes={users.types}
                            activity={activity}
                        />
                    ))}

                    {this.props.store.activities.filteredActivities.length <= 0 && (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <Paragraph type="dim" align="center">
                                    No activities matching filters exist.
                                </Paragraph>
                            </TableCell>
                        </TableRow>
                    )}
                </Table>
            </Section>
        ) : (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner size={64} />
                </Col>
            </Row>
        );
    }

    private referenceTypeDropdown = (ref: DropdownContainer) => (this.typeDropdown = ref);

    private handleActivityTypeIdChange = (option: { value: OptionsListValuePropType; label: string }) => {
        ActivitiesActions.changeActivitiesFilterByTypeId(option.value as number | null);

        if (this.typeDropdown) {
            this.typeDropdown.closeDropdown();
        }
    };

    private handleActivitySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        ActivitiesActions.changeActivitiesFilterBySearch(e.target.value);
    };

    private handleOpenNewActivityPage = () => {
        history.push('/portal/configuration/activity/new');
    };

    private handleActivityEdit = (activityId: number) => () => {
        history.push('/portal/configuration/activity/' + activityId);
    };
}

export default ActivitiesDefinitionList;
