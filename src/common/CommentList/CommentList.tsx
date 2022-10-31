import React from 'react';
import { Comment } from '../../types/Comment';
import { Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import CommentItem from '../CommentItem/CommentItem';
import EmptyCommentList from '../EmptyCommentList/EmptyCommentList';

interface CommentListProps {
    comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h4" component="h4" align="center" mb={3}>
                    <FormattedMessage id="app.commentList.title" />
                </Typography>
            </Grid>
            {comments.length === 0 ? (
                <EmptyCommentList />
            ) : (
                comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
            )}
        </Grid>
    );
};

export default CommentList;
