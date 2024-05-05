# universal-file-downloader

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](http://opensource.org/licenses/MIT) [![image](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](https://www.typescriptlang.org/) 

## Description
Repository to download file from everywhere
Working in the browser / nodejs / deno

If you want to use it in node js you need to specify "type" : "module" in your package.json

## Installation

You can install this package via npm:

```shell
npm install universal-file-downloader
```

## Usage

### Basic Example
Here is a basic usage example :

```js
import ufd from 'universal-file-downloader'
await new dfe('my_file.extension_file').downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4')
```

### Store file in another folder
If you want to store the file in another folder
```js
import ufd from 'universal-file-downloader'
await new dfe('my_file.extension_file').downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4')
```

### Configure Fetch Param
Maybe you want the file you request need to be done via POST
```js
import ufd from 'universal-file-downloader'
await new dfe('my_file.extension_file', { method : 'POST'}).downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4')
```

### Using a server proxy
It's possible that you want to use a server proxy
```js
import ufd from 'universal-file-downloader'
await new dfe('my_file.extension_file', {}, { url : 'my.server.proxy.com/', headers : {}}).downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4')
```

With the given configuration the url forward will become my.server.proxy.com/https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4

Be sure to configure the url as you need

### Download with less request
You have a good network and you want to download big chunk  ?
Increase it just like that : 
```js
import ufd from 'universal-file-downloader'
await new dfe('another_folder/my_file.extension_file', {}, {}, 10485760 * 10).downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4')
```

## Browser

Downloading from the browser is more tricky : slower than in back-end (cause browser api doesn't allow stream to blob without interruption) and require a proxy (Hello CORS) 
I advise you to download the video in the back-end and create a tmp link that you will return to your user then create a Blob and a download link 
But If you can't / don't want to use the back-end way, use the following code who is working well 

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Page</title>
</head>
<body>
    <button>Download</button>
</body>
<script type="module">
    import dfe from './node_modules/universal-file-downloader/dist/index.mjs';
    document.querySelector('button').addEventListener('click', async () => {
        const filename = "test.mp4";
        const proxyOptions = {
            url : 'http://localhost:8080/',
            headers : {'X-Requested-With' : 'XMLHttpRequest' }
        };
        await new dfe('toto.mp4', {}, proxyOptions).downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4');
    });
</script>
</html>
```

If you are looking for a plugin to bypass cors i advise you [tiny-cors-proxy](https://www.npmjs.com/package/tiny-cors-proxy)

You can install this package via npm:
```shell
npm install tiny-cors-proxy
```

Then create a new file **server.js** and paste the following snipset :

```js
import corsServer from 'tiny-cors-proxy';
corsServer.listen(8080);
```

Run the following command
```shell
node server.js
```