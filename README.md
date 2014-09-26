# node-ds4

Stream events from DualShock 4 controllers. Works for Bluetooth & USB.

Supports:

- Left & right analog stick
- D-pad: up, down, left, right (also intermediate positions)
- Buttons: x, circle, square, triangle, share, options, (__DS4__) trackpad button
- Left & right analog triggers
- __(DS4)__ 2 touches on the trackpad (X, Y, active, ID) & trackpad button
- Gryoscope (absolute orientation) & accelerometer (relative movement)
- Battery status

Compared to the DS3 the DS4 dropped most pressure sensitive buttons.
Only L2 and R2 are still also analog. PEW PEW!
I guess someone had to make room for the trackpad...

TODO:

- Activating motors
- Changing LED color
- Microphone/speaker magic

## Install

``` sh
$ npm install -g ds4
```

## Usage

``` sh
$ ds4-dump
```

Will dump decoded events to stdout.

``` js
var ds4 = require('ds4');
var through = require('through');

// controller is a node-hid HID object representing the controller
hid.pipe(through(ds4.parseDS4HIDData)).pipe(process.stdout);
```

Example output frame:

``` js
{ leftAnalogX: 128,
  leftAnalogY: 128,
  rightAnalogX: 127,
  rightAnalogY: 127,
  l2Analog: 0,
  r2Analog: 0,
  dPadUp: false,
  dPadRight: false,
  dPadDown: false,
  dPadLeft: false,
  x: false,
  cricle: false,
  square: false,
  triangle: false,
  l1: false,
  l2: false,
  r1: false,
  r2: false,
  l3: false,
  r3: false,
  share: false,
  options: false,
  trackPadButton: false,
  psButton: false,
  motionY: 0,
  motionX: 1,
  motionZ: -2,
  orientationRoll: -145,
  orientationYaw: 8155,
  orientationPitch: 2089,
  trackPadTouch0Id: 4,
  trackPadTouch0Active: false,
  trackPadTouch0X: 1513,
  trackPadTouch0Y: 40,
  trackPadTouch1Id: 0,
  trackPadTouch1Active: false,
  trackPadTouch1X: 0,
  trackPadTouch1Y: 0,
  timestamp: 36,
  batteryLevel: 0 }
```

## Caveat

As long as this is pre 1.0 I'll rename property names.

¯\\\_(ツ)\_/¯

## Thanks & References

- http://www.psdevwiki.com/ps4/Talk:DualShock_4 http://www.psdevwiki.com/ps4/DualShock_4
- @johndrinkwater [protocol gist](https://gist.github.com/johndrinkwater/7708901)
- @rdepena [node-dualshock-controller](https://github.com/rdepena/node-dualshock-controller)

## LICENSE

MIT
