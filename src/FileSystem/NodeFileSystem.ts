let fs = typeof window === 'undefined' ? require('fs') : null;
let pipeline = typeof window === 'undefined' ? require('stream').pipeline : null;
let util = typeof window === 'undefined' ? require('util') : null;

import FileSystemInterface from "./FileSystemInterface";

export default class NodeFileSystem extends FileSystemInterface {

    public async saveFile(path: string, data) {
        await util.promisify(pipeline)(
            data,
            fs.createWriteStream(path)
        );
    }
}

