import { EMPTY_PATH } from '../constants/path.constants';

export const toPath = (path: string): string => (path.startsWith(EMPTY_PATH) ? path : `${EMPTY_PATH}${path}`);
export const joinPaths = (...paths: string[]): string =>
    paths.filter(path => path !== EMPTY_PATH).join('') || EMPTY_PATH;
