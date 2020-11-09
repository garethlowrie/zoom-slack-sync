import Axios from "axios";
import { ZOOM_APP_JWT } from "../../env";

type ZoomUser = {
	id: string;
	email: string;
};

export const getZoomUser = async (zoomUserId: string) => {
	const response = await Axios.get(
		"https://api.zoom.us/v2/users/" + zoomUserId,
		{
			headers: {
				Authorization: "Bearer " + ZOOM_APP_JWT
			}
		}
	);

	if (response.status !== 200) {
		throw new Error("Could not get Zoom user");
	}
	return response.data as ZoomUser;
};
