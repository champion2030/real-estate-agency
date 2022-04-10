import mongoose, { Document, Schema, Model } from 'mongoose';
import { createPassword } from '../../utils/password';
import { ROLES } from "../../../../roles.config";
import { Account } from "./account.type";

const accountSchema = new Schema(
    {
        email: {
            type: String,
            text: true,
            lowercase: true,
            trim: true,
            unique: true,
            required: true,
        },
        phone: {
            type: String,
            unique: true,
            required: true
        },
        firstName: {
            type: String,
            text: true
        },
        middleName: {
            type: String,
            text: true
        },
        secondName: {
            type: String,
            text: true
        },
        imageId: {
            type: Schema.Types.ObjectId
        },
        password: {
            type: String
        },
        isAgent: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.USER
        },
        isActive: {
            type: Boolean,
            default: false
        },
        favorites: {
            type: [Schema.Types.ObjectId],
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

accountSchema.pre('save', function (next) {
    const account = this as any;

    if (account.password) {
        account.password = createPassword(account.password);
        next();
    }

    next();
});

accountSchema.index({phone: 1}, {unique: true});
accountSchema.index({email: 1}, {unique: true});
accountSchema.index({secondName: 'text', firstName: 'text', middleName: 'text'});

export interface AccountDoc extends Document, Omit<Account, '_id'> {
}

export let accountModel: Model<AccountDoc>;

export const ACCOUNTS_COLLECTION = 'Account';

try {
    accountModel = mongoose.model<AccountDoc>(ACCOUNTS_COLLECTION);
} catch (error) {
    accountModel = mongoose.model<AccountDoc>(ACCOUNTS_COLLECTION, accountSchema);
}
