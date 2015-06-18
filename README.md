# mkblog
A small blog site using Modepress and Webinate Users as its backend

## Current stable version
* v0.0.8

## Requirements
* MongoDB v3
* Node 0.0.12
* [Webinate-Users](https://github.com/MKHenson/webinate-users) 
* [ModePress](https://github.com/MKHenson/modepress) 
* **Tested Ubuntu v14**

## Installation

1) Make sure the requirements are installed and running
2) Create a folder where you want to store mkblog and go into that folder

```
mkdir mkblog
cd mkblog
```

3) Run as an admin / or make sure you have write privileges in the mkblog folder
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

5) Add the "resources" folder as a static folder to the modepress config.json - "staticFilesFolder"

* Open the config file for modepress /var/www/modepress/config.json
* In the "staticFilesFolder" section, add a new array item which is the path of the new site
```
E.g.
"staticFilesFolder": ["/mkblog/resources"]
```
* Also change the "templatePath" and “index”
```
"templatePath": "/mkblog/templates"
"index": "index"
```