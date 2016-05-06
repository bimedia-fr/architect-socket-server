# architect-socket-server
architect socket server plugin


### Installation

```sh
npm install --save architect-socket-server
```
### Config Format 

```js
{
  "packagePath": "architect-socket-server",
  port: process.env.PORT || 1337,
  host: process.env.IP || "0.0.0.0"
}
```


### Usage

Boot [Architect](https://github.com/c9/architect) :

```js
var path = require('path');
var architect = require("architect");

var configPath = path.join(__dirname, "config.js");
var config = architect.loadConfig(configPath);

architect.createApp(config, function (err, app) {
    if (err) {
        throw err;
    }
    console.log("app ready");
});
```

Configure Architect with `config.js` :

```js
module.exports = [{
    packagePath: "architect-socket-server",
    port: process.env.PORT || 1337,
    host: process.env.IP || "0.0.0.0"
}];
```
 
And in your `index.js` :

```js
var path = require('path');
var architect = require('architect');

var configPath = path.join(__dirname, 'config.js');
var config = architect.loadConfig(configPath);

architect.createApp(config, function (err, app) {
    if (err) {
        throw err;
    }
    var socketserver = app.getService('socketserver');
    socketserver.on('connection', function (conn) {
        conn.write('hello');
    });
    console.log('app ready');
});
```

### Options
* port : tcp port to listent to
* host : host to listen to
* socket: unix socket to listen
* interface : network interface name to listen to (must match `os.networkInterfaces`)
* family : interface address family to listen to (with `interface`).