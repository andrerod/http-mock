/**
* Copyright (c) Microsoft.  All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var should = require('should');
var assert = require('assert');

var MockServerClient = require('../lib/mockserver-client');

suite('mockserver-client-tests', function (done) {
  test('can start and stop the mock server', function (done) {
    var mockServerClient = new MockServerClient();
    mockServerClient.isStarted().should.equal(false);
    mockServerClient.startServer();
    mockServerClient.isStarted().should.equal(true);
    mockServerClient.stopServer();
    mockServerClient.isStarted().should.equal(false);

    done();
  });

  test('can start and stop recording', )
});