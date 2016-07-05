# mkblog
A small blog site using Modepress and Webinate Users as its backend

## Current stable version
* v0.1.0

## Requirements
* MongoDB v3.*
* Node ^6.2.0
* [Webinate-Users](https://github.com/MKHenson/webinate-users)
* [ModePress](https://github.com/MKHenson/modepress)
* **Tested Ubuntu v14.04**
* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## Installation

1) Make sure the requirements are installed and running
2) Create a folder where you want to store blog and go into that folder

```
mkdir blog
cd blog
```

3) Run as an admin / or make sure you have write privileges in the blog folder
```
sudo su
```

4) Download and install the desired version from github

If you want the latest stable version:

```
curl -o- https://raw.githubusercontent.com/MKHenson/mkblog/master/install-script.sh | bash
```

OR if you want the dev build

```
curl -o- https://raw.githubusercontent.com/MKHenson/mkblog/dev/install-script-dev.sh | bash
```

5) Install the build dependencies

    npm install

6) Build the project

```
gulp install
gulp build-all
```

Note: To build a release version, replace the build-all with build-all-release

```
gulp install
gulp build-all-release
```
The release version is a lot smaller.

Once this is complete, the built project will reside in the dist folder

7) (Optional) Add the "dist" folder as a new target for Modepress

* Open the config file for modepress /modepress/config.json
* Create a new server block in the servers property
```
{
    "host": "blog.net",
    "portHTTP": 8001,
    "ssl": false,
    "staticFilesFolder": ["YOUR DIST FOLDER PATH (MUST BE ABSOLUTE VALUE)"],
    "approvedDomains": ["blog\\.net"],
    "controllers": [
        { "path" : "./controllers/page-renderer.js" },
        { "path" : "./controllers/emails-controller.js" },
        { "path" : "./controllers/posts-controller.js" },
        { "path" : "./controllers/comments-controller.js" }
    ],
    "paths": [
    {
        "name": "default",
        "path": "*",
        "index": "YOUR DIST FOLDER PATH (MUST BE ABSOLUTE VALUE)/index.jade",
        "plugins": []
    }]
}
```


## Third Party Credits
The blog makes use of the following third party libraries

* [JQuery](https://jquery.com/)
* [AngularJS](https://angularjs.org/)
* [Angular UI Router](https://github.com/angular-ui/ui-router)
