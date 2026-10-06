
import { useEffect } from 'react';
import { connectEvents } from '../services/event.service';

export function useEvents() {
  useEffect(() => {
    const source =
      connectEvents(data => {
        console.log(data);
      });

    return () => {
      source.close();
    };
  }, []);
}
