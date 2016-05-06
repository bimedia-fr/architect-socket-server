var plugin = require('../index');
var service;
module.exports = {
    tearDown : function (done) {
        if(service) {
            return service.onDestroy(done);
        };
        done();
    },
    testExport : function (test) {
        plugin({port: 1337, host: '127.0.0.1'}, {}, function (err, s) {
            test.ifError(err);
            service = s;
            test.ok(s);
            test.equal(typeof s.onDestroy, 'function');
            test.ok(s.socketserver);
            test.done();
        });
    },
    testListenInterface : function (test) {
        plugin({port: 1337, 'interface': 'lo'}, {}, function (err, s) {
            test.ifError(err);
            service = s;
            test.ok(s);
            test.equal(typeof s.onDestroy, 'function');
            test.ok(s.socketserver);
            test.done();
        });
    },
    testListenUnixSocket : function (test) {
        plugin({port: 1337, 'socket': '/tmp/sockserver.sock'}, {}, function (err, s) {
            test.ifError(err);
            service = s;
            test.ok(s);
            test.equal(typeof s.onDestroy, 'function');
            test.ok(s.socketserver);
            test.done();
        });
    }
};
