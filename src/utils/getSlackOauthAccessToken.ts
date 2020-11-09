import { WebAPICallResult } from "@slack/web-api";
import { bot } from "../bot";
import {
    SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET,
    SLACK_REDIRECT_URI
} from "../../env";

interface AuthUserResponse extends WebAPICallResult {
    app_id: string;
    team: {
        name: string;
        id: string;
    };
    authed_user: {
        id: string;
        scope: string;
        access_token: string;
        token_type: string;
    };
    response_metadata: {
        scopes: string[];
    };
}

export const getSlackOauthAccessToken = async (tempCode: string) =>
    (await bot.oauth.v2.access({
        client_id: SLACK_CLIENT_ID,
        client_secret: SLACK_CLIENT_SECRET,
        code: tempCode,
        redirect_uri: SLACK_REDIRECT_URI
    })) as AuthUserResponse;
