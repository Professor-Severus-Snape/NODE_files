const fs = require('fs');
const path = require('path');
const { promisify } = require('util'); // превращает f с колбэком -> в f, возвращающую промис
const createReadlineInterface = require('../utils/create-readline');

// получаем имя файла из аргументов:
const logFileName = process.argv[2];

if (!logFileName) {
  console.error('Ошибка: не указано имя лог-файла.');
  process.exit(1);
}

// формируем полный путь до файла в папке logs:
const logFilePath = path.join(__dirname, '..', 'logs', logFileName);

// проверяем, что папка logs существует:
const dir = path.dirname(logFilePath);

// елси нет, то создаем её:
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const rl = createReadlineInterface();

// метод .question() у объекта rl делаем асинхронным - можно использовать синтаксис async/await:
const askQuestion = promisify(rl.question).bind(rl); // важно привязать контекст!!!

// функция логирования результата:
const logResult = ({ input, answer, win }) => {
  const content = {
    date: new Date().toISOString(),
    input,
    answer,
    win,
  };

  const prettyContent = JSON.stringify(content)
    .replace(/{/g, '{ ')
    .replace(/}/g, ' }')
    .replace(/":/g, '": ')
    .replace(/,/g, ', ');

  // дозапись в файл:
  fs.appendFile(logFilePath, prettyContent + '\n', (err) => {
    if (err) {
      console.error('Ошибка записи в лог-файл:', err.message);
    }
  });
};

// генерация случайного значения (1 — Орёл, 2 — Решка):
const getRandomFlip = () => (Math.random() < 0.5 ? 1 : 2);

const startGame = async() => {
  console.log(`
========================================
        ИГРА "ОРЁЛ ИЛИ РЕШКА"
----------------------------------------
Выберите 1 (Орёл) или 2 (Решка), чтобы
угадать результат броска монетки.
========================================`);

  while (true) {
    console.log('\n🪙 Бросаю монетку...');
    const inputStr = await askQuestion('Ваш выбор (1 - Орёл, 2 - Решка): '); // коллбэк не нужен
    const input = Number(inputStr.trim());

    if (input !== 1 && input !== 2) {
      console.log('⚠️ Введите 1 (Орёл) или 2 (Решка).');
      continue; // повторить запрос
    }

    const answer = getRandomFlip();
    const win = input === answer;

    console.log(
      `Выпало: ${answer === 1 ? 'Орёл' : 'Решка'}. Вы ${
        win ? 'угадали 🎉' : 'не угадали 😞'
      }.`,
    );

    logResult({ input, answer, win });

    let cont = await askQuestion('\nСыграть ещё? (y/n): ');
    cont = cont.trim().toLowerCase();

    if (cont !== 'y') {
      console.log('\nСпасибо за игру!');
      break;
    }
  }

  rl.close();
};

startGame();
