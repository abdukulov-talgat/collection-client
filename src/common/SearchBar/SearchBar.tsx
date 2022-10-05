import React from 'react';
import { alpha, InputBase, styled, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SubmitHandler, useForm } from 'react-hook-form';

type SearchInputs = {
    query: string;
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

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

const SearchBar = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchInputs>();

    const handleFormSubmit: SubmitHandler<SearchInputs> = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Tooltip title={errors.query?.message} open={!!errors.query} arrow={true}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        {...register('query', {
                            required: {
                                value: true,
                                message: 'This is field is required',
                            },
                        })}
                        placeholder="Search..."
                        error={!!errors.query}
                    />
                </Search>
            </Tooltip>
        </form>
    );
};

export default SearchBar;
