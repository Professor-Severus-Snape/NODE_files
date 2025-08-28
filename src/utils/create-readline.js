const readline = require('readline');

// утилита создания интерфейса:
const createReadlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

module.exports = createReadlineInterface;
