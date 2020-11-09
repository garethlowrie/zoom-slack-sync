import { SlackCommandEvent } from "../../../@types/SlackCommandEvent";
import { getUserFromDynamoDb } from "../../utils/getUserFromDynamoDb";
import { getSlackUserById } from "../../utils/getSlackUserById";
import { postMessage } from "../../utils/postMessage";
import { MESSAGE_MAP } from "../constants";
import { initiateAuthFlow } from "../../utils/initiateAuthFlow";
import { removeUserFromSlackSyncDataTable } from "../../utils/removeUserFromSlackSyncDataTable";

/**
 * This handler will enable/disable auto syncing of Zoom/Slack statuses.
 *
 * It is triggered by the /autostatus slash command within the Hive HR workspace.
 *
 * If the user is enabling the feature we will start the OAuth workflow to gain special access to be able to
 * update their slack profile.
 *
 * If the user is disabling the feature we will remove their record from the DynamoDB table
 *
 * @param event SlackCommandEvent
 */
export const slackOauthHandler = async ({ user_id }: SlackCommandEvent) => {
    try {
        const { profile } = await getSlackUserById(user_id);
        const { enabled } = await getUserFromDynamoDb(profile.email);

        if (!enabled) {
            await initiateAuthFlow(user_id);
            return;
        }

        await removeUserFromSlackSyncDataTable(profile.email);

        await postMessage({
            channel: user_id,
            text: MESSAGE_MAP.off
        });
    } catch (e) {
        console.log("Error in slackOauth", e);

        await postMessage({
            channel: user_id,
            text: MESSAGE_MAP.friendlyError
        });
    }
};
