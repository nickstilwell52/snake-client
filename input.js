// Stores the active TCP connection object.
let connection;
let move = null;
let keys = {
  w: 'up',
  a: 'left',
  s: 'down',
  d: 'right'
};
let lastkey = '';

const setupInput = (conn) => {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  stdin.on("data", handleUserInput);
  return stdin;
};

const handleUserInput = function(key) {
  if (lastkey !== key) { // this fixes bad inputs
    if (keys.hasOwnProperty(key)) {
      clearInterval(move);
      move = setInterval(() => {
        connection.write(`Move: ${keys[key]}`);
      }, 200)
    }
    else if (key === 'n') {
      connection.write('Say: nom');
    }
    else if (key === 'm') {
      connection.write('Say: my egg');
    }
    else if (key === '\u0003') {
      process.exit();
    }
    lastkey = key;
  }
}


module.exports = setupInput;