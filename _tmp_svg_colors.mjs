import fs from "fs";
const s = fs.readFileSync("c:/Dev/01. BD_HOME/assets/BLOCKCHAIN_flow.svg", "utf8");
const fills = [...s.matchAll(/fill="(#[0-9A-Fa-f]{3,8})"/gi)].map((m) => m[1]);
const strokes = [...s.matchAll(/stroke="(#[0-9A-Fa-f]{3,8})"/gi)].map((m) => m[1]);
function top(arr) {
  const c = {};
  for (const x of arr) c[x] = (c[x] || 0) + 1;
  return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 35);
}
console.log("FILLS", top(fills));
console.log("STROKES", top(strokes));
