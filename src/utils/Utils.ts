export const stripAnsi = (text: string) =>
  // eslint-disable-next-line no-control-regex
  text.replace(/\u001b\[[0-9;]*m/g, '');

export const today = () =>{
  const now = new Date();
  return now.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const formatDate = (date:string) =>{
  const format = new Date(date)
  return format.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export const getApiEvents = () => {
  return `${import.meta.env.VITE_API_BASE}${import.meta.env.VITE_API_EVENTS}`
}

export const getApiExecutions = () => {
  return `${import.meta.env.VITE_API_BASE}${import.meta.env.VITE_API_EXECUTIONS}`
}

export const getApiTestSuite = () => {
  return `${import.meta.env.VITE_API_BASE}${import.meta.env.VITE_API_TESTSUITE}`
}

export const getApiResults = () => {
  return `${import.meta.env.VITE_API_BASE}${import.meta.env.VITE_API_RESULTS}`
}

export const getApiFiles = () => {
  return `${import.meta.env.VITE_API_BASE}${import.meta.env.VITE_API_FILES}`
}

export const getApiSpiraTest = () => {
  return `${import.meta.env.VITE_API_BASE}${import.meta.env.VITE_API_SPIRATEST}`
}