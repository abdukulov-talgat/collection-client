import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { fieldTypes } from '../../shared/constants/fieldTypes';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectFieldTypeProps {
    register: UseFormRegisterReturn;
    defaultValue: string;
}

const SelectFieldType = ({ register, defaultValue }: SelectFieldTypeProps) => {
    return (
        <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Field type</InputLabel>
            <Select defaultValue={defaultValue} {...register} label="Field type">
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
