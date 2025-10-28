
const API = "https://api.airtable.com/v0/";
const BASE = import.meta.env.VITE_AT_BASE_ID;
const KEY = import.meta.env.VITE_AT_API_KEY;
async function req(path, init={}){
  const r = await fetch(`${API}${BASE}/${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", ...(init.headers||{}) },
  });
  if(!r.ok) throw new Error(await r.text());
  return r.json();
}
export const at = {
  list: (table, params={})=>{ const qs = new URLSearchParams(params).toString(); return req(`${table}?${qs}`) },
  create: (table, fields)=>req(`${table}`, { method:"POST", body: JSON.stringify({ records:[{ fields }] }) }),
  update: (table, id, fields)=>req(`${table}`, { method:"PATCH", body: JSON.stringify({ records:[{ id, fields }] }) }),
};
