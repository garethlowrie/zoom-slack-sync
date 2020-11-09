import * as slack from "serverless-slack";
import { SLACK_SLASH_COMMAND } from "../env";
import { slackOauthHandler } from "./handlers/http/slackOauth";

export const handler = slack.handler.bind(slack);

slack.on("/" + SLACK_SLASH_COMMAND, slackOauthHandler);

process.on("unhandledRejection", (err: any) => {
    console.error("unhandledRejection", err);
});
