let fs = typeof window === 'undefined' ? require('fs') : null;

import FileSystemInterface from "./FileSystemInterface";

export default class NodeFileSystem extends FileSystemInterface {

    public async createWriteStream(path: string) {
        this.stream =  fs.createWriteStream(path, { flags: 'a' });
        return this.stream;
    }

    public async writeToStream(data: Blob) {  
        const buffer = Buffer.from(await data.arrayBuffer());
        this.stream.write(buffer);
    }
}

