import { Drawer, styled } from '@mui/material';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    display: 'block',
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
    '& .MuiPaper-root': {
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.mode,
        color: '#fff',
        gap: '1rem',
        padding: '1rem',
        minWidth: '30%',
    },
}));

export { StyledDrawer };
