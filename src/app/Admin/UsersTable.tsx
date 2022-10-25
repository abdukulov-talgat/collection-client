import React from 'react';
import { User } from '../../types/User';
import { Table, TableBody, TableContainer } from '@mui/material';
import UsersRow from './UsersRow';
import UsersTableHeader from './UsersTableHeader';

interface UsersTableProps {
    users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
    return (
        <TableContainer>
            <Table>
                <UsersTableHeader />
                <TableBody>
                    {users.map((u) => (
                        <UsersRow key={u.id} user={u} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;
