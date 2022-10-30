import { ConcreteItem } from '../../types/Item';
import { CustomFieldSchema } from '../../types/CustomFieldSchema';
import { humanizeCustomField } from './humanizeCustomField';

export class ItemShowColumnHelper {
    private columnSchema: CustomFieldSchema[] = [];
    private item: ConcreteItem;

    constructor(item: ConcreteItem) {
        this.item = item;
        if (item.collection.customColumns) {
            this.columnSchema = JSON.parse(item.collection.customColumns);
        }
    }

    getFieldEntries() {
        return this.columnSchema.map((schema) => ({
            name: schema.name,
            value: humanizeCustomField(schema, this.item.customColumns[schema.name]),
        }));
    }
}
