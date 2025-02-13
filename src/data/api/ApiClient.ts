import axios from 'axios';
import {Constants} from '../../commons/index';

const Get = async <T>(endpoint: string): Promise<T> => {
  try {
    const res = await axios.get(`${Constants.url}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${Constants.tokenApi}`,
        Accept: 'application/json',
      },
    });

    const data: T = res.data;
    return data;
  } catch (error) {
    throw error
    throw error;
  }

};

const Post = async <T>(endpoint: string, body: JSON): Promise<T> => {
  try {
    const res = await axios.post(`${Constants.url}${endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${Constants.tokenApi}`,
        Accept: 'application/json',
      },
    });

    const data: T = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

const Update = async <T>(endpoint: string, body: JSON): Promise<T> => {
  try {
    const res = await axios.put(`${Constants.url}${endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${Constants.tokenApi}`,
        Accept: 'application/json',
      },
    });

    const data: T = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

const Delete = async <T>(endpoint: string): Promise<T> => {
  try {
    const res = await axios.delete(`${Constants.url}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${Constants.tokenApi}`,
        Accept: 'application/json',
      },
    });

    const data: T = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export interface ApiClient {
  Post: <T>(endpoint: string, body: JSON) => Promise<T>;
  Get: <T>(endpoint: string) => Promise<T>;
  Update: <T>(endpoint: string, body: JSON) => Promise<T>;
  Delete: <T>(endpoint: string) => Promise<T>;
}

export const ApiClientImpl = (): ApiClient => ({
  Post: Post,
  Get: Get,
  Update: Update,
  Delete: Delete,
});

// export {ApiClientImpl, ApiClient};
