import { ItemCreateType, ItemPaginateParams, ItemPaginateType, ItemType } from 'models/Item';
import { client } from './axios';

const fetchItems = (params?: ItemPaginateParams): Promise<ItemPaginateType> => client.get(`/api/items`, { params });
const getItem = ({ id }: { id: string }): Promise<ItemType> => client.get(`/api/items/${id}`);
const mint = (body: ItemCreateType): Promise<ItemType> => client.post(`/api/items/mint`, body);
export default {
  fetchItems,
  getItem,
  mint,
};
