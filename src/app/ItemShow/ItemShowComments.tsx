import React, { useEffect, useState } from 'react';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';

interface ItemShowCommentsProps {
    itemId: number;
}

const ItemShowComments = ({ itemId }: ItemShowCommentsProps) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        http.get(`${apiRoutes.ITEMS}/${itemId}/comments`).then((response) => setComments(response.data));
    }, [itemId]);

    return (
        <div>
            <div>Comment list</div>
            <div>{comments.map((c) => JSON.stringify(c))}</div>
        </div>
    );
};

export default ItemShowComments;
