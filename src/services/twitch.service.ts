
import { RefreshingAuthProvider } from "@twurple/auth";
import { ApiClient } from '@twurple/api';

export default class TwitchService {
    private authProvider: RefreshingAuthProvider;
    private apiClient: ApiClient;

    constructor() {
        this.authProvider = new RefreshingAuthProvider({
            clientId: process.env.TWITCH_CLIENT_ID || '',
            clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
            redirectUri: process.env.TWITCH_REDIRECT_URI,
        });

        this.apiClient = new ApiClient({ authProvider: this.authProvider });
    }

    async getUserInfo(tokens: any) {
        try {
            const userId = await this.authProvider.addUserForToken(tokens);
            const user = await this.apiClient.users.getUserById(userId);

            return {
                id: user?.id,
                login: user?.name,
                displayName: user?.displayName,
                broadcasterType: user?.broadcasterType,
                profileImageUrl: user?.profilePictureUrl,
                createdAt: user?.creationDate
            }
        } catch (err) {
            console.error("getUserInfo", err);
        }
        return;
    }

    async getToken(code: string) {
        try {
            const userId = await this.authProvider.addUserForCode(code).then((res) => res).catch(console.log);

            if (!userId) return;

            const tokens = await this.authProvider.refreshAccessTokenForUser(userId).then((res) => res).catch(console.log);

            return tokens;
        } catch (err) {
            console.log("getToken", err);
            return err;
        }
    }
}

