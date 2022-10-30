import { Item } from '../../types/Item';
import { GridColDef } from '@mui/x-data-grid';
import { CustomFieldSchema } from '../../types/CustomFieldSchema';
import { extractTags } from './extractTags';
import { humanizeCustomField } from './humanizeCustomField';
import { ConcreteCollection } from '../../types/ConcreteCollection';

export class ItemsDataGridHelper {
    private collection: ConcreteCollection;

    private items: Item[];

    private defaultColumns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'tags', headerName: 'Tags', flex: 1, renderCell: (params) => params.value.join(', ') },
    ];

    private customColumns: GridColDef[] = [];

    private customColumnsSchema: CustomFieldSchema[] = [];

    constructor(collection: ConcreteCollection, items: Item[]) {
        this.collection = collection;
        this.items = items;
        if (collection.customColumns) {
            this.customColumnsSchema = JSON.parse(collection.customColumns);
            this.customColumnsSchema.forEach((it) =>
                this.customColumns.push({ field: it.name, headerName: it.name, flex: 1 })
            );
        }
    }

    getGridColumns() {
        return this.defaultColumns.concat(this.customColumns);
    }

    getGridRows() {
        return this.items.map((item) => {
            let row: { [key: string]: any } = {
                id: item.id,
                name: item.name,
                tags: extractTags(item.tags),
            };
            this.customColumnsSchema.forEach((it) => {
                row[it.name] = humanizeCustomField(it, item.customColumns[it.name]);
            });
            return row;
        });
    }
}
