import FileSystem from "./FileSystem";
import FileSystemInterface from "./FileSystem/FileSystemInterface";

export default class FileDownloader {
    private fetchOptions: RequestInit;
    private proxyOptions: { url: string, headers: HeadersInit};
    private fileName: string;

    constructor(fileName?: string, fetchHeaders?: RequestInit, proxyOptions?: any) {
        this.fileName = fileName || '';
        this.fetchOptions = fetchHeaders || {};
        this.proxyOptions = proxyOptions || {};
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

        const fileSystem: FileSystemInterface = new FileSystem();
        await fileSystem.saveFile(this.fileName, response.body);
    }

}