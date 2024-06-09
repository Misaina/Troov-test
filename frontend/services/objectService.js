import env from '../environment/environment';
import { throwError } from '../utils/throwError';
import axiosInstance from './interceptors/customAxios';

const ObjectService = {
  async create(data) {
    try {
      const response = await axiosInstance.post(`/api/objects`, data);
      return response.data;
    } catch (error) {
      throwError(error);
    }
  },

  async findAll() {
    try {
      const response = await axiosInstance.get(`/api/objects`);
      return response.data;
    } catch (error) {
      throwError(error);
    }
  },

  async update(objectId, data) {
    try {
      const response = await axiosInstance.put(`/api/objects/${objectId}`, data);
      return response.data;
    } catch (error) {
      throwError(error);
    }
  },

  async delete(objectId) {
    try {
      const response = await axiosInstance.delete(`/api/objects/${objectId}`);
      return response.data;
    } catch (error) {
      throwError(error);
    }
  }
};

export default ObjectService;
