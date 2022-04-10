import { get } from 'lodash';
import { ValidateError } from 'tsoa';
import util from 'util';
import {
    CRITICAL_ERROR,
    JSON_SYNTAX_ERROR, MONGOOSE,
    MONGOOSE_VALIDATION_ERROR,
    TSOA_VALIDATION,
    UNKNOW_ERROR
} from "../errorCodes.config";

export interface ErrorItem {
    message: string;
    type?: string;
    origType?: string;
    path?: string;
    value?: string;
    actual?: string;
    expected?: string;
    data?: any;
    name?: string;
    action?: string;
    params?: any;
}

export interface ErrorResponse {
    success: boolean;
    statusCode: number;
    errors: ErrorItem[];
}

const createError = (statusCode: number, errors: ErrorItem[]) => ({
    success: false,
    statusCode,
    errors,
});

export const typeErrorResponse = (error: any) => {
    const errors: ErrorItem[] = [
        {
            type: CRITICAL_ERROR.type,
            message: CRITICAL_ERROR.message,
            data: {
                message: error.message || error.toString(),
                data: util.inspect(error.stack),
            },
        },
    ];

    return createError(500, errors);
};

export const tsoaSyntaxErrorResponse = (error: any) => {
    const errors: ErrorItem[] = [
        {
            type: JSON_SYNTAX_ERROR.type,
            message: JSON_SYNTAX_ERROR.message,
            data: error.body,
        },
    ];

    return createError(error.status || 400, errors);
};

export const tsoaValidateErrorResponse = (error: ValidateError) => {
    const items = get(error, 'fields', {});

    const errors: ErrorItem[] = Object.keys(items).map((key) => {
        return {
            expected: '',
            actual: get(items, `${key}.value`, ''),
            value: get(items, `${key}.value`, ''),
            path: key,
            name: get(items, `${key}.name`, ''),
            type: TSOA_VALIDATION.type,
            message: get(items, `${key}.message`, null) || error.message || error.toString(),
        };
    });

    return createError(error.status || 400, errors);
};

export const unknownErrorResponse = (error: any) => {
    const errors = [
        {
            type: get(error, 'type', UNKNOW_ERROR.type),
            data: get(error, 'data', null),
            message: error.message || error.toString() || UNKNOW_ERROR.message,
        },
    ];

    return createError(error.code || 500, errors);
};

export const mongooseErrorResponse = (error: any) => {

    let errors: ErrorItem[] = [];
    const items = get(error, 'errors', []);

    if (errors.length > 0) {
        errors = Object.keys(items).map((key) => {
            return {
                expected: get(items, `${key}.kind`, ''),
                actual: get(items, `${key}.value`, ''),
                value: get(items, `${key}.value`, ''),
                path: get(items, `${key}.path`, ''),
                name: get(items, `${key}.name`, ''),
                type: MONGOOSE_VALIDATION_ERROR.type,
                message: get(items, `${key}.message`, ''),
            };
        });

        return createError(400, errors);
    }

    errors = [
        {
            type: MONGOOSE.type,
            message: MONGOOSE.message,
            // eslint-disable-next-line no-underscore-dangle
            name: error._message || error.message || error.toString(),
        },
    ];

    return createError(400, errors);
};
