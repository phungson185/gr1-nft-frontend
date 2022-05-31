import { PaymentTokenType } from 'models/Sale';
import { CategoryType, SystemType } from 'models/System';
import { client } from './axios';

const fetchConfig = (): Promise<SystemType> => client.get(`/api/system`);

export default {
  fetchConfig,
};
