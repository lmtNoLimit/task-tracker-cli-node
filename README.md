# Task Tracker CLI Node

This is a command-line interface (CLI) application for managing tasks. It allows you to create, update, and remove tasks, as well as mark them as in progress or done.

Ref: https://roadmap.sh/projects/task-tracker

## Installation

1. Clone the repository:

  ```shell
  git clone https://github.com/lmtnolimit/task-tracker-cli-node.git
  ```

2. Navigate to the project directory:

  ```shell
  cd task-tracker-cli-node
  ```

3. Install the dependencies:

  ```shell
  npm install
  ```

## Usage

To use the Task Tracker CLI Node, follow these steps:

1. Open a terminal and navigate to the project directory.

2. Run the CLI commands with the following format:

  ```shell
  node index.js <command> [arguments]
  ```

  Available commands:

  - `list [status]`: List all tasks. Optionally, filter tasks by status (e.g., `todo`, `in-progress`, `done`).
  - `add <content>`: Add a new task with the specified content.
  - `update <taskId> <description>`: Update the description of a task with the specified ID.
  - `remove <taskId>`: Remove a task with the specified ID.
  - `mark-in-progress <taskId>`: Mark a task as in progress.
  - `mark-done <taskId>`: Mark a task as done.

## Examples

- List all tasks:

  ```shell
  node index.js list
  ```

- List tasks with a specific status (e.g., `in-progress`):

  ```shell
  node index.js list in-progress
  ```

- Add a new task:

  ```shell
  node index.js add "Finish documentation"
  ```

- Update the description of a task:

  ```shell
  node index.js update 123 "Fix bug in login feature"
  ```

- Remove a task:

  ```shell
  node index.js remove 123
  ```

- Mark a task as in progress:

  ```shell
  node index.js mark-in-progress 123
  ```

- Mark a task as done:

  ```shell
  node index.js mark-done 123
  ```
