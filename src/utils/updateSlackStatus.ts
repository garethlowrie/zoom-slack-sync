import { WebClient } from "@slack/web-api";

type UpdateStatus = {
    text?: string;
    emoji?: string;
    expiration?: number;
    userAccessToken: string;
};

export const updateSlackStatus = async ({
    text = "",
    emoji = "",
    expiration = 0,
    userAccessToken
}: UpdateStatus) => {
    const client = new WebClient(userAccessToken);

    return client.apiCall("users.profile.set", {
        profile: {
            status_text: text,
            status_emoji: emoji,
            status_expiration: expiration
        }
    });
};
