export class Path {
    static buildFilePath(fileName: string, directoryPath?: string): string {
        return `${process.cwd()}${directoryPath ? `/${directoryPath}` : ''}/${fileName}`;
    }
}
