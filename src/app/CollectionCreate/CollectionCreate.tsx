import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { http } from '../../shared/http/http';
import withAuth from '../../hocs/withAuth';
import SelectFieldType from '../../common/SelectFieldType/SelectFieldType';
import SelectTopic from '../../common/SelectTopic/SelectTopic';

const CollectionCreate = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { register, control, handleSubmit } = useForm();
    const { append, fields } = useFieldArray({ name: 'customColumns', control: control });

    const handleFormSubmit = (data: any) => {
        http.post('/collections', data).then((response) => {
            navigate(-1);
        });
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
                            {...register(`customColumns.${i}.name`, { required: true })}
                        />
                        <SelectFieldType register={register(`customColumns.${i}.type`, { required: true })} />
                    </Box>
                ))}
                <Button type="button" onClick={() => append({})}>
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
