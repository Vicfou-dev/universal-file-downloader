# universal-file-downloader

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](http://opensource.org/licenses/MIT) [![image](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](https://www.typescriptlang.org/) 


# Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
3.1 [Basic example](#basic-example)
3.2 [Store file in another foler](#store-file-in-another-folder)
3.3 [Configure fetch parameter](#configure-fetch-param)
3.4 [Using a server proxy](#using-a-server-proxy)
3.5 [Download with less request](#download-with-less-request)
4. [Browser](#browser)
4.1 [Download File from browser](#download-file-from-browser)
4.2 [Install via cdn](#install-via-cdn)
4.3 [Setup Proxy](#setup-proxy)
5. [License](#license)

## Description 
Repository to download file from everywhere !!!

It's work in the **browser** / **nodejs** / **deno**

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
await new ufd('my_file.extension_file').downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4')
```

### Store file in another folder
If you want to store the file in another folder
```js
import ufd from 'universal-file-downloader'
await new ufd('my_file.extension_file').downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4')
```

### Configure Fetch Param
Maybe you want the file you request need to be done via POST
```js
import ufd from 'universal-file-downloader'
await new ufd('my_file.extension_file', { method : 'POST'}).downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4')
```

### Using a server proxy
It's possible that you want to use a server proxy
```js
import ufd from 'universal-file-downloader'
await new ufd('my_file.extension_file', {}, { url : 'my.server.proxy.com/', headers : {}}).downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4')
```

With the given configuration the url forward will become my.server.proxy.com/https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4

Be sure to configure the url as you need

## Browser

### Download file from browser
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
    import ufd from './node_modules/universal-file-downloader/dist/index.mjs';
    document.querySelector('button').addEventListener('click', async () => {
        const filename = "test.mp4";
        const proxyOptions = {
            url : 'http://localhost:8080/',
            headers : {'X-Requested-With' : 'XMLHttpRequest' }
        };
        await new ufd('toto.mp4', {}, proxyOptions).downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4');
    });
</script>
</html>
```

### Install via CDN

You can also use the cdn version if you don't want to use install this package
```html
<script type="module">
    import Inspector from 'https://cdn.jsdelivr.net/npm/universal-file-downloader/dist/index.mjs';
</script>
```

### Setup proxy

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

## License
[This project is licensed under the MIT license](license.md) 