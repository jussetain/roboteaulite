import data from "../utils/fetcher"
import { saveData } from "./file.service";

const fetchAllData = (userId: string) => {
    data.map(async (item: { key: string, handler: any }) => {
        const value = await item.handler(userId);
        saveData(`${item.key}.txt`, String(value));
    })
}

export default fetchAllData;
