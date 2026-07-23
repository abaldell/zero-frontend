
import { useEffect } from 'react';

interface Props {
  onMessage: (data: any) => void;
}

export function useExecutionEvents(
  props: Props
) {
  useEffect(() => {
    const source = new EventSource(
      'http://localhost:3001/api/events/live'
    );

    source.onmessage = event => {
      props.onMessage(
        JSON.parse(event.data)
      );
    };

    return () => source.close();
  }, []);
}
