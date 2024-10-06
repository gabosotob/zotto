/* eslint-disable no-console */
import commentJson, { CommentJSONValue } from 'comment-json';
import fs from 'fs';
import path from 'path';

import FileName from '../enums/file-name.enum';

export default class FsHelper {
    static checkFileExists(fileName: string, relativePath = process.cwd()) {
        return fs.existsSync(path.join(relativePath, fileName));
    }

    static getFile(fileName: string, relativePath = process.cwd()) {
        if (!FsHelper.checkFileExists(fileName, relativePath)) return null;

        return fs.readFileSync(path.join(relativePath, fileName), 'utf-8');
    }

    static getJsonFile(fileName: string, relativePath = process.cwd()): CommentJSONValue {
        const file = FsHelper.getFile(fileName, relativePath);

        if (!file) return null;

        return commentJson.parse(file);
    }

    static writeFile(fileName: string, data: any, relativePath = process.cwd()) {
        fs.writeFileSync(path.join(relativePath, fileName), data);
    }

    static writeJsonFile(fileName: string, data: any, options?: { relativePath?: string; noComments?: boolean }) {
        const relativePath = options?.relativePath ?? process.cwd();

        if (options?.noComments) FsHelper.writeFile(fileName, JSON.stringify(data, null, 2), relativePath);
        else FsHelper.writeFile(fileName, commentJson.stringify(data, null, 2), relativePath);
    }

    static getPackageJson(relativePath = process.cwd()): CommentJSONValue {
        return FsHelper.getJsonFile(FileName.PACKAGE_JSON, relativePath);
    }
}
