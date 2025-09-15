
export function requireBody(fields, body){
  for(const f of fields){
    if(!(f in body)) throw new Error('Missing field: ' + f);
  }
}
