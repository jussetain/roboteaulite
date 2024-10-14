import express, { Request, Response } from 'express';
import { getLastFollow } from '../services/twitch.service';
import { getUser } from '../middleware/user.middleware';
import fetchAllData from '../services/fetcher.service';

const router = express.Router();

router.get('/data', [getUser], async (req: Request, res: Response) => {
    const { user } = res.locals;

    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    //const lastFollow: string = await getLastFollow(user.userInfo.id);

    //res.send(lastFollow);

    const data = fetchAllData(user.userInfo.id);
    res.send(200)
});




export default router;
