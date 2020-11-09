import { bot } from "../bot";
import { WebAPICallResult } from "@slack/web-api";

interface GetSlackUserResult extends WebAPICallResult {
	user: {
		profile: {
			email: string;
			status_text: string;
			status_emoji: string;
		};
	};
}

export const getSlackUserById = async (userId: string) => {
	const user = (await bot.apiCall("users.info", {
		user: userId
	})) as GetSlackUserResult;

	if (!user.ok) {
		throw new Error("Could not find user");
	}

	return user.user;
};
