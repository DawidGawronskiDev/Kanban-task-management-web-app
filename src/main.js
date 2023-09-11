import "./style.css";
import Data from "./data.json";
import uniqid from "uniqid";
import {
  handleTaskStatusChange,
  handleTaskDelete,
} from "./utils/utils";

import createDropdown from "./components/Dropdown/Dropdown";
import createSubtasksEdit from "./components/Subtasks/SubtasksEdit";
import createSubtasksDetail from "./components/Subtasks/SubtasksDetail";

const root = document.querySelector("#root");
let currentBoard = Data.boards[0];

const createHeader = (board) => {
  const headerElement = createElement("header", ["header"]);

  const logoContainer = createElement("div", ["header-logo-container"]);
  headerElement.appendChild(logoContainer);

  const boardName = createElement("span", ["heading-xl"]);
  boardName.innerHTML = board.name;
  headerElement.appendChild(boardName);

  const addNewTask = createElement("button", ["button-primary-l"]);
  addNewTask.innerHTML = "+ Add New Task";
  headerElement.appendChild(addNewTask);

  addNewTask.addEventListener("click", () =>
    root.appendChild(createTaskAdd(board))
  );

  return headerElement;
};

const createTaskAdd = (board) => {
  const popup = document.querySelector(".popup");

  if (popup) popup.remove();
  const taskAddElement = createElement("div", ["task-edit", "popup"]);

  const newTask = {
    description: "",
    status: currentBoard.columns[0].name,
    subtasks: [
      {
        isCompleted: false,
        title: "",
      },
      {
        isCompleted: false,
        title: "",
      },
    ],
    title: "",
  };

  const popupTitle = createElement("span", ["heading-l"]);
  popupTitle.innerHTML = "Add New Task";
  taskAddElement.appendChild(popupTitle);

  const titleContainer = createElement("div", ["inputs-container"]);
  taskAddElement.appendChild(titleContainer);

  const titleInputTitle = createElement("span", ["body-m"]);
  titleInputTitle.innerHTML = "Title";
  titleContainer.appendChild(titleInputTitle);

  const titleInput = createElement("input", []);
  titleInput.type = "text";
  titleInput.placeholder = "e.g. Take coffee break";
  titleInput.value = "";
  titleContainer.appendChild(titleInput);

  titleInput.addEventListener("input", (e) => {
    newTask.title = e.target.value;
    console.log(newTask);
  });

  const descriptionContainer = createElement("div", ["inputs-container"]);
  taskAddElement.appendChild(descriptionContainer);

  const descriptionInputTitle = createElement("span", ["body-m"]);
  descriptionInputTitle.innerHTML = "Description";
  descriptionContainer.appendChild(descriptionInputTitle);

  const descriptionInput = createElement("textarea", []);
  descriptionInput.placeholder = "e.g. It’s always good to take a break.";
  descriptionInput.value = "";
  descriptionContainer.appendChild(descriptionInput);

  descriptionInput.addEventListener("input", (e) => {
    newTask.description = e.target.value;
    console.log(newTask);
  });

  const subtasksContainer = createElement("div", ["inputs-container"]);
  taskAddElement.appendChild(subtasksContainer);

  createSubtasksEdit(subtasksContainer, newTask);

  taskAddElement.appendChild(createDropdown(currentBoard, newTask, false));

  const createTaskButton = createElement("button", ["button-primary-l"]);
  createTaskButton.innerHTML = "Create Task";
  taskAddElement.appendChild(createTaskButton);

  createTaskButton.addEventListener("click", (e) => {
    const taskColumn = board.columns.find(
      (column) => column.name === newTask.status
    );

    taskColumn.tasks.push(newTask);

    renderApp(Data, currentBoard);
  });

  return taskAddElement;
};

const createAside = () => {
  const asideElement = createElement("aside", ["aside"]);

  const boardList = createElement("ul", ["board-list"]);
  asideElement.appendChild(boardList);

  return asideElement;
};

const createBoardListElement = (board) => {
  const boardListElement = createElement("li", ["board-list-element"]);
  boardListElement.innerHTML = board.name;
  boardListElement.dataset.active = false;

  if (board.name === currentBoard.name) boardListElement.dataset.active = true;

  return boardListElement;
};

const handleChangeBoard = () => {
  const boardListElements = Array.from(
    document.querySelectorAll(".board-list-element")
  );

  boardListElements.forEach((element) => {
    element.addEventListener("click", (e) => {
      const indexOfElement = boardListElements.indexOf(element);
      changeCurrentBoard(indexOfElement);
      renderApp(Data, currentBoard);
    });
  });
};

const changeCurrentBoard = (index) => {
  currentBoard = Data.boards[index];
};

const renderBoardListElements = (boards) => {
  const boardList = document.querySelector(".board-list");
  boardList.innerHTML = "";
  boards.forEach((board) =>
    boardList.appendChild(createBoardListElement(board))
  );

  const newBoard = createElement("li", ["new-board-buton"]);
  newBoard.innerHTML = "+ Add New Board";
  boardList.appendChild(newBoard);

  newBoard.addEventListener("click", () => {
    root.appendChild(createNewBoardPopup(boards));
  });

  handleChangeBoard();
};

