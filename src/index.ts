import bodyParser from 'body-parser';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import AuthRoute from './controllers/auth.controller';
import TwitchRoute from './controllers/twitch.controller';
import { init } from './services/twitch.service';

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors({
    origin: true
}));

app.use('/auth', AuthRoute);
app.use('/twitch', TwitchRoute);

if (isNaN(Number(process.env.PORT))) {
    console.error('PORT is not a number');
    process.exit(1);
}

init();

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
