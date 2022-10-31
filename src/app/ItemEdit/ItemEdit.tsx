import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { CustomFieldSchema } from '../../types/CustomFieldSchema';
import CustomFieldSelector from '../../common/CustomFieldSelector/CustomFieldSelector';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { Tag } from '../../types/Tag';
import { appRoutes } from '../../shared/constants/appRoutes';
import { FormattedMessage, useIntl } from 'react-intl';
import { ConcreteItem } from '../../types/ConcreteItem';

const ItemEdit = () => {
    const { id } = useParams();
    const [item, setItem] = useState<ConcreteItem>();
    const navigate = useNavigate();
    const { register, handleSubmit, control } = useForm();
    const intl = useIntl();

    useEffect(() => {
        http.get(`${apiRoutes.ITEMS}/${id}`).then((response) => {
            setItem(response.data);
        });
    }, [id]);

    if (!item) {
        return <CircularProgress />;
    }

    const customFieldsSchema: CustomFieldSchema[] = JSON.parse(item.collection.customColumns);

    const handleFormSubmit = async (d: any) => {
        const { name, tags, ...customColumns } = d;
        const data = {
            id: item.id,
            collectionId: item.collectionId,
            userId: item.collection.userId,
            name,
            tags: tags ? tags.map((t: any) => t.value) : null,
            customColumns,
        };
        await http.put(`${apiRoutes.ITEMS}`, data);
        navigate(`${appRoutes.COLLECTION_ROOT}/${item.collectionId}`);
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
                    defaultValue={item.name}
                    {...register('name', { required: { value: true, message: 'app.form.required' } })}
                    label={intl.formatMessage({ id: 'app.itemCreate.name' })}
                />
                <Controller
                    name="tags"
                    control={control}
                    defaultValue={item.tags.map((tag) => ({ value: tag.value, label: tag.value }))}
                    render={({ field: { onChange } }) => (
                        <AsyncCreatableSelect
                            cacheOptions
                            defaultValue={item.tags.map((tag) => ({ value: tag.value, label: tag.value }))}
                            loadOptions={promiseOptions}
                            isMulti
                            styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
                            onChange={onChange}
                            placeholder={intl.formatMessage({ id: 'app.itemCreate.tags' })}
                        />
                    )}
                />
                {customFieldsSchema.map((field, index) => (
                    <CustomFieldSelector
                        key={index}
                        register={register}
                        schema={field}
                        defaultValue={item.customColumns[field.name]}
                    />
                ))}
                <Box>
                    <Button type="submit" variant="contained">
                        <FormattedMessage id="app.button.submit" />
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export { ItemEdit };
export default withAuth(ItemEdit);