const createNewBoardPopup = (boards) => {
  console.log(boards);
  const popup = document.querySelector(".popup");
  if (popup) popup.remove();

  const newBoard = {
    name: "",
    columns: [{ name: "", tasks: [] }],
  };

  const newBoardPoup = createElement("div", ["new-board-popup", "popup"]);
  const popupTitle = createElement("span", ["popup-title", "heading-l"]);
  popupTitle.innerHTML = "Add New Board";
  newBoardPoup.appendChild(popupTitle);

  const nameInputContainer = createElement("div", ["inputs-container"]);
  newBoardPoup.appendChild(nameInputContainer);

  const nameInputTitle = createElement("span", ["body-m"]);
  nameInputTitle.innerHTML = "Name";
  nameInputContainer.appendChild(nameInputTitle);

  const nameInput = createElement("input", ["name-input"]);
  nameInput.type = "text";
  nameInput.placeholder = "e.g. Web Design";
  nameInputContainer.appendChild(nameInput);

  nameInput.addEventListener("click", (e) => {
    newBoard.name = e.target.value;
  });

  nameInput.addEventListener("input", (e) => {
    newBoard.name = e.target.value;
  });

  const columnsInputContainer = createElement("div", ["inputs-container"]);
  newBoardPoup.appendChild(columnsInputContainer);

  const columnsInputContainerTitle = createElement("span", ["body-m"]);
  columnsInputContainerTitle.innerHTML = "Columns";
  columnsInputContainer.appendChild(columnsInputContainerTitle);

  const createColumnInputContainer = (column) => {
    const columnInputContainer = createElement("div", ["input-container"]);
    columnsInputContainer.appendChild(columnInputContainer);

    const columnNameInput = createElement("input", []);
    columnNameInput.type = "text";
    columnNameInput.value = column.name;
    columnInputContainer.appendChild(columnNameInput);

    columnNameInput.addEventListener("input", (e) => {
      column.name = e.target.value;
    });

    const columnDelete = createElement("button", ["delete-button"]);
    columnInputContainer.appendChild(columnDelete);

    columnDelete.addEventListener("click", (e) => {
      const columnIndex = newBoard.columns.indexOf(column);
      newBoard.columns.splice(columnIndex, 1);
      createColumnInputs();
    });

    return columnInputContainer;
  };

  const createColumnInputs = () => {
    columnsInputContainer.innerHTML = "";

    const columnsInputTitle = createElement("span", ["body-m"]);
    columnsInputTitle.innerHTML = "Columns";
    columnsInputContainer.appendChild(columnsInputTitle);

    newBoard.columns.forEach((column) => {
      columnsInputContainer.appendChild(createColumnInputContainer(column));
    });
  };
  createColumnInputs();

  const addColumn = createElement("button", ["add-column", "button-secondary"]);
  addColumn.innerHTML = "+ Add New Column";
  newBoardPoup.appendChild(addColumn);

  addColumn.addEventListener("click", (e) => {
    newBoard.columns.push({ name: "", tasks: [] });
    createColumnInputs();
  });

  const createNewBoard = createElement("button", [
    "create-new-board",
    "button-primary-s",
  ]);
  createNewBoard.innerHTML = "Create New Board";
  newBoardPoup.appendChild(createNewBoard);

  createNewBoard.addEventListener("click", (e) => {
    boards.push(newBoard);
    renderApp(Data, currentBoard);
  });

  return newBoardPoup;
};

const createBoard = (board) => {
  if (document.querySelector(".board-element"))
    document.querySelector(".board-element").remove();

  const boardElement = createElement("div", ["board-element"]);

  const boardsContainer = createElement("div", ["boards-container"]);
  boardElement.appendChild(boardsContainer);

  board.columns.forEach((column) => {
    const columnElement = createElement("div", ["column-element"]);

    const columnName = createElement("span", ["column-name", "heading-s"]);
    columnName.innerHTML = column.name;
    columnElement.appendChild(columnName);

    column.tasks.forEach((task) => {
      task.id = uniqid();
      const taskElement = createElement("div", ["task-element"]);

      const taskTitle = createElement("span", ["task-title", "heading-m"]);
      taskTitle.innerHTML = task.title;
      taskElement.appendChild(taskTitle);

      columnElement.appendChild(taskElement);

      taskElement.addEventListener("click", (e) =>
        root.appendChild(createTaskDetail(task, board))
      );
    });

    boardsContainer.appendChild(columnElement);
  });

  return boardElement;
};

