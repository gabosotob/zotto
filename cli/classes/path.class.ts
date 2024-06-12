export default class Path {
    static buildFilePath(fileName: string, directoryPath?: string): string {
        if (directoryPath) {
            return `${process.cwd()}/${directoryPath}/${fileName}`;
        }
        return `${process.cwd()}/${fileName}`;
    }
}
