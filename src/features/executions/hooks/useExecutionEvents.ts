
import { useEffect, useEffectEvent } from 'react';
import { getApiEvents } from '../../../shared/utils/Utils';
import type { TestRunSummary } from '../types/playwright';

export interface ExecutionEventMessage {
  type: string;
  id?: string;
  totalTest?: number;
  result?: TestRunSummary;
  [key: string]: unknown;
}

interface Props {
  onMessage: (data: ExecutionEventMessage) => void;
}
const urlApi = getApiEvents();

export function useExecutionEvents({ onMessage }: Props) {
  const handleMessage = useEffectEvent(onMessage);

  useEffect(() => {
    const source = new EventSource(
      `${urlApi}/live`
    );

    source.onmessage = event => {
      handleMessage(JSON.parse(event.data) as ExecutionEventMessage);
    };

    return () => source.close();
  }, []);
}
