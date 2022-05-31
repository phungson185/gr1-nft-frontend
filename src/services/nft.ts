// import { ArtworkPaginateParams, ArtworkPaginateType, ArtworkType } from 'models/Artwork';
import {
  GenerateBuyHashMessageType,
  GenerateCancelHashMessageType,
  GenerateHashMessageType,
  ItemCreateType,
  ItemPaginateParams,
  ItemPaginateType,
  ItemType,
  SaleCreateType,
} from 'models/Item';
import { client } from './axios';

const fetchItems = (params?: ItemPaginateParams): Promise<ItemPaginateType> => client.get(`/api/items`, { params });
const getItem = ({ id }: { id: string }): Promise<ItemType> => client.get(`/api/items/${id}`);

// const createArtwork = (body: FormData): Promise<ArtworkType> => client.post(`/api/fragment`, body);
// const fetchArtworks = (params?: ArtworkPaginateParams): Promise<ArtworkPaginateType> =>
//   client.get(`/api/fragment`, { params });
// const getArtwork = ({ id }: { id: string }): Promise<ArtworkType> => client.get(`/api/fragment/${id}`);

const mint = (body: ItemCreateType): Promise<ItemType> => client.post(`/api/items/mint`, body);
const generateHashMessage = (body: GenerateHashMessageType): Promise<string> =>
  client.post(`/api/items/generate-mint-multiple-hash-message`, body);
const createSale = ({ id, ...body }: SaleCreateType): Promise<any> => client.post(`/api/items/${id}/sale`, body);
const removeSale = ({ id }: { id: string }): Promise<any> => client.delete(`/api/items/${id}/sale`);

const generateBuyHashMessage = ({ id, ...params }: GenerateBuyHashMessageType): Promise<string> =>
  client.get(`/api/items/${id}/generate-sale-hash-message`, { params });
const generateCancelHashMessage = ({ id, ...params }: GenerateCancelHashMessageType): Promise<string> =>
  client.get(`/api/items/${id}/generate-cancel-sale-hash-message`, { params });

export default {
  fetchItems,
  getItem,

  // createArtwork,
  // fetchArtworks,
  // getArtwork,

  mint,
  generateHashMessage,
  createSale,
  removeSale,

  generateBuyHashMessage,
  generateCancelHashMessage,
};
