const fs = require('fs');
const path = require('path');

// получаем путь до лог-файла из аргументов:
const logFilePath = process.argv[2];

if (!logFilePath) {
  console.error('Ошибка: не указан путь к лог-файлу.');
  process.exit(1);
}

// проверяем, что файл существует:
if (!fs.existsSync(logFilePath)) {
  console.error(`Ошибка: файл "${logFilePath}" не найден.`);
  process.exit(1);
}

// считываем содержимое лог-файла:
fs.readFile(logFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка при чтении лог-файла:', err.message);
    process.exit(1);
  }

  const lines = data.trim().split('\n').filter(Boolean); // обязательно фильтруем пустые строки
  const entries = []; // массив записей

  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      entries.push(entry);
    } catch (e) {
      console.warn('⚠️ Пропущена строка с некорректным JSON:', line);
    }
  }

  const totalGames = entries.length;
  const wins = entries.filter((e) => e.win).length;
  const losses = totalGames - wins;
  const winRate = totalGames > 0 ? parseInt((wins / totalGames) * 100) : 0;

  const fileName = path.basename(logFilePath);

  console.log(`
      РЕЗУЛЬТАТЫ АНАЛИЗА ЛОГ-ФАЙЛА
========================================
Файл:                     ${fileName}
Всего партий:             ${totalGames}
Выиграно:                 ${wins}
Проиграно:                ${losses}
Процент побед:            ${winRate}%
========================================
  `);
});
