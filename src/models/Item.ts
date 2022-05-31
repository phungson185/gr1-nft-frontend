import { PaginateParamsType, PaginateType } from './Common';
import { SaleType } from './Sale';
import { CategoryType } from './System';
import { UserType } from './User';

export type ItemType = {
  id: string;
  name: string;
  description: string;
  image: string;
  tokenId: string;
  nftContract: string;
  listedOnMarket: boolean;
  category: CategoryType;

  sale?: SaleType;
  owner: UserType;
  creator: UserType;
};

export type ItemPaginateParams = PaginateParamsType & {
  search?: string;
  orderBy?: string;
  desc?: string;
  owner?: string;
  categoryId?: string;
  listedOnMarket?: string;
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

export type SaleCreateType = {
  id: string;
  [key: string]: any;
};

export type GenerateHashMessageType = {
  signature?: string;
  tokenIds?: string[];
};

export type GenerateBuyHashMessageType = {
  id: string;
  paymentTokenId: string;
  price: number | string;
};

export type GenerateCancelHashMessageType = {
  id: string;
};
