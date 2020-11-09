import { SlackEvent } from "./SlackEvent";

export type SlackAppMentionEvent = SlackEvent<{
	type: string;
	user: string;
	text: string;
	ts: string;
	channel: string;
	event_ts: string;
}>;
