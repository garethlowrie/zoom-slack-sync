import { get } from "../dynamodb";
import { STATUS_SYNC_TABLE_NAME } from "../../env";

type UserItem = {
	email: string;
	userId: string;
	token: string;
	prevStatusEmoji: string;
	prevStatusText: string;
};

export const getUserFromDynamoDb = async (email: string) => {
	try {
		// Check if user has already enabled our zoom/slack integration
		// by seeing if there is a record in our dynamodb table
		const existingUser = await get(STATUS_SYNC_TABLE_NAME, {
			Key: {
				email
			}
		});

		return {
			enabled: existingUser.Item != null,
			user: existingUser.Item as UserItem | undefined
		};
	} catch (err) {
		return {
			enabled: false,
			user: undefined
		};
	}
};
