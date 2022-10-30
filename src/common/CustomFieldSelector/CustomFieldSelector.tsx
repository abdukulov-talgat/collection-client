import React from 'react';
import { CustomFieldSchema } from '../../types/CustomFieldSchema';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { CustomColumnTypes } from '../../types/CustomColumnTypes';

interface CustomFieldSelectorProps {
    schema: CustomFieldSchema;
    register: UseFormRegister<FieldValues>;
}

const CustomFieldSelector = ({ schema, register }: CustomFieldSelectorProps) => {
    if (schema.type === CustomColumnTypes.BOOLEAN) {
        return <FormControlLabel label={schema.name} control={<Checkbox />} {...register(schema.name)} />;
    }

    if (schema.type === CustomColumnTypes.INTEGER) {
        return <TextField label={schema.name} type="number" {...register(schema.name)} />;
    }

    if (schema.type === CustomColumnTypes.DATE) {
        return (
            <TextField InputLabelProps={{ shrink: true }} label={schema.name} type="date" {...register(schema.name)} />
        );
    }

    if (schema.type === CustomColumnTypes.TEXT) {
        return <TextField label={schema.name} {...register(schema.name)} multiline rows={5} />;
    }

    return <TextField label={schema.name} {...register(schema.name)} />;
};

export default CustomFieldSelector;
