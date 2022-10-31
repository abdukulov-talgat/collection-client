import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ConcreteItem } from '../../types/ConcreteItem';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import SearchShow from './SearchShow';

const QuerySearchShow = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [items, setItems] = useState<ConcreteItem[]>([]);

    useEffect(() => {
        http.get(`${apiRoutes.SEARCH}?query=${query}`).then((response) => setItems(response.data));
    }, [query]);

    return <SearchShow items={items} />;
};

export default QuerySearchShow;