const createTaskDetail = (task, board) => {
  const popup = document.querySelector(".popup");

  if (popup) popup.remove();
  const taskDetailElement = createElement("div", ["task-detail", "popup"]);

  const taskTitleContainer = createElement("div", ["input-container"]);
  taskDetailElement.appendChild(taskTitleContainer);

  const taskTitle = createElement("span", ["heading-l"]);
  taskTitle.innerHTML = task.title;
  taskTitleContainer.appendChild(taskTitle);

  const taskOptionsContainer = createElement("div", ["task-options-container"]);
  taskTitleContainer.appendChild(taskOptionsContainer);

  const taskOptions = createElement("button", ["task-options"]);
  taskOptionsContainer.appendChild(taskOptions);

  taskOptions.addEventListener("click", (e) => {
    const taskOptionsList = document.querySelector(".task-options-list");

    taskOptionsList.dataset.visible === "false"
      ? (taskOptionsList.dataset.visible = "true")
      : (taskOptionsList.dataset.visible = "false");
  });

  const taskOptionsList = createElement("ul", ["task-options-list"]);
  taskOptionsList.dataset.visible = false;
  taskOptionsContainer.appendChild(taskOptionsList);

  const editTaskItem = createElement("li", ["edit-task-item", "body-l"]);
  editTaskItem.innerHTML = "Edit Task";
  taskOptionsList.appendChild(editTaskItem);

  editTaskItem.addEventListener("click", (e) =>
    root.appendChild(createTaskEdit(task, board))
  );

  const deleteTaskItem = createElement("li", ["delete-task-item", "body-l"]);
  deleteTaskItem.innerHTML = "Delete Task";
  taskOptionsList.appendChild(deleteTaskItem);

  deleteTaskItem.addEventListener("click", (e) => {
    handleTaskDelete(task.id, board);
  });

  const taskDescription = createElement("span", ["body-l"]);
  taskDescription.innerHTML = task.description;
  taskDetailElement.appendChild(taskDescription);

  const subtaskContainer = createElement("div", ["inputs-container"]);
  taskDetailElement.appendChild(subtaskContainer);

  createSubtasksDetail(subtaskContainer, task)

  taskDetailElement.appendChild(createDropdown(board, task, true))

  return taskDetailElement;
};

const createTaskEdit = (task, board) => {
  const popup = document.querySelector(".popup");

  if (popup) popup.remove();
  const taskEditElement = createElement("div", ["task-edit", "popup"]);

  const newTask = task;

  const popupTitle = createElement("span", ["heading-l"]);
  popupTitle.innerHTML = "Edit Task";
  taskEditElement.appendChild(popupTitle);

  const titleContainer = createElement("div", ["inputs-container"]);
  taskEditElement.appendChild(titleContainer);

  const titleContainerHeading = createElement("span", ["body-m"]);
  titleContainerHeading.innerHTML = "Title";
  titleContainer.appendChild(titleContainerHeading);

  const titleContainerInput = createElement("input", ["title-container-input"]);
  titleContainerInput.type = "text";
  titleContainerInput.value = newTask.title;
  titleContainer.appendChild(titleContainerInput);

  titleContainerInput.addEventListener("input", (e) => {
    newTask.title = e.target.value;
  })

  const descriptionContainer = createElement("div", ["inputs-container"]);
  taskEditElement.appendChild(descriptionContainer);

  const descriptionContainerHeading = createElement("span", ["body-m"]);
  descriptionContainerHeading.innerHTML = "Description";
  descriptionContainer.appendChild(descriptionContainerHeading);

  const descriptionContainerInput = createElement("textarea", [
    "description-container-input",
    "body-l",
  ]);
  descriptionContainerInput.placeholder = `e.g. It’s always good to take a break.`;
  descriptionContainerInput.value = newTask.description;
  descriptionContainer.appendChild(descriptionContainerInput);

  descriptionContainerInput.addEventListener("input", (e) => {
    newTask.description = e.target.value;
  })

  const subtasksContainer = createElement("span", ["inputs-container"]);
  taskEditElement.appendChild(subtasksContainer);

  createSubtasksEdit(subtasksContainer, newTask);

  taskEditElement.appendChild(createDropdown(board, newTask, false));

  const saveTaskButton = createElement("button", ["button-primary-l"]);
  saveTaskButton.innerHTML = "Save Changes";
  taskEditElement.appendChild(saveTaskButton);

  saveTaskButton.addEventListener("click", (e) => {
    task = newTask;
    handleTaskStatusChange(task.id, newTask.status, currentBoard);
    renderApp(Data, currentBoard);
  });

  return taskEditElement;
};

const createElement = (tagName, classNames) => {
  const element = document.createElement(tagName);
  classNames.forEach((className) => element.classList.add(className));
  return element;
};

const renderApp = (data, currentBoard) => {
  root.innerHTML = "";
  root.appendChild(createHeader(currentBoard));
  root.appendChild(createAside());
  root.appendChild(createBoard(currentBoard));

  renderBoardListElements(data.boards);
};

renderApp(Data, currentBoard);

window.addEventListener("keydown", (e) => {
  if (document.querySelector(".popup") && e.code === "Escape")
    document.querySelector(".popup").remove();
});

export { createBoard, createTaskEdit, createElement };

// Create createDropdown Function !!!
// Update Header !!!
// Add Media Queries !!!
// Add dark mode !!!
// Update Checkboxes !!!

// description in task is breaking !!!!