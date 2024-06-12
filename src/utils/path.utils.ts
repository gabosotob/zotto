import { EMPTY_PATH, PATH_SEPARATOR } from '../constants/path.constants';

export const toPath = (path?: string): string => {
    if (path !== undefined) {
        return path.startsWith(PATH_SEPARATOR) ? path : `${PATH_SEPARATOR}${path}`;
    }
    return EMPTY_PATH;
};

export const joinPaths = (...paths: string[]): string =>
    paths.filter(path => path !== PATH_SEPARATOR).join('') || PATH_SEPARATOR;

export const toAbsolutePath = (basePath: string, relativePath: string) => `${basePath}${relativePath}`;
