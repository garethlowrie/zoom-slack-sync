import { WebClient } from "@slack/web-api";
import { OAUTH_TOKEN } from "../env";

export const bot = new WebClient(OAUTH_TOKEN);
