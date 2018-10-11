import {UserType} from '../store/modules/user';
import Constants from '../utils/constants';

export function isAuthenticated(user: UserType) {
    // TODO Should also check for expiration of FB accessToken
    return user != null &&
        user !== undefined &&
        localStorage.getItem(Constants.ACCESS_TOKEN_PROPERTY);
}

export function isViewPage(path: string) {
    return checkForPagePattern(Constants.VIEW_URL_PATTERN, path);
}

export function isEditPage(path: string) {
    return checkForPagePattern(Constants.EDIT_URL_PATTERN, path);
}

export function isSharePage(path: string) {
    return checkForPagePattern(Constants.SHARE_URL_PATTERN, path);
}

export function isGuidePage(path: string) {
    return checkForPagePattern(Constants.GUIDE_URL_PATTERN, path);
}

function checkForPagePattern(pattern: string, path: string) {
    return  path.includes(pattern);
}
