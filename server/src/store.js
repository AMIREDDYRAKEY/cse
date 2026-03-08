import fs from "fs/promises";

export async function readData(filePath, fallback) {
  try {
    const b = await fs.readFile(filePath, "utf8");
    return JSON.parse(b);
  } catch (e) {
    if (e.code === "ENOENT") return fallback;
    return fallback;
  }
}

export async function writeData(filePath, data) {
  const dir = filePath.split(/[\\/]/).slice(0, -1).join("/");
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}
