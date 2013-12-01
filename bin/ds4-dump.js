#!/usr/bin/env node

'use strict';

var _ = require('lodash');
var hid = require('node-hid');
var ds4 = require('..');
var optimist = require('optimist').argv;

var parseDS4HIDData = ds4.parseDS4HIDData;

var devices = hid.devices();

var controller = _(devices)
  .filter(isDS4HID)
  .filter(isUSBHID)
  .map(createHID)
  .first();

if (!controller)
  throw new Error('Could not find desired controller.');

controller.on('data', function(buf) {
  console.log(parseDS4HIDData(buf));
});






// HIDDesciptor -> Boolean
function isDS4HID(descriptor) {
  return descriptor.vendorId == 1356 && descriptor.productId == 1476;
}

// HIDDesciptor -> Boolean
function isBluetoothHID(descriptor) {
  return descriptor.path.match(/^Bluetooth/);
}

// HIDDesciptor -> Boolean
function isUSBHID(descriptor) {
  return descriptor.path.match(/^USB/);
}

// HIDDescriptor -> HID
function createHID(descriptor) {
  return new hid.HID(descriptor.path);
}

//
// Debug & pretty printing
//

function showIndexedBufferSlice(buffer, start, end) {
  return _.zipObject(_.times(end - start).map(function(n) {
    return [start + n, buffer[start + n]];
  }));
}

function showBar(length, barchar) {
  if (!barchar) barchar = '|';
  return _.times(length, _.constant(barchar)).join('');
}

function showPos(min, max, width, value) {
  var scale = (max - min) / width; // -> 32
  var l = Math.floor((value - min) / scale);
  var r = Math.floor((max - value) / scale);
  return showBar(l, '.') + 'O' + showBar(r, '.');
}

function showBits(word) {
  return pad(parseInt(word).toString(2), 8);
}

function showHex(word) {
  return pad(parseInt(word).toString(16), 2);
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
