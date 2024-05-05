import FileSystem from "./FileSystem";
import FileSystemInterface from "./FileSystem/FileSystemInterface";

export default class FileDownloader {
    private fetchOptions: RequestInit;
    private proxyOptions: { url: string, headers: HeadersInit};
    private chunkfileSize: number;
    private fileName: string;

    constructor(fileName?: string, fetchHeaders?: RequestInit, proxyOptions?: any, chunkSize: number = 10485760) {
        this.fileName = fileName || '';
        this.fetchOptions = fetchHeaders || {};
        this.proxyOptions = proxyOptions || {};
        this.chunkfileSize = chunkSize;
    }

    private getUrl(url: string): string {
        if(!this.proxyOptions.url){
            return url;
        }

        if(this.proxyOptions.headers == undefined){
            this.proxyOptions.headers = { };
        }

        if(this.fetchOptions.headers == undefined){
            this.fetchOptions.headers = { };
        }

        if(this.proxyOptions.headers){
            this.fetchOptions.headers = {...this.fetchOptions.headers, ...this.proxyOptions.headers};
        }
        return `${this.proxyOptions.url}${url}`;
    }

    public async downloadFile(url: string) {
        const response = await fetch(this.getUrl(url), this.fetchOptions);
        if (!response.ok) {
            throw new Error(`An issue occured during the download : ${response.statusText}`);
        }

        const contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition && this.fileName === '') {
            const match = contentDisposition.match(/filename="?(.+)"?$/);
            if (match) {
                this.fileName = match[1];
            }
        }

        const fileSize = parseInt(response.headers.get('Content-Length'), 10);
        let start = 0;
        let end = this.chunkfileSize - 1;

        const fileSystem: FileSystemInterface = new FileSystem();
        await fileSystem.createWriteStream(this.fileName, fileSize);

        while (start < fileSize) {
            const blob = await this.downloadAndSaveChunk(url, start, Math.min(end, fileSize - 1));
            start = end + 1;
            end += this.chunkfileSize;
            await fileSystem.writeToStream(blob);
        }

        await fileSystem.closeStream();
    }

    private async downloadAndSaveChunk(url: string, start: number, end : number) {

        url = this.getUrl(url);

        const options = this.fetchOptions;
        if(options.headers == undefined){
            options.headers = {};
        }
        options.headers['Range'] = `bytes=${start}-${end}`;
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`An issue occured during the download of the chunk: ${response.statusText}`);
        }
        const blob = await response.blob();
        return blob;
    }

}