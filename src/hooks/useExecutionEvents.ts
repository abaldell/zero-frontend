
import { useEffect } from 'react';
import { getApiEvents } from '../utils/Utils';

interface Props {
  onMessage: (data: any) => void;
}
const urlApi = getApiEvents();

export function useExecutionEvents(
  props: Props
) {
  useEffect(() => {
    const source = new EventSource(
      `${urlApi}/live`
    );

    source.onmessage = event => {
      props.onMessage(
        JSON.parse(event.data)
      );
    };

    return () => source.close();
  }, []);
}
