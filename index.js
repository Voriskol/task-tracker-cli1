#!/usr/bin/env node

import { parseArgs, showHelp } from "./lib/cliParser.js";
import {
  addTask,
  updateTask,
  deleteTask,
  markTask,
  getTasks,
  formatTasks,
} from "./lib/taskManager.js";
import { initFile } from "./lib/fileHandler.js";

async function main() {
  try {
    await initFile();

    const { command, parameters } = parseArgs();

    switch (command) {
      case "добавить": {
        if (parameters.length === 0) {
          throw new Error("Добавьте описание.");
        }
        const newTask = await addTask(parameters.join(" "));
        console.log(`Задача успешно добавлена (Идентификатор: ${newTask.id}).`);
        break;
      }
      case "обновить": {
        if (parameters.length < 2) {
          throw new Error(
            "Идентификатор и описание обязательны для вызова команды.",
          );
        }
        const [updateId, ...updateDesc] = parameters;
        await updateTask(updateId, updateDesc.join(" "));
        console.log(`Задача ${updateId} успешно обновлена.`);
        break;
      }
      case "удалить": {
        if (parameters.length === 0) {
          throw new Error("Идентификатор обязателен для вызова команды.");
        }
        await deleteTask(parameters[0]);
        console.log(`Задача ${parameters[0]} успешно удалена.`);
        break;
      }
      case "отметить-в-работе": {
        if (parameters.length === 0) {
          throw new Error("Идентификатор обязателен для вызова команды.");
        }
        await markTask(parameters[0], "в-работе");
        console.log(`Задача ${parameters[0]} отмечена как "в-работе".`);
        break;
      }
      case "отметить-готово": {
        if (parameters.length === 0) {
          throw new Error("Идентификатор обязателен для вызова команды.");
        }
        await markTask(parameters[0], "готово");
        console.log(`Задача ${parameters[0]} отмечена как "готово".`);
        break;
      }
      case "отметить-к-выполнению": {
        if (parameters.length === 0) {
          throw new Error("Идентификатор обязателен для вызова команды.");
        }
        await markTask(parameters[0], "к-выполнению");
        console.log(`Задача ${parameters[0]} отмечена как "к-выполнению".`);
        break;
      }
      case "список": {
        const filter = parameters[0] || "все";
        const validFilters = ["все", "к-выполнению", "в-работе", "готово"];

        if (!validFilters.includes(filter)) {
          throw new Error(
            `Неверный фильтр. Используйте эти: ${validFilters.join(", ")}`,
          );
        }

        const tasks = await getTasks(filter);
        console.log(`\n📋 Задачи (${filter}):\n`);
        console.log(formatTasks(tasks));
        break;
      }
      case "помощь": {
        console.log(showHelp());
        break;
      }
      default:
        throw new Error(
          `Неизвестная команда: ${command}. Используйте 'помощь' для получения руководства.`,
        );
    }
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
}

main();
