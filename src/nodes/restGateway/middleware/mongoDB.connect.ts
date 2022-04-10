import { LogicError } from "../../../utils/LogicError";
import mongoose from "mongoose";
import {mongo} from "../../../global.config";
import {MONGOOSE_NOT_CONNECTED} from "../../../errorCodes.config";

export const mongoDBConnect = async (): Promise<boolean> => {
    try {
        await mongoose.connect(mongo.uri, mongo.options);
        return Promise.resolve(true);
    } catch (e) {
        return Promise.reject(new LogicError(MONGOOSE_NOT_CONNECTED));
    }
};
