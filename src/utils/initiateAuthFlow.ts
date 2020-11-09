import { postMessage } from "./postMessage";
import { MESSAGE_MAP } from "../handlers/constants";
import { getOauthUrl } from "./getSlackOauthUrl";

export const initiateAuthFlow = async (userId: string) =>
	await postMessage({
		channel: userId,
		text: MESSAGE_MAP.notificationText,
		blocks: [
			{
				type: "section",
				text: {
					type: "plain_text",
					text: MESSAGE_MAP.startSyncingIntro
				}
			},
			{
				type: "actions",
				elements: [
					{
						type: "button",
						text: {
							type: "plain_text",
							text: MESSAGE_MAP.startSyncing,
							emoji: true
						},
						url: getOauthUrl(userId)
					}
				]
			}
		] as any
	});
