
export function connectEvents(
  onMessage: (data: unknown) => void,
) {
  const source = new EventSource(
    'http://localhost:3001/api/events/live'
  );

  source.onmessage = event => {
    onMessage(
      JSON.parse(event.data)
    );
  };

  return source;
}
