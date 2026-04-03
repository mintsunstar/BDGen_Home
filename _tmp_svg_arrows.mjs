import fs from "fs";
const s = fs.readFileSync("c:/Dev/01. BD_HOME/assets/BLOCKCHAIN_flow.svg", "utf8");
const re = /<path\s+([^>]*?)>/gi;
let m;
const hits = [];
while ((m = re.exec(s)) !== null) {
  const tag = m[1];
  const dm = /d="([^"]*)"/.exec(tag);
  const fm = /fill="(#[^"]+)"/.exec(tag);
  if (!dm || !fm) continue;
  const d = dm[1];
  const fill = fm[1];
  if (fill.toLowerCase() === "#64748b") {
    hits.push({ len: d.length, d: d.slice(0, 120), fill });
  }
}
hits.sort((a, b) => a.len - b.len);
console.log("count", hits.length);
hits.forEach((h) => console.log(h.len, h.d));
