import { getApiSpiraTest } from "../../../shared/utils/Utils";
import { api } from "../../../shared/services/api";
import type { PwExecution } from "../../executions/types/playwright";

const urlApi = getApiSpiraTest();

export async function getAllTestTree(proyectId:number) {
  const response = await fetch( `${urlApi}/test-sets/${proyectId}`);

  if (!response.ok) {
    throw new Error('Error loading test tree');
  }
  return response.json();
}

export async function getTestTree(projectId: number, testSetId:number) {
    const response = await fetch(`${urlApi}/test-sets/${projectId}/${testSetId}`);

    if (!response.ok) {
        throw new Error('Error loading test tree');
    }
    return response.json();
}

export async function getDetailTestSet(projectId: number, testSetId:number) {
    const response = await fetch(`${urlApi}/test-sets/${projectId}/id/${testSetId}`);

    if (!response.ok) {
        throw new Error('Error loading test tree');
    }
    return response.json();
}

export async function getCasesTestSet(projectId: number, testSetId:number) {
    const response = await fetch(`${urlApi}/test-sets/${projectId}/id/${testSetId}/test-cases`);

    if (!response.ok) {
        throw new Error('Error loading test tree');
    }
    return response.json();
}

export function reportTestExecutions(
    projectId: number,
    testSetId: number | null,
    executions: PwExecution[],
) {
    const spiraExecutions = executions.map(({ ...execution }) => execution);
    return api.post(`${urlApi}/test-runs/${projectId}`, {
        testSetId,
        executions: spiraExecutions,
    });
}