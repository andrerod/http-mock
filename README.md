# http-mock

Http mock is a forward proxy that can be used to mock http requests.


# Install

```sh
$ npm install http-mock
```

# Use

On your mocha tests, you can setup http-mock like this:

```js
var MockServerClient = require('http-mock');

var mockServer;

suite('mytests', function () {
  suiteSetup(function () {
    if (MockServerClient.isEnabled()) {
      if (!mockServer) {
        mockServer = new MockServerClient();
      }

      mockServer.startServer();
    }
  });

  suiteTeardown(function () {
    if (MockServerClient.isEnabled()) {
      mockServer.stopServer();
    }
  });

  setup(function (done) {
    if (MockServerClient.isEnabled()) {
      mockServer.startTest({insert_unique_test_name_here}}, done);
    } else {
      done();
    }
  });

  teardown(function (done) {
    if (MockServerClient.isEnabled()) {
      mockServer.endTest({insert_unique_test_name_here}}, done);
    } else {
      done();
    }
  });

  // Tests go here
});
```
