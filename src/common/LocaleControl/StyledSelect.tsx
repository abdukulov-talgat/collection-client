import { Select, styled } from '@mui/material';

const StyledSelect = styled(Select)(({ theme }) => ({
    color: 'inherit',
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#fff',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '& .MuiSvgIcon-root': { color: 'inherit' },
}));

export { StyledSelect };
