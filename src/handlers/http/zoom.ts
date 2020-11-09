import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import { get } from "lodash";
import {
	CUSTOM_EMOJI,
	CUSTOM_STATUS,
	ZOOM_VERIFICATION_TOKEN
} from "../../../env";
import { getUserFromDynamoDb } from "../../utils/getUserFromDynamoDb";
import { persistPreviousStatus } from "../../utils/persistPreviousStatus";
import { updateSlackStatus } from "../../utils/updateSlackStatus";
import { MESSAGE_MAP, ZOOM_IN_MEETING_STATUS } from "../constants";

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
export const handler = async (
	event: APIGatewayEvent,
	_context: Context,
	callback: Callback
) => {
	const verificationToken = get(event, "headers.Authorization");
	const zoomUserStatus = get(event, "body.payload.object.presence_status");
	const zoomUserEmail = get(event, "body.payload.object.email");

	if (ZOOM_VERIFICATION_TOKEN !== verificationToken) {
		return callback(null, {
			statusCode: 401,
			body: JSON.stringify({
				errorMessage: MESSAGE_MAP.verificationTokenMismatch
			})
		});
	}

	if (zoomUserStatus == null || zoomUserEmail == null) {
		return callback(null, {
			statusCode: 400,
			body: JSON.stringify({
				errorMessage:
					zoomUserStatus == null
						? MESSAGE_MAP.missingUserStatus
						: MESSAGE_MAP.missingUserEmail
			})
		});
	}

	const { enabled, user } = await getUserFromDynamoDb(zoomUserEmail);

	if (enabled && user) {
		const isInMeeting = zoomUserStatus === ZOOM_IN_MEETING_STATUS;

		if (isInMeeting) {
			await persistPreviousStatus(user.userId);
		}

		const result = await updateSlackStatus({
			text: isInMeeting ? CUSTOM_STATUS : user.prevStatusText,
			emoji: isInMeeting ? CUSTOM_EMOJI : user.prevStatusEmoji,
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
