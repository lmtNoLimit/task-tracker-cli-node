const fs = require("fs");
const path = require("path");
const yargs = require("yargs");

yargs.scriptName("task-tracker").usage("$0 <cmd> [args]");

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

// Command to list tasks
yargs
  .command("list", "List all tasks", {}, (argv) => {
    const tasks = listTasks(argv.status);
    // Display tasks in a table format
    if (argv.status) {
      console.table(tasks, ["id", "content"]);
    } else {
      console.table(tasks, ["id", "description", "status"]);
    }
  })
  .option("status", {
    alias: "s",
    description: "Filter tasks by status",
    type: "string",
  });

// Command to add a task
yargs.command("add <content>", "Add a task", {}, (argv) => {
  addTask(argv.content);
});

// Command to update a task
yargs.command("update <taskId> <description>", "Update a task", {}, (argv) => {
  updateTask(argv.taskId, { content: argv.description });
});

// Command to remove a task
yargs.command("remove <taskId>", "Remove a task", {}, (argv) => {
  removeTask(argv.taskId);
});

// Command to mark a task as in progress
yargs.command("mark-in-progress <taskId>", "Mark a task as in progress", {}, (argv) => {
  updateTask(argv.taskId, { status: "in-progress" });
});

// Command to mark a task as done
yargs.command("mark-done <taskId>", "Mark a task as done", {}, (argv) => {
  updateTask(argv.taskId, { status: "done" });
});

yargs.help().argv;
