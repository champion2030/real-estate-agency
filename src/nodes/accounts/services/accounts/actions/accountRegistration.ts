import {AccountDoc, accountModel} from "../account.model";
import {LogicError} from "../../../../../utils/LogicError";
import {ACCOUNT_EMAIL_EXIST, ACCOUNT_PHONE_EXIST} from "../../../errorCodes.config";
import {RegistrationPostData} from "../../../../restGateway/controllers/accounts.ctrl";

export const accountRegistration = async (account: RegistrationPostData): Promise<AccountDoc> => {
    const { email, phone } = account;

    let foundAccount: AccountDoc;

    if (email) {
        foundAccount = await accountModel.findOne({ email });

        if (foundAccount) {
            throw new LogicError(ACCOUNT_EMAIL_EXIST, { email });
        }
    }

    if (phone) {
        foundAccount = await accountModel.findOne({ phone });

        if (foundAccount) {
            throw new LogicError(ACCOUNT_PHONE_EXIST, { phone });
        }
    }

    return await accountModel.create(account);
};
