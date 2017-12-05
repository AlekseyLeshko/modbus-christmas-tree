const modbus = require('jsmodbus');

const host = process.argv[2] || '127.0.0.1';
const port = process.argv[3] || 8888;

const client = modbus.client.tcp.complete({
  'host': process.argv[2],
  'port': process.argv[3],
  'unitId': 1,
  'logEnabled': true,
  'logLevel': 'debug'
});

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getAddress = () => {
  return getRandomInt(0, 4);
}

const delay = 2018;
client.on('connect', function () {
  setInterval(() => {
    const address = getAddress();
    const value = Math.random() >= 0.5;
    client.writeSingleCoil(address, value);
  }, delay);
});

client.connect();

