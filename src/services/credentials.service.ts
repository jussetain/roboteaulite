import { decode, encode } from "./crypto.service";
import { readFile, writeFile } from "./file.service";

export const save = (data: object) => {
    writeFile(`${process.env.LOCAL_FOLDER}/.creds.json`, encode(JSON.stringify(data), process.env.SECRET || ""));
}

export const load = async () => {
    const coded = await readFile(`${process.env.LOCAL_FOLDER}/.creds.json`);
    return decode(coded, process.env.SECRET || "")
}
