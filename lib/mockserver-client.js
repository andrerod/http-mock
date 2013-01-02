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

var url = require('url');
var request = require('request');
var mockServer = require('./mockserver');

var RECORDING_PATH = '/session';

// Expose 'MockServerClient'
exports = module.exports = MockServerClient;

MockServerClient.isEnabled = function () {
  return (process.env['HTTP_MOCK_ENABLED'] === '1' ||
          process.env['HTTP_MOCK_ENABLED'] === 'true');
};

MockServerClient.isRecording = function () {
  return process.env['HTTP_MOCK_RECORDING'] === '1' ||
         process.env['HTTP_MOCK_RECORDING'] === 'true';
};

MockServerClient.showLogs = function () {
  return process.env['HTTP_MOCK_SHOW_LOGS'] === '1' ||
         process.env['HTTP_MOCK_SHOW_LOGS'] === 'true';
};

function MockServerClient() {
  this.recording = false;
  this.playback = false;

  mockServer.log = MockServerClient.showLogs();
};

MockServerClient.prototype.startServer = function () {
  if (!this.server) {
    this.server = mockServer.createServer();
  }
};

MockServerClient.prototype.stopServer = function () {
  if (this.server) {
    this.server.close();
    delete this.server;
  }
};

MockServerClient.prototype.isStarted = function () {
  return this.server !== undefined && this.server !== null;
};

MockServerClient.prototype.startTest = function (testName, callback) {
  if (MockServerClient.isRecording()) {
    this.startRecording(testName, callback);
  } else {
    this.startPlayback(testName, callback);
  }
};

MockServerClient.prototype.endTest = function (testName, callback) {
  if (MockServerClient.isRecording()) {
    this.endRecording(testName, callback);
  } else {
    this.endPlayback(testName, callback);
  }
};

MockServerClient.prototype.startRecording = function (name, callback) {
  request({
    url: url.format({
      protocol: 'http',
      hostname: 'localhost',
      port: 8888,
      pathname: RECORDING_PATH
    }),
    method: 'PUT',
    body: JSON.stringify({ "mode": "recording", "name": name })
  }, function (error, response, body) {
    if (!error) {
      this.recording = true;
    }

    callback(error, response, body);
  });
};

MockServerClient.prototype.endRecording = function (name, callback) {
  request({
    url: url.format({
      protocol: 'http',
      hostname: 'localhost',
      port: 8888,
      pathname: RECORDING_PATH
    }),
    method: 'DELETE',
    body: JSON.stringify({ "mode": "recording", "name": name })
  }, function (error, response, body) {
    if (!error) {
      this.recording = false;
    }

    callback(error, response, body);
  });
};

MockServerClient.prototype.startPlayback = function (name, callback) {
  request({
    url: url.format({
      protocol: 'http',
      hostname: 'localhost',
      port: 8888,
      pathname: RECORDING_PATH
    }),
    method: 'PUT',
    body: JSON.stringify({ "mode": "playback", "name": name })
  }, function (error, response, body) {
    if (!error) {
      this.playback = true;
    }

    callback(error, response, body);
  });
};

MockServerClient.prototype.endPlayback = function (name, callback) {
  request({
    url: url.format({
      protocol: 'http',
      hostname: 'localhost',
      port: 8888,
      pathname: RECORDING_PATH
    }),
    method: 'DELETE',
    body: JSON.stringify({ "mode": "playback", "name": name })
  }, function (error, response, body) {
    if (!error) {
      this.playback = false;
    }

    callback(error, response, body);
  });
};