# Node-Get-Time
This is an easy module that gets the current date or time of the day and outputs it in a simple way!

**Install**
```js
npm install node-get-time --save
```
**Import**
```js
const time = require('node-get-time');
```

## Methods

```js
time.gettime(function(res){

});
```
- res: The response you get
    - dateTime: The time and date.
    - date: The current date.
    - time: The current time.
```js
time.now();
```
Returnes the current time.
## Examples
**You can copy and paste these!**
### Just get the time
```js
const time = require('node-get-time');

console.log(time.now());
```
```
19:22:23
```
### Display all information
```js
const time = require('node-get-time');

time.gettime(function(time){
    console.log(time)
});
```
**Output**
```json
    {
        "dateTime": "2018/06/02 18:49:42",
        "date": "2018/06/02",
        "time": "18:49:42"
    }
```

### Make information into variables
```js
const time = require('node-get-time');

time.gettime(function(time){
    var dateandtime = time.dateTime;
    var date = time.date;
    var time = time.time;
    console.log(dateandtime);
    console.log(date);
    console.log(time);
});
```
**Output**
```
2018/06/02 19:02:22
2018/06/02
19:02:22
```

### More info
I'm really **happy** if you'd like to share this module or use this in your upcomming script or whatever you are going to use this for. If you feel like there is anything missing then please open an issue on the [Github](https://github.com/ThunbergOlle/node-gettime) page. I will fix it as soon as possible.
## License

Copyright (c) 2018 Olle Thunberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE