export default class FileSystemInterface {
    protected stream: any = null;

    public createWriteStream(path: string, size : number) : any {}

    public async writeToStream(data) : Promise<void>{}

    public async closeStream() {
        this.stream.close();
    }
}