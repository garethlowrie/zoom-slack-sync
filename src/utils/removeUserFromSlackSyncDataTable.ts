import { deleteItem } from "../dynamodb";
import { STATUS_SYNC_TABLE_NAME } from "../../env";

export const removeUserFromSlackSyncDataTable = async (email: string) => {
    const deletedUser = await deleteItem(STATUS_SYNC_TABLE_NAME, {
        Key: {
            email
        }
    });

    if (deletedUser.$response.error) {
        throw deletedUser.$response.error;
    }
};
