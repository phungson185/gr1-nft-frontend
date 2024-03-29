import { UserType, UserUpdateType } from 'models/User';
import { client } from './axios';

const getUserProfile = ({ address }: { address: string }): Promise<UserType> => client.get(`/api/profile/${address}`);

const getProfile = (): Promise<UserType> => client.get(`/api/profile`);
const updateProfile = (body: UserUpdateType): Promise<UserType> => client.put(`/api/profile`, body);

export default {
  getUserProfile,

  getProfile,
  updateProfile,
};
