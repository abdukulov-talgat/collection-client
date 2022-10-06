import { alpha, InputBase, styled } from '@mui/material';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: theme.spacing(5),
        transition: theme.transitions.create('width'),
        backgroundColor: alpha(theme.palette.text.primary, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.text.primary, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: `120px`,
            '&:focus': {
                width: '150px',
            },
        },
        borderRadius: theme.shape.borderRadius,
    },
    '&.Mui-error .MuiInputBase-input': {
        outline: `1px solid ${theme.palette.error.main}`,
    },
}));

export { StyledInputBase };
