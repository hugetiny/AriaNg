# WeDownload
[![License](https://img.shields.io/github/license/hugetiny/WeDownload.svg?style=flat)](https://github.com/hugetiny/WeDownload/blob/master/LICENSE)
[![Lastest Build](https://img.shields.io/circleci/project/github/hugetiny/WeDownload.svg?style=flat)](https://circleci.com/gh/hugetiny/WeDownload/tree/master)
[![Lastest Release](https://img.shields.io/github/release/hugetiny/WeDownload.svg?style=flat)](https://github.com/hugetiny/WeDownload/releases)

## Introduction
WeDownload is a modern web frontend making [aria2](https://github.com/aria2/aria2) easier to use. WeDownload is written in pure html & javascript, thus it does not need any compilers or runtime environment. You can just put WeDownload in your web server and open it in your browser. WeDownload uses responsive layout, and supports any desktop or mobile devices.

## Features
1. Pure Html & Javascript, no runtime required
2. Responsive design, supporting desktop and mobile devices
3. User-friendly interface
    * Sort tasks (by name, size, progress, remaining time, download speed, etc.), files, peers
    * Search tasks
    * Adjust task order by dragging
    * More information of tasks (health percentage, client infomation of bt peers, etc.)
    * Filter files by spectificed file types (videos, audios, pictures, documents, applications, archives, etc.)
    * Tree view for multi-directory task
    * Download / upload speed chart for aria2 or single task
    * Full support for aria2 settings
4. Url command line api support
5. Download finished notification
6. Multi-languages support
7. Multi aria2 RPC host support
8. Exporting and Importing settings support
9. Less bandwidth usage, only requesting incremental data

## Screenshots
#### Desktop
![WeDownload](https://raw.githubusercontent.com/hugetiny/WeDownload-WebSite/master/screenshots/desktop.png)
#### Mobile Device
![WeDownload](https://raw.githubusercontent.com/hugetiny/WeDownload-WebSite/master/screenshots/mobile.png)

## Installation
#### Prebuilt release
Latest Release: [https://github.com/hugetiny/WeDownload/releases](https://github.com/hugetiny/WeDownload/releases)

Latest Daily Build: [https://github.com/hugetiny/WeDownload-DailyBuild/archive/master.zip](https://github.com/hugetiny/WeDownload-DailyBuild/archive/master.zip)

#### Building from source
Make sure you have [Node.js](https://nodejs.org/), [NPM](https://www.npmjs.com/) and [Gulp](https://gulpjs.com/) installed. Then download the source code, and follow these steps.

    $ npm install
    $ gulp clean build

The builds will be placed in the dist directory.

#### Usage Notes
Since WeDownload loads language resources asynchronously, you may not open index.html directly on the local file system to run WeDownload. It is recommended that you deploy WeDownload in a web container or download [WeDownload Native](https://github.com/hugetiny/WeDownload-Native) that does not require a browser to run.

## Documents
1. [English](http://WeDownload.hugetiny.net)
2. [Simplified Chinese (简体中文)](http://WeDownload.hugetiny.net/zh_Hans)

## Demo
Please visit [http://WeDownload.hugetiny.net/latest](http://WeDownload.hugetiny.net/latest)

## License
[MIT](https://github.com/hugetiny/WeDownload/blob/master/LICENSE)
