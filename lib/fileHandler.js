import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.join(__dirname, "..", "tasks.json");

export async function readTasks() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function writeTasks(tasks) {
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}

export async function initFile() {
  try {
    await fs.access(FILE_PATH);
  } catch {
    await writeTasks([]);
  }
}
