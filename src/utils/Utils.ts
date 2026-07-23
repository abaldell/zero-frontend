export const stripAnsi = (text: string) =>
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