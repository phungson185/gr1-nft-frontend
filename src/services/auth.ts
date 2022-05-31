import { GetNonceData, GetNonceType, GetTokenData, GetTokenType } from 'models/Auth';
import { client } from './axios';

const getNonce = (params: GetNonceType): Promise<GetNonceData> => client.get(`/api/authentication/nonce`, { params });
const getToken = (body: GetTokenType): Promise<GetTokenData> => client.post(`/api/authentication/token`, body);

export default {
  getNonce,
  getToken,
};
