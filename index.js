const fs = require("fs");
const path = require("path");

// Function to check if data file exists, and create it if not
const checkAndCreateDataFile = () => {
  if (!fs.existsSync(path.resolve(__dirname, "data.json"))) {
    fs.writeFileSync(path.resolve(__dirname, "data.json"), "[]");
  }
};

// Generate a unique ID for tasks
const uuid = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Read tasks from data file
const readTasks = () => {
  checkAndCreateDataFile();
  const tasksString = fs.readFileSync(path.resolve(__dirname, "data.json"), "utf8");
  return JSON.parse(tasksString);
};

// List tasks based on status
const listTasks = (status = "") => {
  const tasks = readTasks();

  if (status) {
    return tasks.filter((task) => task.status === status);
  }

  return tasks;
};

// Add a new task
const addTask = (content) => {
  const tasks = readTasks();

  const newTask = {
    id: uuid(),
    description: content,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(tasks));
};

// Update a task
const updateTask = (taskId, update) => {
  const tasks = readTasks();

  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  tasks[taskIndex] = { ...tasks[taskIndex], ...update, updatedAt: new Date().toISOString() };

  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(tasks));
};

// Remove a task
const removeTask = (taskId) => {
  const tasks = readTasks();
  const newTasks = tasks.filter((t) => t.id !== taskId);
  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(newTasks));
};

// Get command and arguments from process.argv
const [,, command, ...args] = process.argv;

// Command to list tasks
if (command === "list") {
  const status = args[0];
  const tasks = listTasks(status);
  if (!tasks.length) {
    console.log("No tasks found");
    return;
  }
  // Display tasks in a table format
  if (status) {
    console.table(tasks, ["id", "description"]);
  } else {
    console.table(tasks, ["id", "description", "status"]);
  }
}

// Command to add a task
if (command === "add") {
  const content = args[0];
  addTask(content);
}

// Command to update a task
if (command === "update") {
  const taskId = args[0];
  const description = args[1];
  updateTask(taskId, { content: description });
}

// Command to remove a task
if (command === "remove") {
  const taskId = args[0];
  removeTask(taskId);
}

// Command to mark a task as in progress
if (command === "mark-in-progress") {
  const taskId = args[0];
  updateTask(taskId, { status: "in-progress" });
}

// Command to mark a task as done
if (command === "mark-done") {
  const taskId = args[0];
  updateTask(taskId, { status: "done" });
}
