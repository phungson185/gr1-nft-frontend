import { CommentType } from 'models/Comment';
import { client } from './axios';

const comment = (body: CommentType): Promise<CommentType> => client.post(`/api/comment`, body);
export default {
  comment,
};
