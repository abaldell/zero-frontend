import { getApiEvents } from "../../../shared/utils/Utils";

const urlApi = getApiEvents();

export function connectEvents(
  onMessage: (data: unknown) => void,
) {
  const source = new EventSource(`${urlApi}/live`);

  source.onmessage = event => {
    onMessage(
      JSON.parse(event.data)
    );
  };

  return source;
}
