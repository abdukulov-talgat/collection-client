import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { getTopics } from '../../shared/constants/topics';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectTopicProps {
    register: UseFormRegisterReturn;
}

const SelectTopic = ({ register }: SelectTopicProps) => {
    const topics = getTopics();

    return (
        <FormControl>
            <Select defaultValue={topics[0].id} {...register}>
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
