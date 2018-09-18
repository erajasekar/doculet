import {UserType} from '../store/modules/user';
import Constants from '../utils/constants';

export function isAuthenticated(user: UserType) {
    // TODO Should also check for expiration of FB accessToken
    return user != null &&
        user !== undefined &&
        localStorage.getItem(Constants.ACCESS_TOKEN_PROPERTY);
}

export function isViewPage(path: string) {
    return path.includes(Constants.VIEW_URL_PATTERN);
}
