import "./style.css";
import Data from "./data.json";
import uniqid from "uniqid";
import { doc } from "prettier";

const root = document.querySelector("#root");

const createBoardList = (boards) => {
  const boardList = document.createElement("ul");
  boardList.classList.add("board-list");

  boards.forEach((board) => {
    const listElement = document.createElement("li");
    listElement.classList.add("board-list-element");

    const elementName = document.createElement("span");
    elementName.classList.add("element-name", "heading-m");
    elementName.innerHTML = board.name;
    listElement.appendChild(elementName);

    boardList.appendChild(listElement);

    listElement.addEventListener("click", () => {
      const boardElement = document.querySelector(".board-element");
      boardElement.remove();
      root.appendChild(createBoard(board));
    });
  });

  return boardList;
};

const createBoard = (board) => {
  if (document.querySelector(".board-element"))
    document.querySelector(".board-element").remove();

  const boardElement = document.createElement("div");
  boardElement.classList.add("board-element");

  board.columns.forEach((column) => {
    const columnElement = document.createElement("div");
    columnElement.classList.add("column-element");

    const columnName = document.createElement("span");
    columnName.classList.add("column-name", "heading-s");
    columnName.innerHTML = column.name;
    columnElement.appendChild(columnName);

    column.tasks.forEach((task) => {
      task.id = uniqid();
      const taskElement = document.createElement("div");
      taskElement.classList.add("task-element");

      const taskTitle = document.createElement("span");
      taskTitle.classList.add("task-title", "heading-m");
      taskElement.innerHTML = task.title;
      taskElement.innerHTML = `<span>${task.title}</span>`;
      taskElement.appendChild(taskTitle);

      columnElement.appendChild(taskElement);

      taskElement.addEventListener("click", (e) =>
        root.appendChild(createTaskDetail(task, board))
      );
    });

    boardElement.appendChild(columnElement);
  });

  return boardElement;
};

