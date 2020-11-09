import { URL } from "url";
import { SLACK_CLIENT_ID, SLACK_REDIRECT_URI } from "../../env";

export const getOauthUrl = (userId: string) => {
    const url = new URL("https://slack.com/oauth/v2/authorize");
    url.searchParams.append("client_id", SLACK_CLIENT_ID);
    url.searchParams.append("user_scope", "users.profile:write");
    url.searchParams.append("state", userId);
    url.searchParams.append("granular_bot_scope", "1");
    url.searchParams.append("redirect_uri", SLACK_REDIRECT_URI);

    return url.href;
};
