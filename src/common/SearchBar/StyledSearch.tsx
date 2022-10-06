import { styled } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

export { Search };
