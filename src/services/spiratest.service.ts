import { getApiSpiraTest } from "../utils/Utils";

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