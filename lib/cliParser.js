export function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    throw new Error(
      'Команда не существует. Используйте "help" для получения руководства.',
    );
  }

  const command = args[0];
  const parameters = args.slice(1);

  return { command, parameters };
}

export function showHelp() {
  return `
Менеджер задач CLI - Управляйте вашими задачами

Команды:
  добавить <description>      Добавить новую задачу
  обновить <id> <desc>     Обновить описание задачи
  удалить <id>            Удалить задачу
  отметить-в-работе <id>  Перевести статус задачи в "В работе"
  отметить-готово <id>         Перевести статус задачи в "Готово"
  список [filter]          Список задач (all|todo|in-progress|done)
  помощь                   Показать это руководство

Примеры:
  task-cli добавить "Купить овощи"
  task-cli список
  task-cli отметить-готово 1
  task-cli список Готово
  `;
}
