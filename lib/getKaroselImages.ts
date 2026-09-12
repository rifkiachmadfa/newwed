import fs from "fs";
import path from "path";

const KAROSEL_DIR = path.join(process.cwd(), "public", "karosel");
const VALID_EXT = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

export function getKaroselImages(): string[] {
  try {
    const files = fs.readdirSync(KAROSEL_DIR);
    return files
      .filter((file) => VALID_EXT.includes(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/karosel/${file}`);
  } catch {
    return [];
  }
}