import React, { useEffect, useState } from 'react';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import CommentForm, { CommentFormInputs } from '../../common/CommentForm/CommentForm';
import CommentList from '../../common/CommentList/CommentList';
import { Comment } from '../../types/Comment';
import { io } from 'socket.io-client';
import { websocketEvents } from '../../shared/constants/websocketEvents';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../shared/redux/authSlice';

interface ItemShowCommentsProps {
    itemId: number;
}

const ItemShowComments = ({ itemId }: ItemShowCommentsProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [text, setText] = useState('');
    const { isAuth } = useSelector(selectAuthState);

    useEffect(() => {
        http.get(`${apiRoutes.ITEMS}/${itemId}/comments`).then((response) => setComments(response.data));
    }, [itemId]);

    useEffect(() => {
        const socket = io('/', { auth: { itemRoomId: itemId } });
        socket.on(websocketEvents.ITEM_NEW_COMMENT, function (comment: Comment) {
            setComments((prevState) => [...prevState, comment]);
        });
        return () => {
            socket.disconnect();
        };
    }, [itemId]);

    const handleFormSubmit = async (data: CommentFormInputs) => {
        try {
            setIsSending(true);
            await http.post(`${apiRoutes.ITEMS}/${itemId}/comments`, data);
            setText('');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div>
            <CommentList comments={comments} />
            {isAuth && (
                <CommentForm onSubmit={handleFormSubmit} isSending={isSending} text={text} onTextChange={setText} />
            )}
        </div>
    );
};

export default ItemShowComments;
