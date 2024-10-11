import express, { Request, Response, NextFunction } from 'express';
import TwitchService from '../services/twitch.service';
import HttpStatusCode from '../utils/codes.http';
import HttpReponse from '../utils/response.http';
import { writeFile } from '../services/file.service';
import { encode } from '../services/crypto.service';
import { save } from '../services/credentials.service';

const router = express.Router();

const scopes = [
    "moderator:read:followers",
    "user:read:broadcast",
    "user:read:subscriptions",
    "openid",
];

const authRoute = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.TWITCH_REDIRECT_URI}&response_type=code&scope=${encodeURIComponent(scopes.join(" "))}`;

const twitchService = new TwitchService();

router.get('/twitch', async (req: Request, res: Response) => {
    res.redirect(authRoute);
});

router.get('/twitch/success', async (req: Request, res: Response): Promise<any> => {
    const { code } = req.query;

    if (!code) {
        return res.status(HttpStatusCode.BAD_REQUEST).send(new HttpReponse({ message: "`code` is missing." }))
    }

    const token = await twitchService.getToken(code as string);

    if (!token) {
        return res.status(HttpStatusCode.BAD_REQUEST).send(new HttpReponse({ message: "Could not retrieve token." }))
    }

    const userInfo = await twitchService.getUserInfo(token);

    if (!userInfo) {
        return res.status(HttpStatusCode.NOT_FOUND).send(new HttpReponse({ message: "Could not retrieve user info." }))
    }

    const { accessToken, refreshToken, expiresIn, obtainmentTimestamp }: any = token;

    save({ accessToken, refreshToken, expiresIn, obtainmentTimestamp, userInfo });

    return res.status(HttpStatusCode.OK).send(new HttpReponse({ data: { accessToken, refreshToken, expiresIn, obtainmentTimestamp } }));

});

export default router;
