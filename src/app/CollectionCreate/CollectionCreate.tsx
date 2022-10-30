import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { http } from '../../shared/http/http';
import withAuth from '../../hocs/withAuth';
import SelectFieldType from '../../common/SelectFieldType/SelectFieldType';
import SelectTopic from '../../common/SelectTopic/SelectTopic';
import { fieldTypes } from '../../shared/constants/fieldTypes';
import MDEditor from '@uiw/react-md-editor';
import { getTopics } from '../../shared/constants/topics';

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
    const [description, setDescription] = useState<string | undefined>();
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
        formData.set('description', description || '');
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <input type="hidden" {...register('userId')} value={state.userId} />
                <TextField label="Name" {...register('name', { required: true })} />
                <MDEditor value={description} onChange={setDescription} />
                <SelectTopic register={register('topicId', { required: true })} defaultValue={getTopics()[0].value} />
                <TextField
                    type="file"
                    {...register('img')}
                    hidden
                    InputProps={{ inputProps: { accept: 'image/jpg,image/jpeg,image/png' } }}
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
                <Box sx={{ display: 'flex', gap: '1em' }}>
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={() => append({ name: '', type: fieldTypes.STRING })}
                    >
                        Add field
                    </Button>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export { CollectionCreate };
export default withAuth(CollectionCreate);
