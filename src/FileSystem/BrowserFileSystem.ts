import FileSystemInterface from "./FileSystemInterface";
const streamsaver = require('../../lib/streamsaver.js');
//import { FileSystemWritableFileStream, FileSystemFileHandle } from "native-file-system-adapter";

export default class BrowserFileSystem extends FileSystemInterface {
    private file: any;

    public async createWriteStream(path: string, size: number) {
        this.file = streamsaver.createWriteStream(path, { size });
        this.stream = this.file.getWriter()
        return this.stream;
    }

    public async writeToStream(data: Blob) {
        const arrayBuffer = await data.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        await this.stream.write(uint8Array);
    }
}