const createTaskDetail = (task, board) => {
  const popup = document.querySelector(".popup");

  if (popup) popup.remove();
  const taskDetailElement = document.createElement("div");
  taskDetailElement.classList.add("task-detail", "popup");

  const taskTitleContainer = document.createElement("div");
  taskTitleContainer.classList.add("task-title-container");
  taskDetailElement.appendChild(taskTitleContainer);

  const taskTitle = document.createElement("span");
  taskTitle.classList.add("heading-l");
  taskTitle.innerHTML = task.title;
  taskTitleContainer.appendChild(taskTitle);

  const taskOptionsContainer = document.createElement("div");
  taskOptionsContainer.classList.add("task-options-container");
  taskTitleContainer.appendChild(taskOptionsContainer);

  const taskOptions = document.createElement("button");
  taskOptions.classList.add("task-options");
  taskOptionsContainer.appendChild(taskOptions);

  const taskOptionsList = document.createElement("ul");
  taskOptionsList.classList.add("task-options-list");
  taskOptionsList.dataset.visible = false;
  taskOptionsContainer.appendChild(taskOptionsList);

  const editTaskItem = document.createElement("li");
  editTaskItem.classList.add("edit-task-item");
  editTaskItem.innerHTML = "Edit Task";
  taskOptionsList.appendChild(editTaskItem);

  editTaskItem.addEventListener("click", (e) =>
    root.appendChild(createTaskEdit(task, board))
  );

  const deleteTaskItem = document.createElement("li");
  deleteTaskItem.classList.add("delete-task-item");
  deleteTaskItem.innerHTML = "Delete Task";
  taskOptionsList.appendChild(deleteTaskItem);

  const taskDescription = document.createElement("span");
  taskDescription.classList.add("body-l");
  taskDescription.innerHTML = task.description;
  taskDetailElement.appendChild(taskDescription);

  const subtaskContainer = document.createElement("div");
  subtaskContainer.classList.add("subtask-container");
  taskDetailElement.appendChild(subtaskContainer);

  const subtasksTitle = document.createElement("span");
  subtasksTitle.classList.add("subtask-title", "body-m");
  subtasksTitle.innerHTML = "Subtasks";
  subtaskContainer.appendChild(subtasksTitle);

  task.subtasks.forEach((subtask) => {
    const subtaskContainerItem = document.createElement("div");
    subtaskContainerItem.classList.add("subtask-container-item");
    subtaskContainerItem.dataset.isCompleted = subtask.isCompleted;
    subtaskContainer.appendChild(subtaskContainerItem);

    const subtaskCheckbox = document.createElement("input");
    subtaskCheckbox.type = "checkbox";
    if (subtask.isCompleted) subtaskCheckbox.checked = true;
    subtaskContainerItem.appendChild(subtaskCheckbox);

    subtaskCheckbox.addEventListener("click", (e) => {
      e.target.checked === true
        ? (subtask.isCompleted = true)
        : (subtask.isCompleted = false);

      subtaskContainerItem.dataset.isCompleted = e.target.checked;

      console.log(subtask);
    });

    const taskLabel = document.createElement("label");
    taskLabel.classList.add("task-label");
    taskLabel.innerHTML = subtask.title;
    subtaskContainerItem.appendChild(taskLabel);
  });

  const statusContainer = document.createElement("div");
  statusContainer.classList.add("status-container");
  taskDetailElement.appendChild(statusContainer);

  const statusTitle = document.createElement("span");
  statusTitle.classList.add("body-m");
  statusTitle.innerHTML = "CurrentStatus";
  statusContainer.appendChild(statusTitle);

  const statusDropdown = document.createElement("div");
  statusDropdown.classList.add("dropdown");
  statusContainer.appendChild(statusDropdown);

  const statusDropdownTitle = document.createElement("span");
  statusDropdownTitle.classList.add("status-dropdown-title");
  statusDropdownTitle.innerHTML = task.status;
  statusDropdown.appendChild(statusDropdownTitle);

  const statusDropdownOptions = document.createElement("ul");
  statusDropdownOptions.classList.add("status-dropdown-options");
  statusDropdownOptions.dataset.visible = false;
  statusDropdown.appendChild(statusDropdownOptions);

  board.columns.forEach((column) => {
    const statusDropdownOption = document.createElement("li");
    statusDropdownOption.classList.add("status-dropdown-option");
    statusDropdownOption.innerHTML = column.name;
    statusDropdownOptions.appendChild(statusDropdownOption);

    statusDropdownOption.addEventListener("click", (e) => {
      const newStatus = e.target.innerHTML;
      if (newStatus !== task.status) {
        statusDropdownTitle.innerHTML = newStatus;
        handleTaskStatusChange(task.id, newStatus, board);
      }
    });
  });

  return taskDetailElement;
};

