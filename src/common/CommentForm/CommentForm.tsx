import React from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';

interface CommentFormProps {
    onSubmit: (data: CommentFormInputs) => void;
    isSending: boolean;
    text: string;
    onTextChange: (input: string) => void;
}

export interface CommentFormInputs {
    text: string;
}

const CommentForm = ({ onSubmit, isSending, text, onTextChange }: CommentFormProps) => {
    const { register, handleSubmit } = useForm<CommentFormInputs>();
    const intl = useIntl();

    const handleFormSubmit = (data: CommentFormInputs) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4" align="center" mb={3}>
                        <FormattedMessage id="app.commentForm.title" />
                    </Typography>
                </Grid>
                <Grid item xs={12} mb={2}>
                    <TextField
                        multiline
                        label={intl.formatMessage({ id: 'app.commentForm.message' })}
                        rows={7}
                        fullWidth
                        {...register('text')}
                        value={text}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => onTextChange(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} textAlign="right">
                    <Button type="submit" variant="contained" disabled={isSending}>
                        <FormattedMessage id="app.button.submit" />
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CommentForm;
