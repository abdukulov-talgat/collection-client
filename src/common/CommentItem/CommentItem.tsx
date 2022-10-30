import React from 'react';
import { Comment } from '../../types/Comment';
import { Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

interface CommentItemProps {
    comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
    return (
        <Grid item xs={12} border={1} mb={1} p={1}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography component="div">
                        <Typography component="b" variant="h6" mr={1}>
                            <FormattedMessage id="app.commentList.author" />
                        </Typography>
                        {comment.user.email}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography py={1}>{comment.text}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CommentItem;
