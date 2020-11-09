import { ChatPostMessageArguments } from "@slack/web-api";
import { bot } from "../bot";

export const postMessage = async (options: ChatPostMessageArguments) => {
	return bot.chat.postMessage(options);
};
