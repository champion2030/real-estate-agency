import {LogicError} from './../../../../../utils/LogicError';
import {AccountDoc, accountModel} from '../account.model';
import {ACCOUNT_NOT_FOUND} from "../../../errorCodes.config";

export const getById = async (id: string): Promise<AccountDoc> => {
    const account = await accountModel.findById(id);

    if (!account) {
        throw new LogicError(ACCOUNT_NOT_FOUND, { id });
    }

    return account;
};
