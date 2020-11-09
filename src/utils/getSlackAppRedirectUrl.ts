import { URL } from "url";
import { SLACK_APP_ID } from "../../env";

export const getSlackAppRedirectUrl = () => {
    const slackRedirect = new URL("https://slack.com/app_redirect");
    slackRedirect.searchParams.append("app", SLACK_APP_ID);

    return slackRedirect.href;
};
