import React, { useEffect, useState } from 'react';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { ConcreteCollection } from '../../types/Item';
import { DataGrid } from '@mui/x-data-grid';
import { ItemsDataGridHelper } from '../../shared/utils/ItemsDataGridHelper';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';

interface CollectionItemsProps {
    collection: ConcreteCollection;
}

const CollectionItems = ({ collection }: CollectionItemsProps) => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const dataGridHelper = new ItemsDataGridHelper(collection, items);

    useEffect(() => {
        http.get(`${apiRoutes.ITEMS}?collectionId=${collection.id}`).then((response) => {
            setItems(response.data);
        });
    }, [collection.id]);

    return (
        <>
            <div>ItemsList for collection {collection.id}</div>
            <DataGrid
                columns={dataGridHelper.getGridColumns()}
                rows={dataGridHelper.getGridRows()}
                autoHeight
                onCellClick={(params) => navigate(`${appRoutes.ITEM_ROOT}/${params.id}`)}
            />
        </>
    );
};

export default CollectionItems;
