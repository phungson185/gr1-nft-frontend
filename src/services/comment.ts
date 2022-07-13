import { CommentType } from 'models/Comment';
import { client } from './axios';

const createComment = ({ itemId, ...body }: CommentType): Promise<CommentType> =>
  client.post(`/api/comment/item/${itemId}`, body);
const getComments = ({ itemId, ...params }: any): Promise<CommentType[]> =>
  client.get(`/api/comment/item/${itemId}`, { params });

export default {
  createComment,
  getComments,
};
