import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { getTopics } from '../../shared/constants/topics';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectTopicProps {
    register: UseFormRegisterReturn;
    defaultValue: string;
}

const SelectTopic = ({ register, defaultValue }: SelectTopicProps) => {
    const topics = getTopics();
    let index = topics.findIndex((t) => t.value === defaultValue);
    index = index === -1 ? 0 : index;

    return (
        <FormControl>
            <Select defaultValue={topics[index].id} {...register}>
                {topics.map((t) => (
                    <MenuItem key={t.id} value={t.id}>
                        {t.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectTopic;
