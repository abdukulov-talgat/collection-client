import React from 'react';
import { Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Search } from './StyledSearch';
import { SearchIconWrapper } from './StyledSearchIconWrapper';
import { StyledInputBase } from './StyledInputBase';

type SearchInputs = {
    query: string;
};

const SearchBar = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchInputs>();
    const intl = useIntl();

    const handleFormSubmit = (data: SearchInputs) => {
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
                                message: intl.formatMessage({ id: 'app.navigation.search.errorMessage' }),
                            },
                        })}
                        placeholder={intl.formatMessage({ id: 'app.navigation.search.placeholder' })}
                        error={!!errors.query}
                    />
                </Search>
            </Tooltip>
        </form>
    );
};

export default SearchBar;
