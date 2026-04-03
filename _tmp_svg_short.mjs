import fs from "fs";
const s = fs.readFileSync("c:/Dev/01. BD_HOME/assets/BLOCKCHAIN_flow.svg", "utf8");
const re = /<path\s+([^>]*?)>/gi;
let m;
const short = [];
while ((m = re.exec(s)) !== null) {
  const tag = m[1];
  const dm = /d="([^"]*)"/.exec(tag);
  const fm = /fill="(#[^"]+)"/.exec(tag);
  if (!dm || !fm) continue;
  const d = dm[1];
  const fill = fm[1];
  if (d.length < 400) short.push({ len: d.length, fill, d });
}
short.sort((a, b) => a.len - b.len);
console.log("short paths with fill", short.length);
short.slice(0, 40).forEach((h) => console.log(h.len, h.fill, h.d.slice(0, 100)));
