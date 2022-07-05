import { PaginateParamsType, PaginateType } from './Common';
import { UserType } from './User';

export type ItemType = {
  id: string;
  name: string;
  description: string;
  image: string;
  tokenId: string;
  nftContract: string;
  creator: UserType;
  owner: UserType;
};

export type ItemPaginateParams = PaginateParamsType & {
  search?: string;
  orderBy?: string;
  desc?: string;
  owner?: string;
};

export type ItemPaginateType = PaginateType & {
  items: ItemType[];
  currentPage: number;
  total: number;
  pages: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type ItemCreateType = {
  [key: string]: any;
};
