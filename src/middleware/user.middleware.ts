import { NextFunction, Response, Request } from "express";
import { loadCredentials } from "../services/file.service";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await loadCredentials();

    if (user) {
        res.locals.user = JSON.parse(user);
        next();
        return;
    }

    res.status(401).send({ message: "Unauthorized" });
}
