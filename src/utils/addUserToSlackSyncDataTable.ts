import { put } from "../dynamodb";
import { STATUS_SYNC_TABLE_NAME } from "../../env";

type UserInput = {
    email: string;
    userId: string;
    token: string;
};

export const addUserToSlackSyncDataTable = async (userInput: UserInput) => {
    const newUser = await put(STATUS_SYNC_TABLE_NAME, {
        ...userInput,
        prevStatusEmoji: "",
        prevStatusText: ""
    });

    if (newUser.$response.error) {
        throw newUser.$response.error;
    }
};
