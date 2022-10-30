import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { CustomFieldSchema } from '../../types/CustomFieldSchema';
import CustomFieldSelector from '../../common/CustomFieldSelector/CustomFieldSelector';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { Tag } from '../../types/Tag';
import { appRoutes } from '../../shared/constants/appRoutes';

const ItemCreate = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, control } = useForm();
    const customFieldsSchema: CustomFieldSchema[] = JSON.parse(state.customColumns);

    const handleFormSubmit = async ({ name, tags, ...customColumns }: any) => {
        const data = {
            name,
            collectionId: state.id,
            userId: state.userId,
            tags: tags ? tags.map((t: any) => t.value) : null,
            customColumns,
        };
        await http.post(`${apiRoutes.ITEMS}`, data);
        navigate(`${appRoutes.COLLECTION_ROOT}/${state.id}`);
    };

    const promiseOptions = (inputValue: string) => {
        return new Promise<any>(async (resolve) => {
            const response = await http.get<Tag[]>(`${apiRoutes.TAGS}?like=${inputValue}`);
            resolve(response.data.map((tag) => ({ value: tag.value, label: tag.value })));
        });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    {...register('name', { required: { value: true, message: 'app.form.required' } })}
                    label="Name"
                />
                <Controller
                    name="tags"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <AsyncCreatableSelect
                            cacheOptions
                            loadOptions={promiseOptions}
                            isMulti
                            styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
                            onChange={onChange}
                        />
                    )}
                />
                {customFieldsSchema.map((field, index) => (
                    <CustomFieldSelector key={index} register={register} schema={field} />
                ))}
                <Box sx={{ display: 'flex', gap: '1em' }}>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Box>
            </Box>
            <div>{JSON.stringify(state)}</div>
        </form>
    );
};

export { ItemCreate };
export default withAuth(ItemCreate);
