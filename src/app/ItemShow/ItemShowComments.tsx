import React, { useEffect, useState } from 'react';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import CommentForm, { CommentFormInputs } from '../../common/CommentForm/CommentForm';
import CommentList from '../../common/CommentList/CommentList';
import { Comment } from '../../types/Comment';
import { io } from 'socket.io-client';

interface ItemShowCommentsProps {
    itemId: number;
}

const ItemShowComments = ({ itemId }: ItemShowCommentsProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        http.get(`${apiRoutes.ITEMS}/${itemId}/comments`).then((response) => setComments(response.data));
    }, [itemId]);

    useEffect(() => {
        const socket = io('http://localhost:3000', { auth: { itemRoomId: itemId } });
        socket.on('connect', function () {
            console.log('connected');
        });
        socket.on('app.item.comment.create', function (comment: Comment) {
            setComments((prevState) => [...prevState, comment]);
        });
        socket.on('exception', function () {
            console.log('exception');
        });
        socket.on('disconnect', function () {
            console.log('disconnect');
        });
        return () => {
            socket.disconnect();
        };
    }, [itemId]);

    const handleFormSubmit = async (data: CommentFormInputs) => {
        try {
            setIsSending(true);
            await http.post(`${apiRoutes.ITEMS}/${itemId}/comments`, data);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div>
            <CommentList comments={comments} />
            <CommentForm onSubmit={handleFormSubmit} isSending={isSending} text={text} onTextChange={setText} />
        </div>
    );
};

export default ItemShowComments;
