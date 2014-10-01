'use strict';

exports.parseDS4HIDData = parseDS4HIDData;

// Buffer -> DS4State
function parseDS4HIDData(buf) {
  var dPad = buf[5] & 15;
  return {
    leftAnalogX: buf[1],
    leftAnalogY: buf[2],
    rightAnalogX: buf[3],
    rightAnalogY: buf[4],
    l2Analog: buf[8],
    r2Analog: buf[9],

    dPadUp:    dPad === 0 || dPad === 1 || dPad === 7,
    dPadRight: dPad === 1 || dPad === 2 || dPad === 3,
    dPadDown:  dPad === 3 || dPad === 4 || dPad === 5,
    dPadLeft:  dPad === 5 || dPad === 6 || dPad === 7,

    cross: (buf[5] & 32) !== 0,
    circle: (buf[5] & 64) !== 0,
    square: (buf[5] & 16) !== 0,
    triangle: (buf[5] & 128) !== 0,

    l1: (buf[6] & 0x01) !== 0,
    l2: (buf[6] & 0x04) !== 0,
    r1: (buf[6] & 0x02) !== 0,
    r2: (buf[6] & 0x08) !== 0,
    l3: (buf[6] & 0x40) !== 0,
    r3: (buf[6] & 0x80) !== 0,

    share: (buf[6] & 0x10) !== 0,
    options: (buf[6] & 0x20) !== 0,
    trackPadButton: (buf[7] & 2) !== 0,
    psButton: (buf[7] & 1) !== 0,

    // ACCEL/GYRO
    motionY: buf.readInt16LE(13),
    motionX: -buf.readInt16LE(15),
    motionZ: -buf.readInt16LE(17),

    orientationRoll: -buf.readInt16LE(19),
    orientationYaw: buf.readInt16LE(21),
    orientationPitch: buf.readInt16LE(23),

    // TRACKPAD
    trackPadTouch0Id: buf[35] & 0x7f,
    trackPadTouch0Active: (buf[35] >> 7) === 0,
    trackPadTouch0X: ((buf[37] & 0x0f) << 8) | buf[36],
    trackPadTouch0Y: buf[38] << 4 | ((buf[37] & 0xf0) >> 4),

    trackPadTouch1Id: buf[39] & 0x7f,
    trackPadTouch1Active: (buf[39] >> 7) === 0,
    trackPadTouch1X: ((buf[41] & 0x0f) << 8) | buf[40],
    trackPadTouch1Y: buf[42] << 4 | ((buf[41] & 0xf0) >> 4),

    timestamp: buf[7] >> 2,
    //battery: buf[12],
    //batteryShort1: buf[12] & 0x0f,
    //batteryShort2: buf[12] & 0xf0,
    batteryLevel: buf[12]
  };
}
