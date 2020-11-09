import { SlackEvent } from "./SlackEvent";

export type SlackMessageEvent = SlackEvent<{
	type: string;
	channel: string;
	user: string;
	text: string;
	ts: string;
}>;
