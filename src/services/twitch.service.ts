
import { RefreshingAuthProvider } from "@twurple/auth";
import { ApiClient } from '@twurple/api';
import { loadCredentials, saveData } from "./file.service";

const authProvider: RefreshingAuthProvider = new RefreshingAuthProvider({
    clientId: process.env.TWITCH_CLIENT_ID || '',
    clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
    redirectUri: process.env.TWITCH_REDIRECT_URI,
});

const apiClient: ApiClient = new ApiClient({ authProvider });

const init = async () => {
    try {
        const credentials = await loadCredentials();
        const { accessToken, refreshToken, expiresIn, obtainmentTimestamp } = JSON.parse(credentials);
        await authProvider.addUserForToken({ accessToken, refreshToken, expiresIn, obtainmentTimestamp });
    } catch (err) {
        console.error("init", err);
    }
}

const getUserInfo = async (tokens: any) => {
    try {
        const userId = await authProvider.addUserForToken(tokens);
        const user = await apiClient.users.getUserById(userId);

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

const getToken = async (code: string) => {
    try {
        const userId = await authProvider.addUserForCode(code).then((res: any) => res).catch(console.log);

        if (!userId) return;

        const tokens = await authProvider.refreshAccessTokenForUser(userId).then((res: any) => res).catch(console.log);

        return tokens;
    } catch (err) {
        console.log("getToken", err);
        return err;
    }
}

const getLastFollow = async (userId: string) => {
    try {
        const data: any = await apiClient.channels.getChannelFollowers(userId, "", { limit: 1 }).then((res: any) => res.data).catch(console.log);

        const [lastFollow] = data.map((follow: any) => {
            return {
                id: follow.userId,
                name: follow.userDisplayName,
                date: follow.followDate
            }
        });

        if (!lastFollow) return;

        const { name } = lastFollow;

        return name;
    } catch (err) {
        console.log("getToken", err);
        return err;
    }
}

const getFollowersCount = async (userId: string) => {
    try {
        const data: any = await apiClient.channels.getChannelFollowers(userId).then((res: any) => res.total).catch(console.log);
        return data;
    } catch (err) {
        console.log("getToken", err);
        return err;
    }
}

/**
 * @deprecated should be registered in real time
 * @param userId 
 * @returns 
 */
const getLastSub = async (userId: string) => {
    try {
        const subPaginated: any = apiClient.subscriptions.getSubscriptionsPaginated(userId);

        const data = await subPaginated.getAll();

        const [lastSub] = data.map((follow: any) => {
            return {
                id: follow.userId,
                name: follow.userDisplayName,
                date: follow.followDate
            }
        });

        if (!lastSub) return;

        const { name } = lastSub;

        return name;
    } catch (err) {
        console.log("getToken", err);
        return err;
    }
}

const getSubsCount = async (userId: string) => {
    try {
        const subsCount: any = await apiClient.subscriptions.getSubscriptions(userId).then((res: any) => res.total).catch(console.log);

        return subsCount;
    } catch (err) {
        console.log("getToken", err);
        return err;
    }
}

const getSubPointsCount = async (userId: string) => {
    try {
        const subpoints: any = await apiClient.subscriptions.getSubscriptions(userId).then((res: any) => res.points).catch(console.log);

        return subpoints;
    } catch (err) {
        console.log("getToken", err);
        return err;
    }
}

export {
    init,
    getUserInfo,
    getToken,
    getLastFollow,
    getFollowersCount,
    getLastSub,
    getSubsCount,
    getSubPointsCount
}
