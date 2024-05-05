let FileSystem;
if (typeof window !== 'undefined') {
    FileSystem = require('./BrowserFileSystem').default;
} else {
    FileSystem = require('./NodeFileSystem').default;
}

export default FileSystem;