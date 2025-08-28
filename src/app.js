const path = require('path'); // вычисление корректного пути до исполняемого модуля
const { fork } = require('child_process'); // запускает переданный модуль как отдельный процесс
const createReadlineInterface = require('./utils/create-readline');

// контроллер, позволяющий выбрать файл для исполнения:
const app = () => {
  const rl = createReadlineInterface();

  const question = `
========================================  
     ВЫБЕРИТЕ ПРОГРАММУ ДЛЯ ЗАПУСКА
----------------------------------------
1 - игра «Орёл или решка»
2 - программа-анализатор игровых логов
========================================
> `;

  rl.question(question, (input) => {
    const choice = input.trim();

    let file;
    const args = [];

    switch (choice) {
      case '1':
        file = path.join(__dirname, 'tasks', 'heads-or-tails-game.js');
        args.push('game-log.txt');
        break;
      case '2':
        file = path.join(__dirname, 'tasks', 'log-analyzer.js');
        args.push(path.join(__dirname, 'logs', 'game-log.txt'));
        break;
      default:
        console.log('Неверный выбор');
        rl.close();
        return;
    }

    fork(file, args);
    rl.close();
  });
};

module.exports = app;
