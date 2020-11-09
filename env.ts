export const OAUTH_TOKEN = process.env.OAUTH_TOKEN!;

export const STATUS_SYNC_TABLE_NAME = process.env.STATUS_SYNC_TABLE_NAME!;

export const LOCALE = process.env.LOCALE!;

export const TIMEZONE = process.env.TIMEZONE!;

export const ZOOM_VERIFICATION_TOKEN = process.env.ZOOM_VERIFICATION_TOKEN!;

export const SLACK_CLIENT_SECRET = process.env.CLIENT_SECRET!;

export const ZOOM_APP_JWT = process.env.ZOOM_APP_JWT!;

export const SLACK_CLIENT_ID = process.env.CLIENT_ID!;

export const SLACK_APP_ID = process.env.SLACK_APP_ID!;

export const SLACK_REDIRECT_URI = process.env.SLACK_REDIRECT_URI!;

export const CUSTOM_SLACK_SLASH_COMMAND = process.env.CUSTOM_SLACK_SLASH_COMMAND
    ? process.env.CUSTOM_SLACK_SLASH_COMMAND
    : "statusupdater";

export const CUSTOM_EMOJI = process.env.CUSTOM_EMOJI
    ? process.env.CUSTOM_EMOJI
    : ":calling:";

export const CUSTOM_STATUS = process.env.CUSTOM_STATUS
    ? process.env.CUSTOM_STATUS
    : "On a Zoom";
