import { appRoles } from '../constants/appRoles';

interface IncludeRoles {
    roles: string[];
}

export const isAdmin = <T extends IncludeRoles>(authInfo: T) => {
    return authInfo.roles.includes(appRoles.ADMIN);
};
