import { action } from 'mobx';
import { has as _has } from 'lodash';
import { API, APIPath } from 'fetch';
import { LoginRefreshResponse } from 'types/login';
import { LoginStore, UserStore } from 'store/AllStores';
import { LoginStatus } from 'types/statuses';
import { UserDataApiResponse, RawUserApiResponse } from 'types/user';

export class UserActionsClass {
    @action
    public login = async (username: string, password: string): Promise<UserDataApiResponse> => {
        try {
            if (username.trim() === '' && password.trim() === '') {
                LoginStore.status = LoginStatus.ErrorBothFieldsRequired;
                throw 'Both fields are required';
            }

            LoginStore.status = LoginStatus.SigningIn;

            const response = (await API.postData(
                APIPath.LOGIN,
                { username, password },
                null,
                'post-data',
                false
            )) as RawUserApiResponse;

            if (
                !response ||
                !response.data ||
                (response && response.data && response.data.status === 0) ||
                (typeof response.data === 'undefined' || response.data === null)
            ) {
                throw 'Login error';
            }

            if (
                !_has(response, 'data.data.token') ||
                response.data.data.token === null ||
                response.data.data.token === ''
            ) {
                throw 'Token does not exist';
            }

            if (
                response.data.status === 0 ||
                (typeof response.data.status === 'boolean' && response.data.status === false)
            ) {
                throw 'User is inactive';
            }

            this.setUserAuthenticationToken(response.data.data.token);
            this.setUserData(response.data.data);

            return response.data.data;
        } catch (error) {
            if (LoginStore.status === LoginStatus.SigningIn) {
                LoginStore.status = LoginStatus.Error;
            }

            throw error;
        }
    };

    @action
    public logout = async (): Promise<boolean> => {
        try {
            await API.getData(APIPath.LOGOUT);

            UserStore.data = null;
            UserStore.token = null;

            LoginStore.status = LoginStatus.None;
            LoginStore.username = '';
            LoginStore.password = '';

            if (typeof Storage !== 'undefined') {
                localStorage.removeItem(API.AUTH_HEADER);
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    public verifyLoggedInUserData = async (): Promise<UserDataApiResponse> => {
        try {
            const response = (await this.fetchLoggedInUserData()) as UserDataApiResponse;
            return response;
        } catch (error) {
            throw error;
        }
    };

    public fetchLoggedInUserData = async (): Promise<UserDataApiResponse> => {
        try {
            const response = (await API.getData(APIPath.LOGIN)) as UserDataApiResponse;

            if (typeof response === 'undefined' || response === null) {
                throw 'No data returned';
            }

            this.setUserData(response);

            return response;
        } catch (error) {
            throw error;
        }
    };

    public refreshToken = async (): Promise<boolean> => {
        try {
            const token = API.getAuthenticationToken();

            if (!token) {
                throw 'No token saved';
            }

            const refresh = (await API.getData(APIPath.LOGIN_REFRESH)) as LoginRefreshResponse;

            this.setUserAuthenticationToken(refresh.token);

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public changePassword = async (userId: number, oldPassword: string, newPassword: string): Promise<boolean> => {
        try {
            await API.putData(APIPath.USERS + '/' + userId, {
                old_password: oldPassword,
                password: newPassword,
            });

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public changeProfileInfo = async (userId: number, email: string): Promise<boolean> => {
        try {
            email = email.trim();

            await API.putData(APIPath.USERS + '/' + userId, {
                email,
            });

            if (UserStore.data) {
                UserStore.data.email = email;
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public changeProfilePicture = async (userId: number, base64Image: string): Promise<boolean> => {
        try {
            await API.putData(APIPath.USERS + '/' + userId, {
                image: base64Image,
            });

            if (UserStore.data) {
                UserStore.data.image = base64Image;
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    public setUserAuthenticationToken = (token: string) => {
        if (typeof Storage !== 'undefined') {
            UserStore.token = token;
            localStorage.setItem(API.AUTH_HEADER, token);
        }
    };

    public setUserData = (userData: UserDataApiResponse) => {
        UserStore.data = {
            id: userData.user_id,
            username: userData.username,
            email: userData.email,
            name: {
                first: userData.first_name,
                last: userData.last_name,
                full: userData.full_name,
            },
            initials: userData.initials ? userData.initials : '',
            image: userData.image,
            allowedRouteKeys: Object.keys(userData.page_access).reduce((allowedRoutes: string[], routeAccessKey) => {
                const isAllowed: boolean | null =
                    typeof userData.page_access[routeAccessKey] !== 'undefined'
                        ? userData.page_access[routeAccessKey]
                        : false;
                if (isAllowed) {
                    allowedRoutes.push(routeAccessKey);
                }
                return allowedRoutes;
            }, []),
            rates: {
                minHour: userData.min_hour,
                hourlyRate: userData.hourly_rate,
                salaryAmount: userData.salary_amount,
                salaryType: userData.salary_type,
            },
            type: {
                id: userData.type_id,
                name: userData.type_name,
            },
            isActive: userData.status ? true : false,
        };
    };
}
