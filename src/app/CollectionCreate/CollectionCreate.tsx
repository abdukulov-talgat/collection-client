import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { http } from '../../shared/http/http';
import withAuth from '../../hocs/withAuth';
import SelectFieldType from '../../common/SelectFieldType/SelectFieldType';
import SelectTopic from '../../common/SelectTopic/SelectTopic';
import { fieldTypes } from '../../shared/constants/fieldTypes';

interface CollectionCreateInputs {
    userId: number;
    name: string;
    description: string;
    topicId: number;
    img: File[];
    customColumns: {
        name: string;
        type: typeof fieldTypes[keyof typeof fieldTypes];
    }[];
}

const CollectionCreate = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { register, control, handleSubmit } = useForm<CollectionCreateInputs>();
    const { append, fields } = useFieldArray({ name: 'customColumns', control: control });

    const handleFormSubmit = (data: CollectionCreateInputs) => {
        const formData = prepareFormData(data);

        http.post('/collections', formData).then(() => {
            navigate(-1);
        });
    };

    const prepareFormData = (data: CollectionCreateInputs) => {
        const formData = new FormData();
        formData.set('name', data.name);
        formData.set('description', data.description);
        formData.set('userId', data.userId.toString());
        formData.set('topicId', data.topicId.toString());
        formData.set('customColumns', JSON.stringify(data.customColumns));
        if (data.img && data.img[0]) {
            formData.set('img', data.img[0]);
        }
        return formData;
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>{JSON.stringify(state)}</div>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <input type="hidden" {...register('userId')} value={state.userId} />
                <TextField label="Name" {...register('name', { required: true })} />
                <TextField label="Description" {...register('description', { required: true })} multiline rows={5} />
                <SelectTopic register={register('topicId', { required: true })} />
                <TextField
                    type="file"
                    {...register('img')}
                    hidden
                    InputProps={{ inputProps: { accept: 'image/jpg,image/png' } }}
                />
                {fields.map((f, i) => (
                    <Box key={f.id} sx={{ display: 'flex', gap: 3 }}>
                        <TextField
                            sx={{ flexGrow: 1 }}
                            label="Field Name"
                            {...register(`customColumns.${i}.name` as const, { required: true })}
                        />
                        <SelectFieldType
                            defaultValue={f.type}
                            register={register(`customColumns.${i}.type` as const, { required: true })}
                        />
                    </Box>
                ))}
                <Button type="button" onClick={() => append({ name: '', type: fieldTypes.STRING })}>
                    Add field
                </Button>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Box>
        </form>
    );
};

export { CollectionCreate };
export default withAuth(CollectionCreate);
