import { CUSTOM_SLACK_SLASH_COMMAND } from "../../env";

export const MESSAGE_MAP = {
    on: `:slack: :heart: :zoom:  All set up! I will sync your Slack status with your Zoom status. To stop simply type /${CUSTOM_SLACK_SLASH_COMMAND} again.`,
    off:
        ":slack: :broken_heart: :zoom:  It's over. I have stopped syncing your Slack status with your Zoom status.",
    friendlyError:
        "Sorry, looks like I'm having trouble please try again later",
    offError: "Sorry, looks like I couldn't stop syncing your Slack and Zoom",
    notificationText: "Click here to turn on",
    startSyncing: "Start syncing",
    authenticateError: "We could not authenticate you",
    startSyncingIntro:
        "You've asked to sync your Zoom/Slack status. To enable this feature click the button below and give me access to update your profile.",
    statusUpdated: "Status updated",
    verificationTokenMismatch: "Zoom verification code mismatch",
    missingUserStatus: "Zoom user status not available",
    missingUserEmail: "Zoom user email not available",
    couldntUpdateSlackStatus: "Could not update Slack status",
    notEnabled: "Zoom/Slack Sync is not enabled"
};
