var assert = require('assert');
var plugin = require('../index');

var service;

describe('architect-socket-server', function() {
    after(function () {
        return new Promise(function(resolve, reject) {
            if(service) {
                return service.onDestroy(resolve);
            };
            resolve();
        });
    });
    describe('listen unix interface', function() {
        it('should listen on unix socket', function(done) {
            plugin({port: 1337, 'socket': '/tmp/sockserver.sock'}, {}, function (err, s) {
                assert.ifError(err);
                service = s;
                assert.ok(s);
                assert.equal(typeof s.onDestroy, 'function');
                assert.ok(s.socketserver);
                done();
            });   
        });
    });
});
