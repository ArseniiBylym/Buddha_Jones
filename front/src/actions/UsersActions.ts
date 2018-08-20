import { action } from 'mobx';
import { UsersStore } from 'store/AllStores';
import { DateHandler } from 'helpers/DateHandler';
import { API, APIPath } from 'fetch';
import {
    OtherUserFromApi,
    OtherUser,
    UsersListFromApi,
    UserProjectRoleFromApi,
    OtherUserDetails,
    OtherUsersFromApi,
    UserTypeFromApi,
} from 'types/users';
import { UserTypeClassId } from 'types/user';

export class UsersActionsClass {
    @action
    public fetchUsersProjectRoles = async (forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (
                forceFetch ||
                (UsersStore.projectRolesLoading === false &&
                    DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, UsersStore.projectRolesLastFetchTimestamp))
            ) {
                UsersStore.projectRolesLoading = true;

                const roles = (await API.getData(APIPath.USER_ROLE)) as UserProjectRoleFromApi[];

                UsersStore.projectRoles = roles.map(role => ({
                    id: role.id,
                    name: role.role_name,
                }));
                UsersStore.projectRolesLastFetchTimestamp = Date.now();
                UsersStore.projectRolesLoading = false;
            }

            return true;
        } catch (error) {
            UsersStore.projectRolesLoading = false;
            throw error;
        }
    };

    @action
    public fetchUsersTypes = async (forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (
                forceFetch ||
                (UsersStore.typesLoading === false &&
                    DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, UsersStore.typesLastFetchTimestamp))
            ) {
                UsersStore.typesLoading = true;

                const response = (await API.getData(APIPath.USER_TYPE)) as UserTypeFromApi[];

                UsersStore.types = response
                    .sort((typeA, typeB) => (typeA.id < typeB.id ? -1 : typeA.id > typeB.id ? 1 : 0))
                    .map(type => ({
                        id: type.id,
                        name: type.type_name,
                    }));
                UsersStore.typesLastFetchTimestamp = Date.now();
                UsersStore.typesLoading = false;
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchUsersTypes(true);
            }, 512);
            throw error;
        }
    };

    @action
    public fetchUsersByIds = async (ids: number[], forceFetch: boolean = false): Promise<boolean> => {
        try {
            // Find out if any of requested IDs need to be fetched
            const idsToFetch = ids.reduce((toFetch: number[], id) => {
                const userIndex = UsersStore.peopleFlatIds.indexOf(id);

                if (
                    forceFetch ||
                    userIndex === -1 ||
                    (userIndex !== -1 &&
                        UsersStore.people[userIndex].loading === false &&
                        DateHandler.checkIfTimeStampIsOlderThanXMinutes(
                            5,
                            UsersStore.people[userIndex].lastFetchTimestamp
                        ))
                ) {
                    if (userIndex !== -1) {
                        UsersStore.people[userIndex].loading = true;
                    } else {
                        UsersStore.people.push({
                            id,
                            loading: true,
                            lastFetchTimestamp: 0,
                            data: null,
                        });
                    }
                    toFetch.push(id);
                }

                return toFetch;
            }, []);

            // Fetch all users
            const response = (await API.getData(APIPath.USERS, {
                ids: JSON.stringify(idsToFetch),
            })) as OtherUsersFromApi;

            if (response && response.users) {
                response.users.forEach(user => {
                    const userIndex = UsersStore.peopleFlatIds.indexOf(user.id);
                    if (userIndex !== -1) {
                        const userDetails = UsersStore.people[userIndex];
                        userDetails.loading = false;
                        userDetails.lastFetchTimestamp = Date.now();
                        userDetails.data = {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            firstName: user.first_name,
                            lastName: user.last_name,
                            fullName: user.full_name,
                            initials: user.initials,
                            image: user.image,
                            typeId: user.type_id,
                            typeName: user.type_name,
                            status: user.status ? true : false,
                        };
                    }
                });
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public fetchUserById = async (id: number, forceFetch: boolean = false): Promise<boolean> => {
        try {
            let userIndex = UsersStore.peopleFlatIds.indexOf(id);

            if (
                forceFetch ||
                userIndex === -1 ||
                (userIndex !== -1 &&
                    UsersStore.people[userIndex].loading === false &&
                    DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, UsersStore.people[userIndex].lastFetchTimestamp))
            ) {
                if (userIndex !== -1) {
                    UsersStore.people[userIndex].loading = true;
                } else {
                    UsersStore.people.push({
                        id,
                        loading: true,
                        lastFetchTimestamp: 0,
                        data: null,
                    });
                }

                const person = (await API.getData(APIPath.USERS + '/' + id)) as OtherUserFromApi;

                const mappedPerson: OtherUser = {
                    id: person.id,
                    username: person.username,
                    email: person.email,
                    firstName: person.first_name,
                    lastName: person.last_name,
                    fullName: person.full_name,
                    initials: person.initials,
                    image: person.image,
                    typeId: person.type_id,
                    typeName: person.type_name,
                    status: person.status ? true : false,
                };

                userIndex = UsersStore.peopleFlatIds.indexOf(id);
                if (userIndex !== -1) {
                    userIndex = UsersStore.peopleFlatIds.indexOf(id);
                    UsersStore.people[userIndex].id = id;
                    UsersStore.people[userIndex].loading = false;
                    UsersStore.people[userIndex].lastFetchTimestamp = Date.now();
                    UsersStore.people[userIndex].data = mappedPerson;
                } else {
                    UsersStore.people.push({
                        id,
                        loading: false,
                        lastFetchTimestamp: Date.now(),
                        data: mappedPerson,
                    });
                }
            }

            return true;
        } catch (error) {
            const userIndex = UsersStore.peopleFlatIds.indexOf(id);
            if (userIndex !== -1) {
                UsersStore.people[userIndex].loading = false;
            }
            throw error;
        }
    };

    @action
    public fetchUsersByType = async (typesIds: number[], forceFetch: boolean = false): Promise<boolean> => {
        try {
            const typesIdsToRefresh: number[] = forceFetch
                ? typesIds
                : typesIds.filter(typeId => {
                      const userFetchByTypeIndex = UsersStore.peopleFetchedByTypeFlatIds.indexOf(typeId);
                      if (
                          userFetchByTypeIndex === -1 ||
                          (userFetchByTypeIndex !== -1 &&
                              UsersStore.peopleFetchesByType[userFetchByTypeIndex].loading === false &&
                              DateHandler.checkIfTimeStampIsOlderThanXMinutes(
                                  5,
                                  UsersStore.peopleFetchesByType[userFetchByTypeIndex].lastFetchTimestamp
                              ))
                      ) {
                          return true;
                      }

                      return false;
                  });

            if (typesIdsToRefresh.length > 0) {
                typesIdsToRefresh.map(typeId => {
                    const typeIdFetchIndex = UsersStore.peopleFetchedByTypeFlatIds.indexOf(typeId);
                    if (typeIdFetchIndex !== -1) {
                        UsersStore.peopleFetchesByType[typeIdFetchIndex].loading = true;
                    } else {
                        UsersStore.peopleFetchesByType.push({
                            typeId,
                            loading: true,
                            typeName: '',
                            lastFetchTimestamp: 0,
                        });
                    }
                });

                const response = (await API.getData(APIPath.USERS, {
                    type: JSON.stringify(typesIdsToRefresh),
                    length: 99999,
                })) as UsersListFromApi;

                typesIdsToRefresh.map(typeId => {
                    const typeIdFetchIndex = UsersStore.peopleFetchedByTypeFlatIds.indexOf(typeId);
                    if (typeIdFetchIndex !== -1) {
                        const findOneUser = response.users.find(user => user.type_id === typeId);
                        UsersStore.peopleFetchesByType[typeIdFetchIndex].typeName =
                            typeof findOneUser !== 'undefined'
                                ? findOneUser.type_name
                                : UsersStore.peopleFetchesByType[typeIdFetchIndex].typeName;
                        UsersStore.peopleFetchesByType[typeIdFetchIndex].loading = false;
                        UsersStore.peopleFetchesByType[typeIdFetchIndex].lastFetchTimestamp = Date.now();
                    }
                });

                response.users.map(user => {
                    const userIndex = UsersStore.peopleFlatIds.indexOf(user.id);
                    if (userIndex !== -1 && UsersStore.people[userIndex]) {
                        UsersStore.people[userIndex].loading = false;
                        UsersStore.people[userIndex].lastFetchTimestamp = Date.now();
                        UsersStore.people[userIndex].data = {
                            id: user.id,
                            typeId: user.type_id,
                            typeName: user.type_name,
                            username: user.username,
                            email: user.email,
                            firstName: user.first_name,
                            lastName: user.last_name,
                            fullName: user.full_name,
                            initials: user.initials,
                            image: user.image,
                            status: user.status ? true : false,
                        };
                        UsersStore.people[userIndex].lastFetchTimestamp = Date.now();
                    } else {
                        UsersStore.people.push({
                            id: user.id,
                            loading: false,
                            lastFetchTimestamp: Date.now(),
                            data: {
                                id: user.id,
                                username: user.username,
                                email: user.email,
                                firstName: user.first_name,
                                lastName: user.last_name,
                                fullName: user.full_name,
                                initials: user.initials,
                                image: user.image,
                                typeId: user.type_id,
                                typeName: user.type_name,
                                status: user.status ? true : false,
                            },
                        });
                    }
                });
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public fetchUsersByClass = async (
        userClasses: UserTypeClassId[],
        forceFetch: boolean = false
    ): Promise<boolean> => {
        try {
            const fetchClasses: UserTypeClassId[] = userClasses.filter(classId => {
                if (forceFetch) {
                    return true;
                }

                const classFetched = UsersStore.peopleFetchesByClass.find(fetchData => fetchData.classId === classId);
                if (
                    classFetched &&
                    (classFetched.loading ||
                        DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, classFetched.lastFetchTimestamp) === false)
                ) {
                    return false;
                }

                return true;
            });

            await Promise.all(
                fetchClasses.map(async fetchClass => {
                    // Check if class exists
                    let fetchClassIndexMatch = UsersStore.peopleFetchedByClassFlatIds.indexOf(fetchClass);
                    if (fetchClassIndexMatch !== -1) {
                        UsersStore.peopleFetchesByClass[fetchClassIndexMatch].loading = true;
                    } else {
                        UsersStore.peopleFetchesByClass.push({
                            classId: fetchClass,
                            loading: true,
                            lastFetchTimestamp: 0,
                            userTypesIds: [],
                        });
                    }

                    // Fetch
                    const response = (await API.getData(APIPath.USERS, {
                        class: JSON.stringify(fetchClass),
                        length: 999999,
                    })) as UsersListFromApi;

                    // Storage
                    const users: OtherUserDetails[] = [];
                    const userTypesIds: number[] = [];
                    const userTypes: Array<{ id: number; name: string }> = [];

                    // Check if any users are returned
                    if (response && response.users) {
                        // Get current timestamp
                        const now = Date.now();

                        // Iterate all users and format them
                        response.users.map(user => {
                            // Populate formatted users array
                            users.push({
                                id: user.id,
                                loading: false,
                                lastFetchTimestamp: now,
                                data: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email,
                                    firstName: user.first_name,
                                    lastName: user.last_name,
                                    fullName: user.full_name,
                                    initials: user.initials,
                                    image: user.image,
                                    typeId: user.type_id,
                                    typeName: user.type_name,
                                    status: user.status ? true : false,
                                },
                            });

                            // Populate type IDs
                            if (userTypesIds.indexOf(user.type_id) === -1) {
                                userTypesIds.push(user.type_id);
                                userTypes.push({
                                    id: user.type_id,
                                    name: user.type_name,
                                });
                            }
                        });

                        // Update fetch class status
                        const fetchClassMatch = UsersStore.peopleFetchesByClass.find(c => c.classId === fetchClass);
                        if (fetchClassMatch) {
                            fetchClassMatch.loading = false;
                            fetchClassMatch.lastFetchTimestamp = now;
                            fetchClassMatch.userTypesIds = userTypesIds;
                        }

                        // Update user types included in response
                        await userTypes.map(async userType => {
                            const userTypeIndexMatch = UsersStore.peopleFetchedByTypeFlatIds.indexOf(userType.id);
                            if (userTypeIndexMatch !== -1) {
                                UsersStore.peopleFetchesByType[userTypeIndexMatch].lastFetchTimestamp = now;
                                UsersStore.peopleFetchesByType[userTypeIndexMatch].typeName = userType.name;
                            } else {
                                UsersStore.peopleFetchesByType.push({
                                    typeId: userType.id,
                                    typeName: userType.name,
                                    loading: false,
                                    lastFetchTimestamp: now,
                                });
                            }
                        });

                        // Update all returned users
                        await users.map(async user => {
                            const userIndexMatch = UsersStore.peopleFlatIds.indexOf(user.id);
                            if (userIndexMatch !== -1) {
                                const userMatch = UsersStore.people[userIndexMatch];
                                userMatch.lastFetchTimestamp = now;
                                userMatch.data = user.data;
                            } else {
                                UsersStore.people.push(user);
                            }
                        });

                        return response.users;
                    } else {
                        return [];
                    }
                })
            );

            return true;
        } catch (error) {
            throw error;
        }
    };
}
