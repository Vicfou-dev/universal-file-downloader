import FileSystemInterface from "./FileSystemInterface";
const streamsaver = require('../../lib/streamsaver.js');

export default class BrowserFileSystem extends FileSystemInterface {

    public async saveFile(path: string, data) {
        await data.pipeTo(streamsaver.createWriteStream(path))
    }
}

