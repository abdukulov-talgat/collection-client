import React from 'react';
import { User } from '../../types/User';
import { Button, Link, TableCell, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';

interface UsersRowProps {
    user: User;
}

const UsersRow = ({ user }: UsersRowProps) => {
    return (
        <TableRow>
            <TableCell>{user.id}</TableCell>
            <TableCell>
                <Link component={RouterLink} to={`${appRoutes.PROFILE}/${user.id}`}>
                    {user.email}
                </Link>
            </TableCell>
            <TableCell>
                <FormattedMessage id={user.isBanned ? 'app.admin.users.isBanned.yes' : 'app.admin.users.isBanned.no'} />
            </TableCell>
            <TableCell>{user.roles.join(', ')}</TableCell>
            <TableCell>
                <Button component={RouterLink} to={`${appRoutes.EDIT_USER}/${user.id}`}>
                    Edit
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default UsersRow;
