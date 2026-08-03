import { getApiPW } from "../utils/Utils";

const urlApi = getApiPW();

export async function getTestPW() {
    const response = await fetch(`${urlApi}/test-suite`);

    return response.json();
}
