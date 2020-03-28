var assert = require('assert');
var plugin = require('../index');

var service;

after(function () {
    return new Promise(function(resolve, reject) {
        if(service) {
            return service.onDestroy(resolve);
        };
        resolve();
    });
});
describe('architect-socket-server', function() {
    describe('export', function() {
        it('should return a valid export', function(done) {
            plugin({port: 1337, host: '127.0.0.1'}, {}, function (err, s) {
                assert.ifError(err);
                service = s;
                assert.ok(s);
                assert.equal(typeof s.onDestroy, 'function');
                assert.ok(s.socketserver);
                done();
            });    
        })
    });
 });
