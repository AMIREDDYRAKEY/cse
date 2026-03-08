import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "..", "data");

export class DataProvider {
    constructor(model, fileName) {
        this.model = model;
        this.filePath = path.join(DATA_DIR, fileName);
        this.dbReady = false;
    }

    setDbReady(status) {
        this.dbReady = status;
    }

    async getAll() {
        if (this.dbReady) {
            return await this.model.find().sort({ createdAt: -1 });
        }
        return await this._readJson();
    }

    async create(data) {
        if (this.dbReady) {
            return await this.model.create(data);
        }
        const items = await this._readJson();
        const newItem = { _id: randomUUID(), ...data, date: data.date || new Date().toISOString() };
        items.push(newItem);
        await this._writeJson(items);
        return newItem;
    }

    async delete(id) {
        if (this.dbReady) {
            return await this.model.findByIdAndDelete(id);
        }
        let items = await this._readJson();
        items = items.filter(item => item._id !== id && item.id !== id);
        await this._writeJson(items);
        return { ok: true };
    }

    async _readJson() {
        try {
            const data = await fs.readFile(this.filePath, "utf8");
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    async _writeJson(data) {
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), "utf8");
        } catch (err) {
            console.error(`Error writing to ${this.filePath}:`, err);
        }
    }
}
