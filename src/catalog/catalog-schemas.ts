import { schema } from 'normalizr';

const threadSchema = new schema.Entity(
  'threads',
  {},
  {
    idAttribute: 'no',
    processStrategy: (entity, parent) => {
      return { ...entity, page: parent.page };
    }
  }
);
export const catalogSchema = new schema.Entity(
  'catalog',
  {
    threads: [threadSchema]
  },
  { idAttribute: 'page' }
);
