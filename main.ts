// Fix Human Sleep: Funniest Patch Note (make.fun)
// Entry program: writes one patch-note line to /output/entry.txt.
// The sealed gate wants UTF-8 text of 1-160 characters, a single line,
// so this program checks the cap itself and fails loudly instead of
// silently shipping an invalid entry.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Breaking change: Sleep no longer supports 'Tomorrow' dependency; all urgent tasks must be migrated to 'Never'.";

const MAX_CHARS = 160;
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

const length = [...ENTRY].length;
const bytes = Buffer.byteLength(ENTRY, "utf8");
if (length < 1 || length > MAX_CHARS) {
  throw new Error(`entry is ${length} chars, outside the 1-${MAX_CHARS} gate`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must stay a single line");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf8");
console.log(`wrote ${length} chars / ${bytes} bytes to ${OUT_FILE}`);
