
import { api } from './api';

export const executionService = {
  getAll() {
    return api.get('/executions');
  },

  getById(id: string) {
    return api.get(`/executions/${id}`);
  },

  run(data: {
    selectedPaths: string[];
    selectedScriptKeys: string[];
  }) {
    return api.post(
      '/executions/run',
      data
    );
  },
};
