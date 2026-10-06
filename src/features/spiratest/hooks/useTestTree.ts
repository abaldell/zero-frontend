import { useQuery } from '@tanstack/react-query';

import { getTestTree } from '../services/spiratest.service';

export const useTestTree = (projectId: number, testSetId:number) =>
  useQuery({
    queryKey: ['spiratest', projectId],
    queryFn: () => getTestTree(projectId, testSetId),
  });