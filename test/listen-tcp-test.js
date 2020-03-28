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
    describe('listen interface', function(){
        it('should listen on specified interface', function(done) {
            plugin({port: 0, 'interface': 'lo'}, {}, function (err, s) {
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
