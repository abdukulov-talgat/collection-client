import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { ConcreteItem } from '../../types/ConcreteItem';
import SearchShow from './SearchShow';

const TagsSearchShow = () => {
    const { tag } = useParams();
    const [items, setItems] = useState<ConcreteItem[]>([]);

    useEffect(() => {
        http.get(`${apiRoutes.TAGS_SEARCH}?tags=${tag}`).then((response) => setItems(response.data));
    }, [tag]);

    return <SearchShow items={items} />;
};

export default TagsSearchShow;
