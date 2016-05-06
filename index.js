/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq: true,*/
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var net = require('net'),
    socklisten = require('unix-listen'),
    listen = require('listen-interface');

module.exports = function startup(options, imports, register) {

    var server = net.createServer();

    function notifyError(err) {
        if (err) {
            register(err);
        }
    }

    function listenCb(err) {
        if (err) {
            register(err);
        } else {
            register(null, {
                onDestroy: function (callback) {
                    server.close(callback);
                },
                socketserver: server
            });
        }
    }

    server.once('listening', listenCb);

    if (options.socket) {
        socklisten(server, options.socket, notifyError);
    } else if (options['interface']) {
        listen(server, options, notifyError);
    } else {
        server.listen(options.port, options.host);
    }
    return server;
};

module.exports.provides = ['socketserver'];
