
import { getApiExecutions } from '../utils/Utils';
import { api } from './api';

const urlApi = getApiExecutions();

export const executionService = {
  getAll() {
    return api.get(urlApi);
  },

  getById(id: string) {
    return api.get(`${urlApi}/${id}`);
  },

  run(data: {
    selectedPaths: string[];
    selectedScriptKeys: string[];
  }) {
    return api.post(
      `${urlApi}/run`,
      data
    );
  },
};
