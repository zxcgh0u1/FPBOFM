
export function httpError(res, status, message){
  res.status(status).json({ error: message });
}
