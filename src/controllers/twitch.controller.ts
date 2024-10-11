import express, { Request, Response } from 'express';
import { isTokenValid } from '../middleware/user.middleware';

import TwitchService from '../services/twitch.service';

const twitchService = TwitchService.getInstance();

const router = express.Router();

router.get('/bans', [isTokenValid], async (req: Request, res: Response) => {
    const { user } = res.locals;
    const bans = await twitchService.getUserBan(user.id);
    res.send(bans);
});

router.get('/bans/legacy', [isTokenValid], async (req: Request, res: Response) => {
    const { user } = res.locals;
    const bans = await twitchService.getLegacyBans(user.id);
    res.send(bans);
});

router.get('/bans/relations', [isTokenValid], async (req: Request, res: Response) => {
    const { user } = res.locals;
    const bans = await twitchService.getRelationsBans(user.id);
    res.send(bans);
});


export default router;
