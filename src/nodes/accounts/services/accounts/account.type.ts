import {AbstractModel, ID, IDs} from "../../../../interfaces";
import {ROLES} from "../../../../roles.config";

export interface Account extends AbstractModel {
    _id?: ID | null;
    email?: string | null;
    phone?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    secondName?: string | null;
    imageId?: string | null;
    password?: string | null;
    role?: ROLES;
    isAgent?: boolean;
    isActive?: boolean;
    favorites?: IDs;
}
