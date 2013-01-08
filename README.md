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

You can then enable / disable the mock server by using the HTTP_MOCK_ENABLED environment variable and switch between recording and playback modes by using the environment variable HTTP_MOCK_RECORDING.
You can also use the environemnt variable HTTP_MOCK_SHOW_LOGS to show logging information when running the mock server.
