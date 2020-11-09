import { update } from "../dynamodb";
import { STATUS_SYNC_TABLE_NAME } from "../../env";
import { getSlackUserById } from "./getSlackUserById";

/**
 * This function will get the user's current slack status
 * and record this against the user in DynamoDB. This allows us
 * to restore the user's status when they leave a Zoom call.
 *
 * @param userId string
 */
export const persistPreviousStatus = async (userId: string) => {
	try {
		const { profile } = await getSlackUserById(userId);

		const result = await update(STATUS_SYNC_TABLE_NAME, {
			Key: {
				email: profile.email
			},
			UpdateExpression: `SET prevStatusEmoji = :icon, prevStatusText = :text`,
			ExpressionAttributeValues: {
				":icon": profile.status_emoji,
				":text": profile.status_text
			},
			ReturnValues: "ALL_NEW"
		});

		if (result.$response.error) {
			throw new Error("Could not record previous status");
		}
	} catch (e) {
		console.log(e.message);
	}
};
