import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import { get } from "lodash";
import {
    CUSTOM_EMOJI,
    CUSTOM_STATUS,
    ZOOM_VERIFICATION_TOKEN
} from "../../../env";
import { getUserFromDynamoDb } from "../../utils/getUserFromDynamoDb";
import { getZoomUser } from "../../utils/getZoomUser";
import { persistPreviousStatus } from "../../utils/persistPreviousStatus";
import { updateSlackStatus } from "../../utils/updateSlackStatus";
import { MESSAGE_MAP } from "../constants";

/**
 * This handler is called by our Status Syncer Zoom webhook app.
 *
 * We first ensure that all of the data that is required to trigger a status update
 * has been passed and also authenticate the request with the Zoom app's verification token.
 *
 * Every time somebody's Zoom status updates this handler will be called.
 * We will first check in our DynamoDB table that contains auth tokens for any users
 * that have enabled the Zoom/Slack status sync functionality.
 *
 * If the user within the event has enabled the feature we hit slacks api and update their status.
 *
 */

type MeetingParticipantLeftEvent = {
    event: "meeting.participant_left";
    payload: {
        object: {
            participant: {
                id: string;
            };
        };
    };
};

type MeetingParticipantJoinedEvent = {
    event: "meeting.participant_joined";
    payload: {
        object: {
            participant: {
                id: string;
            };
        };
    };
};

type MeetingEvent = MeetingParticipantJoinedEvent | MeetingParticipantLeftEvent;

const isJoinEvent = (
    event: MeetingEvent
): event is MeetingParticipantJoinedEvent =>
    event.event === "meeting.participant_joined";

type ZoomHandlerEvent = Omit<APIGatewayEvent, "body"> & {
    body: MeetingEvent;
};

export const handler = async (
    event: ZoomHandlerEvent,
    _context: Context,
    callback: Callback
) => {
    const zoomEvent = event.body;

    const hasUserJoinedAMeeting = isJoinEvent(zoomEvent);
    const verificationToken = get(event, "headers.Authorization");

    const zoomUser = await getZoomUser(zoomEvent.payload.object.participant.id);

    if (ZOOM_VERIFICATION_TOKEN !== verificationToken) {
        return callback(null, {
            statusCode: 401,
            body: JSON.stringify({
                errorMessage: MESSAGE_MAP.verificationTokenMismatch
            })
        });
    }

    const { enabled, user } = await getUserFromDynamoDb(zoomUser.email);

    if (enabled && user) {
        if (hasUserJoinedAMeeting) {
            await persistPreviousStatus(user.userId);
        }

        const result = await updateSlackStatus({
            text: hasUserJoinedAMeeting ? CUSTOM_STATUS : user.prevStatusText,
            emoji: hasUserJoinedAMeeting ? CUSTOM_EMOJI : user.prevStatusEmoji,
            userAccessToken: user.token
        });

        if (result.ok) {
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({ message: MESSAGE_MAP.statusUpdated })
            });
        }

        return callback(null, {
            statusCode: 400,
            body: JSON.stringify({
                message: MESSAGE_MAP.couldntUpdateSlackStatus
            })
        });
    }

    return callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: MESSAGE_MAP.notEnabled })
    });
};

process.on("unhandledRejection", (err: any) => {
    console.error("unhandledRejection", err);
});
