import { Tag } from '../../types/Tag';

export const extractTags = (tags: Tag[]) => {
    return tags.map((it) => it.value);
};
