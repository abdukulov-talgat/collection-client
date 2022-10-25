import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const UsersTableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <FormattedMessage id="app.admin.users.id" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="app.admin.users.email" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="app.admin.users.isBanned" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="app.admin.users.roles" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="app.admin.users.edit" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default UsersTableHeader;
