const net = require("net");

// establishes a connection with the game server
const connect = function () {
  const conn = net.createConnection({
    host: 'localhost',
    port: 50541,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  conn.on('connect', () => {
    console.log('Connected!');
    conn.write('Name: NDL') // Name our snake
    //conn.write('Move: up') // Test movement command
    //setTimeout(() => conn.write('Move: up'), 500) // Test delayed movement
  });

  conn.on('data', (data) => {
    console.log(data);
  });

  return conn;
};

console.log("Connecting ...");
connect();

module.exports = connect;