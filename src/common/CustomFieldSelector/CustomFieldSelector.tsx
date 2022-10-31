import React from 'react';
import { CustomFieldSchema } from '../../types/CustomFieldSchema';
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { CustomColumnTypes } from '../../types/CustomColumnTypes';

interface CustomFieldSelectorProps {
    schema: CustomFieldSchema;
    register: UseFormRegister<FieldValues>;
    defaultValue?: any;
}

const CustomFieldSelector = ({ schema, register, defaultValue = '' }: CustomFieldSelectorProps) => {
    if (schema.type === CustomColumnTypes.BOOLEAN) {
        return (
            <Box>
                <FormControlLabel
                    label={schema.name}
                    control={<Checkbox />}
                    {...register(schema.name)}
                    defaultValue={defaultValue}
                />
            </Box>
        );
    }

    if (schema.type === CustomColumnTypes.INTEGER) {
        return <TextField label={schema.name} type="number" {...register(schema.name)} defaultValue={defaultValue} />;
    }

    if (schema.type === CustomColumnTypes.DATE) {
        return (
            <TextField
                InputLabelProps={{ shrink: true }}
                label={schema.name}
                type="date"
                {...register(schema.name)}
                defaultValue={defaultValue}
            />
        );
    }

    if (schema.type === CustomColumnTypes.TEXT) {
        return (
            <TextField
                label={schema.name}
                {...register(schema.name)}
                multiline
                rows={5}
                defaultValue={defaultValue}
                InputLabelProps={{ shrink: true }}
            />
        );
    }

    return <TextField label={schema.name} {...register(schema.name)} defaultValue={defaultValue} />;
};

export default CustomFieldSelector;
