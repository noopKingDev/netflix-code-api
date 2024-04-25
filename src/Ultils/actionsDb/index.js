import { writeFileSync, readFileSync } from "node:fs";

export function writeDb({ path, data }) {
    try {
        writeFileSync(path, JSON.stringify(data));
        return true;
    } catch (e) {
        console.log("Error ", e);
        return;
    }
}