const createTaskEdit = (task, board) => {
  const popup = document.querySelector(".popup");

  if (popup) popup.remove();
  const taskEditElement = document.createElement("div");
  taskEditElement.classList.add("task-edit", "popup");

  const popupTitle = document.createElement("span");
  popupTitle.classList.add("heading-l");
  popupTitle.innerHTML = "Edit Task";
  taskEditElement.appendChild(popupTitle);

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");
  taskEditElement.appendChild(titleContainer);

  const titleContainerHeading = document.createElement("span");
  titleContainerHeading.classList.add("body-m");
  titleContainerHeading.innerHTML = "Title";
  titleContainer.appendChild(titleContainerHeading);

  const titleContainerInput = document.createElement("input");
  titleContainerInput.classList.add("title-container-input");
  titleContainer.type = "text";
  titleContainerInput.value = task.title;
  titleContainer.appendChild(titleContainerInput);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("description-container");
  taskEditElement.appendChild(descriptionContainer);

  const descriptionContainerHeading = document.createElement("span");
  descriptionContainerHeading.classList.add("body-m");
  descriptionContainerHeading.innerHTML = "Description";
  descriptionContainer.appendChild(descriptionContainerHeading);

  const descriptionContainerInput = document.createElement("textarea");
  descriptionContainerInput.classList.add("description-container-input");
  descriptionContainerInput.placeholder = `e.g. It’s always good to take a break. This 15 minute break will 
  recharge the batteries a little.`;
  descriptionContainer.appendChild(descriptionContainerInput);

  const subtasksContainer = document.createElement("span");
  subtasksContainer.classList.add("subtask-container");
  taskEditElement.appendChild(subtasksContainer);

  task.subtasks.forEach((subtask) => {
    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtask-container");
    subtasksContainer.appendChild(subtaskContainer);

    const subtaskInput = document.createElement("input");
    subtaskInput.classList.add("subtask-input");
    subtaskInput.type = "text";
    subtaskInput.value = subtask.title;
    subtaskContainer.appendChild(subtaskInput);

    const subtaskDelete = document.createElement("button");
    subtaskDelete.classList.add("subtask-delete");
    subtaskContainer.appendChild(subtaskDelete);

    subtaskDelete.addEventListener("click", (e) => {
      const subtaskContainerItem = e.target.parentElement;
      const subtaskIndex = Array.from(
        subtaskContainerItem.parentElement.children
      ).indexOf(subtaskContainerItem);
      handleSubtaskDelete(subtaskIndex, task, board);
    });
  });

  const subtasksAdd = document.createElement("button");
  subtasksAdd.classList.add("subtasks-add", "button-secondary");
  subtasksAdd.innerHTML = "+ Add New Subtask";
  subtasksContainer.appendChild(subtasksAdd);

  const statusContainer = document.createElement("div");
  statusContainer.classList.add("status-container");
  taskEditElement.appendChild(statusContainer);

  const statusTitle = document.createElement("span");
  statusTitle.classList.add("body-m");
  statusTitle.innerHTML = "CurrentStatus";
  statusContainer.appendChild(statusTitle);

  const statusDropdown = document.createElement("div");
  statusDropdown.classList.add("dropdown");
  statusContainer.appendChild(statusDropdown);

  const statusDropdownTitle = document.createElement("span");
  statusDropdownTitle.classList.add("status-dropdown-title");
  statusDropdownTitle.innerHTML = task.status;
  statusDropdown.appendChild(statusDropdownTitle);

  const statusDropdownOptions = document.createElement("ul");
  statusDropdownOptions.classList.add("status-dropdown-options");
  statusDropdownOptions.dataset.visible = false;
  statusDropdown.appendChild(statusDropdownOptions);

  board.columns.forEach((column) => {
    const statusDropdownOption = document.createElement("li");
    statusDropdownOption.classList.add("status-dropdown-option");
    statusDropdownOption.innerHTML = column.name;
    statusDropdownOptions.appendChild(statusDropdownOption);

    statusDropdownOption.addEventListener("click", (e) => {
      const newStatus = e.target.innerHTML;
      if (newStatus !== task.status) {
        statusDropdownTitle.innerHTML = newStatus;
        handleTaskStatusChange(task.id, newStatus, board);
      }
    });
  });

  const taskSave = document.createElement("button");
  taskSave.classList.add("task-save", "button-primary-l");
  taskSave.innerHTML = "Save Changes";
  taskEditElement.appendChild(taskSave);

  console.log(task);

  return taskEditElement;
};

const handleTaskStatusChange = (taskId, newStatus, board) => {
  for (const column of board.columns) {
    const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      const task = column.tasks.splice(taskIndex, 1)[0];
      task.status = newStatus;
      const targetColumn = board.columns.find((col) => col.name === newStatus);
      targetColumn.tasks.push(task);
      root.appendChild(createBoard(board));
      break;
    }
  }
};

const handleSubtaskDelete = (subtaskIndex, task, board) => {
  task.subtasks.splice(subtaskIndex, 1);
  root.appendChild(createTaskEdit(task, board));
};

window.addEventListener("keydown", (e) => {
  if (document.querySelector(".popup") && e.code === "KeyX")
    document.querySelector(".popup").remove();
});

root.appendChild(createBoardList(Data.boards));
root.appendChild(createBoard(Data.boards[0]));
