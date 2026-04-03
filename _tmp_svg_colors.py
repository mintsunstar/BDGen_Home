import re
from collections import Counter
p = r"c:\Dev\01. BD_HOME\assets\BLOCKCHAIN_flow.svg"
with open(p, encoding="utf-8") as f:
    s = f.read()
fills = re.findall(r'fill="(#[0-9A-Fa-f]{3,8})"', s)
strokes = re.findall(r'stroke="(#[0-9A-Fa-f]{3,8})"', s)
print("TOP FILLS")
for k, v in Counter(fills).most_common(30):
    print(v, k)
print("TOP STROKES")
for k, v in Counter(strokes).most_common(30):
    print(v, k)
