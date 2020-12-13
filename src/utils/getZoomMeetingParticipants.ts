import Axios from "axios";
import { ZOOM_APP_JWT } from "../../env";

export type ZoomMeetingParticipant = {
    id: string;
    name: string;
    user_email?: string;
};

export type ZoomMeetingParticipants = {
    total_records: number;
    participants: ZoomMeetingParticipant[];
};

export const getZoomMeetingParticipants = async (meetingUUID: string) => {
    const response = await Axios.get(
        "https://api.zoom.us/v2/past_meetings/" +
            meetingUUID +
            "/participants?page_size=150",
        {
            headers: {
                Authorization: "Bearer " + ZOOM_APP_JWT
            }
        }
    );

    if (response.status !== 200) {
        throw new Error("Could not get Zoom meeting participants");
    }
    return response.data as ZoomMeetingParticipants;
};
