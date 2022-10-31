import React from 'react';
import { Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Search } from './StyledSearch';
import { SearchIconWrapper } from './StyledSearchIconWrapper';
import { StyledInputBase } from './StyledInputBase';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';

type SearchInputs = {
    query: string;
};

const SearchBar = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm<SearchInputs>();
    const intl = useIntl();
    const navigate = useNavigate();

    const handleFormSubmit = (data: SearchInputs) => {
        navigate(`${appRoutes.SEARCH}?query=${data.query}`);
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
                                message: intl.formatMessage({ id: 'app.navigation.search.errorMessage' }),
                            },
                        })}
                        placeholder={intl.formatMessage({ id: 'app.navigation.search.placeholder' })}
                        onBlur={() => clearErrors()}
                    />
                </Search>
            </Tooltip>
        </form>
    );
};

export default SearchBar;
