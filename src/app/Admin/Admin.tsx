import React, { useEffect, useState } from 'react';
import withAdminRole from '../../hocs/withAdminRole';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { http } from '../../shared/http/http';
import UsersTable from './UsersTable';
import { User } from '../../types/User';

const Admin = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        http.get(apiRoutes.USERS).then((response) => {
            setUsers(response.data);
        });
    }, []);

    return (
        <>
            <UsersTable users={users} />
        </>
    );
};

export { Admin };
export default withAdminRole(Admin);
