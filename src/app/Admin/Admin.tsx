import React, { useEffect, useState } from 'react';
import withAdminRole from '../../hocs/withAdminRole';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { http } from '../../shared/http/http';
import { Pagination } from '@mui/material';
import UsersTable from './UsersTable';
import { User } from '../../types/User';

const USERS_PER_PAGE = 5;

const Admin = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        http.get(`${apiRoutes.USERS}?limit=${USERS_PER_PAGE}&page=${page}`).then((response) => {
            setUsers(response.data.data);
            setTotal(response.data.total);
        });
    }, [page]);

    return (
        <>
            <UsersTable users={users} />
            <Pagination
                page={page}
                count={Math.ceil(total / USERS_PER_PAGE)}
                onChange={(event, page) => setPage(page)}
            />
        </>
    );
};

export { Admin };
export default withAdminRole(Admin);
