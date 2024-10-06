export const isNull = (value: unknown): value is null => value === null;

export const isUndefined = (value: unknown): value is undefined => value === undefined;

type Nil = null | undefined;

export const isNil = (value: unknown): value is Nil => isNull(value) || isUndefined(value);

export const isArray = <T = any>(value: unknown): value is T[] => Array.isArray(value);

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && !isArray(value) && !isNull(value);

export const isEmpty = (value: unknown): value is Nil | '' | [] | {} => {
    switch (true) {
        case isNil(value):
            return true;
        case isArray(value) || isString(value):
            return value.length === 0;
        case isObject(value):
            return Object.keys(value).length === 0;
        default:
            return false;
    }
};

export const length = (value: unknown): number => {
    if (isArray(value) || isString(value)) return value.length;
    if (isObject(value)) return Object.keys(value).length;

    return 0;
};
