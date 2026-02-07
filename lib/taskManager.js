import { readTasks, writeTasks } from "./fileHandler";

function generateId(tasks) {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map((task) => task.id)) + 1;
}

function checkTaskExisting(tasks, id) {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex === -1) {
    throw new Error(`Task with ID ${id} not found`);
  }
}

export async function addTask(description) {
  const tasks = readTasks();
  const newTask = {
    id: generateId(tasks),
    description,
    status: "К выполнению",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  await writeTasks(tasks);
  return newTask;
}

export async function updateTask(id, description) {
  const tasks = await readTasks();
  checkTaskExisting(tasks, id);

  tasks[taskIndex].description = description;
  tasks[taskIndex].updatedAt = new Date().toISOString();

  await writeTasks(tasks);
  return tasks[taskIndex];
}

export async function deleteTask(id) {
  const tasks = await readTasks();
  checkTaskExisting(tasks, id);
  const filteredTasks = tasks.filter((task) => task.id !== parseInt(id));

  await writeTasks(filteredTasks);
  return true;
}

export async function markTask(id, status) {
  const validStatuses = ["К выполнению", "В работе", "Готово"];

  if (!validStatuses.includes(status)) {
    throw new Error(
      `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
    );
  }

  const tasks = await readTasks();
  checkTaskExisting(tasks, id);

  tasks[taskIndex].status = status;
  tasks[taskIndex].updatedAt = new Date().toISOString();

  await writeTasks(tasks);
  return tasks[taskIndex];
}

export async function getTasks(filter = "Все") {
  const tasks = await readTasks();

  switch (filter) {
    case "Готово": {
      return tasks.filter((task) => task.status === "Готово");
    }
    case "К выполнению": {
      return tasks.filter((task) => task.status === "К выполнению");
    }
    case "В работе": {
      return tasks.filter((task) => task.status === "В работе");
    }
    default: {
      return tasks;
    }
  }
}

export function formatTasks(tasks) {
  if (tasks.length === 0) {
    return "Задачи не найдены.";
  }

  return tasks
    .map((task) => {
      const statusEmoji = {
        todo: "📝",
        "in-progress": "🔄",
        done: "✅",
      };
      statusEmoji[task.status] || "❓";

      return `${statusEmoji} #${task.id}: ${task.description}
    Создана: ${new Date(task.createdAt).toLocaleString()}
    Обновлена: ${new Date(task.updatedAt).toLocaleString()}
    Статус: ${task.status}`;
    })
    .join("\n\n");
}
