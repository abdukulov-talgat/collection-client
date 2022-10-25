import { appRoles } from '../constants/appRoles';

export const isAdmin = <T extends { roles: string[] }>(authInfo: T) => {
    return authInfo.roles.includes(appRoles.ADMIN);
};
