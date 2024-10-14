import { getFollowersCount, getLastFollow, getLastSub, getSubPointsCount, getSubsCount } from "../services/twitch.service";

export default [
    {
        key: "last_follow",
        handler: getLastFollow
    },
    {
        key: "followers_count",
        handler: getFollowersCount
    },
    {
        key: "last_sub",
        handler: getLastSub
    },
    {
        key: "subs_count",
        handler: getSubsCount
    },
    {
        key: "sub_points_count",
        handler: getSubPointsCount
    }

]
