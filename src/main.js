import "./style.css";
import Data from "./data.json";
import uniqid from "uniqid";

import {
  handleTaskStatusChange,
  handleTaskDelete,
  handleSubtaskDelete,
  handleTaskSave,
} from "./utils/utils";

const root = document.querySelector("#root");

const createBoardList = (boards) => {
  const boardList = createElement("ul", ["board-list"]);

  boards.forEach((board) => {
    const listElement = createElement("li", ["board-list-element"]);

    const elementName = createElement("span", ["element-name", "heading-m"]);
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

  const boardElement = createElement("div", ["board-element"]);

  board.columns.forEach((column) => {
    const columnElement = createElement("div", ["column-element"]);

    const columnName = createElement("span", ["column-name", "heading-s"]);
    columnName.innerHTML = column.name;
    columnElement.appendChild(columnName);

    column.tasks.forEach((task) => {
      task.id = uniqid();
      const taskElement = createElement("div", ["task-element"]);

      const taskTitle = createElement("span", ["task-title", "heading-m"]);
      taskElement.innerHTML = task.title;
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
  const taskDetailElement = createElement("div", ["task-detail", "popup"]);

  const taskTitleContainer = createElement("div", ["task-title-container"]);
  taskDetailElement.appendChild(taskTitleContainer);

  const taskTitle = createElement("span", ["heading-l"]);
  taskTitle.innerHTML = task.title;
  taskTitleContainer.appendChild(taskTitle);

  const taskOptionsContainer = createElement("div", ["task-options-container"]);
  taskTitleContainer.appendChild(taskOptionsContainer);

  const taskOptions = createElement("button", ["task-options"]);
  taskOptionsContainer.appendChild(taskOptions);

  const taskOptionsList = createElement("ul", ["task-options-list"]);
  taskOptionsList.dataset.visible = false;
  taskOptionsContainer.appendChild(taskOptionsList);

  const editTaskItem = createElement("li", ["edit-task-item"]);
  editTaskItem.innerHTML = "Edit Task";
  taskOptionsList.appendChild(editTaskItem);

  editTaskItem.addEventListener("click", (e) =>
    root.appendChild(createTaskEdit(task, board))
  );

  const deleteTaskItem = createElement("li", ["delete-task-item"]);
  deleteTaskItem.innerHTML = "Delete Task";
  taskOptionsList.appendChild(deleteTaskItem);

  deleteTaskItem.addEventListener("click", (e) => {
    handleTaskDelete(task.id, board);
  });

  const taskDescription = createElement("span", ["body-l"]);
  taskDescription.innerHTML = task.description;
  taskDetailElement.appendChild(taskDescription);

  const subtaskContainer = createElement("div", ["subtask-container"]);
  taskDetailElement.appendChild(subtaskContainer);

  const subtasksTitle = createElement("span", ["subtask-title", "body-m"]);
  subtasksTitle.innerHTML = "Subtasks";
  subtaskContainer.appendChild(subtasksTitle);

  task.subtasks.forEach((subtask) => {
    const subtaskContainerItem = createElement("div", [
      "subtask-container-item",
    ]);
    subtaskContainerItem.dataset.isCompleted = subtask.isCompleted;
    subtaskContainer.appendChild(subtaskContainerItem);

    const subtaskCheckbox = createElement("input", ["subtask-checkbox"]);
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
  const taskEditElement = createElement("div", ["task-edit", "popup"]);

  const popupTitle = createElement("span", ["heading-l"]);
  popupTitle.innerHTML = "Edit Task";
  taskEditElement.appendChild(popupTitle);

  const titleContainer = createElement("div", ["title-container"]);
  taskEditElement.appendChild(titleContainer);

  const titleContainerHeading = createElement("span", ["body-m"]);
  titleContainerHeading.innerHTML = "Title";
  titleContainer.appendChild(titleContainerHeading);

  const titleContainerInput = createElement("input", ["title-container-input"]);
  titleContainer.type = "text";
  titleContainerInput.value = task.title;
  titleContainer.appendChild(titleContainerInput);

  const descriptionContainer = createElement("div", ["description-container"]);
  taskEditElement.appendChild(descriptionContainer);

  const descriptionContainerHeading = createElement("span", ["body-m"]);
  descriptionContainerHeading.innerHTML = "Description";
  descriptionContainer.appendChild(descriptionContainerHeading);

  const descriptionContainerInput = createElement("textarea", [
    "description-container-input",
  ]);
  descriptionContainerInput.placeholder = `e.g. It’s always good to take a break. This 15 minute break will 
  recharge the batteries a little.`;
  descriptionContainer.appendChild(descriptionContainerInput);

  const subtasksContainer = createElement("span", ["subtask-container"]);
  taskEditElement.appendChild(subtasksContainer);

  task.subtasks.forEach((subtask) => {
    const subtaskContainer = createElement("div", ["subtask-container"]);
    subtasksContainer.appendChild(subtaskContainer);

    const subtaskInput = createElement("input", ["subtask-input"]);
    subtaskInput.type = "text";
    subtaskInput.value = subtask.title;
    subtaskContainer.appendChild(subtaskInput);

    const subtaskDelete = createElement("button", ["subtask-delete"]);
    subtaskContainer.appendChild(subtaskDelete);

    subtaskDelete.addEventListener("click", (e) => {
      const subtaskContainerItem = e.target.parentElement;
      const subtaskIndex = Array.from(
        subtaskContainerItem.parentElement.children
      ).indexOf(subtaskContainerItem);
      handleSubtaskDelete(subtaskIndex, task, board);
    });
  });

  const subtasksAdd = createElement("button", [
    "subtasks-add",
    "button-secondary",
  ]);
  subtasksAdd.innerHTML = "+ Add New Subtask";
  subtasksContainer.appendChild(subtasksAdd);

  subtasksAdd.addEventListener("click", (e) => {
    console.log(task.subtasks);
    task.subtasks.push({ isCompleted: false, title: "" });
    root.appendChild(createTaskEdit(task, board));
  });

  const statusContainer = createElement("div", ["status-container"]);
  taskEditElement.appendChild(statusContainer);

  const statusTitle = createElement("span", ["body-m"]);
  statusTitle.innerHTML = "CurrentStatus";
  statusContainer.appendChild(statusTitle);

  const statusDropdown = createElement("div", ["dropdown"]);
  statusContainer.appendChild(statusDropdown);

  const statusDropdownTitle = createElement("span", ["status-dropdown-title"]);
  statusDropdownTitle.innerHTML = task.status;
  statusDropdown.appendChild(statusDropdownTitle);

  const statusDropdownOptions = createElement("ul", [
    "status-dropdown-options",
  ]);
  statusDropdownOptions.dataset.visible = false;
  statusDropdown.appendChild(statusDropdownOptions);

  board.columns.forEach((column) => {
    const statusDropdownOption = createElement("li", [
      "status-dropdown-option",
    ]);
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

  const taskSave = createElement("button", ["task-save", "button-primary-l"]);
  taskSave.innerHTML = "Save Changes";
  taskEditElement.appendChild(taskSave);

  taskSave.addEventListener("click", (e) => {
    handleTaskSave(task.id, board);
  });

  console.log(task);

  return taskEditElement;
};

const createElement = (tagName, classNames) => {
  const element = document.createElement(tagName);
  classNames.forEach((className) => element.classList.add(className));
  return element;
};

window.addEventListener("keydown", (e) => {
  console.log(e.code);
  if (document.querySelector(".popup") && e.code === "Escape")
    document.querySelector(".popup").remove();
});

root.appendChild(createBoardList(Data.boards));
root.appendChild(createBoard(Data.boards[0]));

export { createBoard, createTaskEdit };
