import { styled } from '@mui/material';

const SearchIconWrapper = styled('div')(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export { SearchIconWrapper };
