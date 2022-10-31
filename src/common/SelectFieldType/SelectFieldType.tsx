import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { fieldTypes } from '../../shared/constants/fieldTypes';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectFieldTypeProps {
    register: UseFormRegisterReturn;
}

const SelectFieldType = ({ register }: SelectFieldTypeProps) => {
    return (
        <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Field type</InputLabel>
            <Select {...register} label="Field type" defaultValue={fieldTypes.STRING}>
                {Object.values(fieldTypes).map((fieldType) => (
                    <MenuItem key={fieldType} value={fieldType}>
                        {fieldType}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectFieldType;
