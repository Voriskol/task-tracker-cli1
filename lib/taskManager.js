import {readTasks, writeTasks} from './fileHandler';

function generateId(tasks) {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(task => task.id)) + 1;
}

function checkTaskExisting(tasks, id) {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
        throw new Error(`Task with ID ${id} not found`);
    }
}

export async function addTask(description) {
    const tasks = readTasks();
    const newTask = {
        id: generateId(tasks),
        description,
        status: 'К выполнению',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

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

export async function updateTask(id) {
    const tasks = await readTasks();
    checkTaskExisting(tasks, id);
    const filteredTasks = tasks.filter(task => task.id !== parseInt(id));

    await writeTasks(filteredTasks);
    return true;
}