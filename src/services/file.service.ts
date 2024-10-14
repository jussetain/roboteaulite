import * as fs from 'fs';
import { decode, encode } from "./crypto.service";

export function writeFile(filePath: string, fileName: string, content: string): Promise<void> {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }

    return new Promise((resolve, reject) => {
        fs.writeFile(`${filePath}/${fileName}`, content, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function readFile(filePath: string, fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(`${filePath}/${fileName}`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const folderName = "roboteaulite"

export const saveCredentials = (data: object) => {
    writeFile(`${process.env.LOCAL_FOLDER}/${folderName}`, `keys.txt`, encode(JSON.stringify(data), process.env.SECRET || ""));
}

export const loadCredentials = async () => {
    const coded = await readFile(`${process.env.LOCAL_FOLDER}/${folderName}`, `keys.txt`);
    return decode(coded, process.env.SECRET || "")
}

export const saveData = (fileName: string, data: string) => {
    writeFile(`${process.env.LOCAL_FOLDER}/${folderName}`, fileName, data);
}    
