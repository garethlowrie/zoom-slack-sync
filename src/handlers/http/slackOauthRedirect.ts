import { getSlackUserById } from "../../utils/getSlackUserById";
import { postMessage } from "../../utils/postMessage";
import { MESSAGE_MAP } from "../constants";
import { Context, Callback } from "aws-lambda";
import { getSlackOauthAccessToken } from "../../utils/getSlackOauthAccessToken";
import { addUserToSlackSyncDataTable } from "../../utils/addUserToSlackSyncDataTable";
import { getSlackAppRedirectUrl } from "../../utils/getSlackAppRedirectUrl";

export const handler = async (
    req: any,
    _context: Context,
    callback: Callback
) => {
    const { code, state } = req.query;

    try {
        const result = await getSlackOauthAccessToken(code);

        if (state !== result.authed_user.id) {
            throw new Error(MESSAGE_MAP.authenticateError);
        }

        const { profile } = await getSlackUserById(result.authed_user.id);

        await addUserToSlackSyncDataTable({
            email: profile.email,
            userId: result.authed_user.id,
            token: result.authed_user.access_token
        });

        await postMessage({
            channel: result.authed_user.id,
            text: MESSAGE_MAP.on
        });

        return callback(null, {
            statusCode: 302,
            headers: {
                Location: getSlackAppRedirectUrl()
            },
            body: "Success"
        });
    } catch (e) {
        console.log("Error in slackOauthRedirect", e);

        await postMessage({
            channel: state,
            text: MESSAGE_MAP.friendlyError
        });
    }
};
