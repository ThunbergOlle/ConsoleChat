# check-update-github

Check if there are a update on github repository.

[![Build Status](https://travis-ci.org/cedced19/check-update-github.svg?branch=master)](https://travis-ci.org/cedced19/check-update-github)
[![NPM version](https://badge.fury.io/js/check-update-github.svg)](http://badge.fury.io/js/check-update-github)

![](https://raw.githubusercontent.com/cedced19/check-update-github/master/demo.png)

```bash
npm install --save check-update-github
```

## Example

```js
var checkUpdate = require('check-update-github');
var pkg = require('./package.json');

checkUpdate({
    name: pkg.name, 
    currentVersion: pkg.version, 
    user: 'your-github-accound',
    branch: 'master'
    }, function(err, latestVersion, defaultMessage){
    if(!err){
        console.log(defaultMessage);
    }
});
```

### Options

#### name

*Required*  
Type: `string`

Define the package name for search in Github.

#### currentVersion

*Required if you want a default message*  
Type: `string`

Define the version currently installed.

#### user

*Required*  
Type: `string`

Define the github acount for search in Github.

#### branch

Type: `string`
Default: `master`

Define the git branch for search in Github.