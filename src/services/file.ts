import axios from 'axios';
import { API_UPLOAD_URI } from 'env';

const client = axios.create({ baseURL: API_UPLOAD_URI });

const uploadFile = (body: FormData): Promise<any> => client.post(`/api/uploads`, body);

export default {
  uploadFile,
};
