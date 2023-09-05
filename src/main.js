import "./style.css";
import Data from "./data.json";
import uniqid from "uniqid";

const root = document.querySelector("#root");

const createBoardList = (boards) => {
  const boardList = document.createElement("ul");
  boardList.classList.add("board-list");

  boards.forEach((board, index) => {
    const listElement = document.createElement("li");
    listElement.classList.add("board-list-element");

    const elementName = document.createElement("span");
    elementName.classList.add("element-name", "heading-m");
    elementName.innerHTML = board.name;
    listElement.appendChild(elementName);

    boardList.appendChild(listElement);

    listElement.addEventListener("click", () => {
      renderBoardList(board);
      console.log(board);
    });
  });

  return boardList;
};

const createBoard = (board) => {
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

      taskElement.addEventListener("click", (e) => root.appendChild(createTaskDetail(task, board)));
    });

    boardElement.appendChild(columnElement);
  });

  return boardElement;
};

const renderBoardList = (board) => {
  const boardElement = document.querySelector(".board-element");
  boardElement.innerHTML = createBoard(board).innerHTML;
};

const createTaskDetail = (task, board) => {
    const popup = document.querySelector(".popup");

    if (popup) popup.remove();
    const taskDetailElement = document.createElement("div");
    taskDetailElement.classList.add("task-detail", "popup");

    const taskTitle = document.createElement("span");
    taskTitle.classList.add("heading-l");
    taskTitle.innerHTML = task.title;
    taskDetailElement.appendChild(taskTitle);

    const taskDescription = document.createElement("span");
    taskDescription.classList.add("body-l");
    taskDescription.innerHTML = task.description;
    taskDetailElement.appendChild(taskDescription);

    const subtasksTitle = document.createElement("span");
    subtasksTitle.classList.add("body-m");
    subtasksTitle.innerHTML = "Subtasks";
    taskDetailElement.appendChild(subtasksTitle);

    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtask-container");
    taskDetailElement.appendChild(subtaskContainer);

    task.subtasks.forEach(subtask => {
        const subtaskContainerItem = document.createElement("div");
        subtaskContainerItem.classList.add("subtask-container-item");
        subtaskContainerItem.dataset.isCompleted = subtask.isCompleted;
        subtaskContainer.appendChild(subtaskContainerItem);

        const subtaskCheckbox = document.createElement("input");
        subtaskCheckbox.type = "checkbox";
        if (subtask.isCompleted) subtaskCheckbox.checked = true;
        subtaskContainerItem.appendChild(subtaskCheckbox)

       subtaskCheckbox.addEventListener("click", (e) => {
        e.target.checked === true
        ? subtask.isCompleted = true
        : subtask.isCompleted = false

        subtaskContainerItem.dataset.isCompleted = e.target.checked;

        console.log(subtask)
       })

       const taskLabel = document.createElement("label");
        taskLabel.classList.add("task-label");
        taskLabel.innerHTML = task.title;
        subtaskContainerItem.appendChild(taskLabel)
    })

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

    statusDropdown.addEventListener("click", (e) => {
        statusDropdownOptions.dataset.visible = true;
    })

    board.columns.forEach(column => {
        const statusDropdownOption = document.createElement("li");
        statusDropdownOption.classList.add("status-dropdown-option");
        statusDropdownOption.innerHTML = column.name;
        statusDropdownOptions.appendChild(statusDropdownOption)

        statusDropdownOption.addEventListener("click", (e) => {
            const newStatus = e.target.innerHTML;
            if (newStatus !== task.status) {
              handleTaskStatusChange(task.id, newStatus, board);
            }
          });
    })

    return taskDetailElement;
}

const handleTaskStatusChange = (taskId, newStatus, board) => {
    for (const column of board.columns) {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const task = column.tasks.splice(taskIndex, 1)[0];
        task.status = newStatus;
        const targetColumn = board.columns.find(col => col.name === newStatus);
        targetColumn.tasks.push(task);
        renderBoardList(board);
        break;
      }
    }
  };

root.appendChild(createBoardList(Data.boards));
root.appendChild(createBoard(Data.boards[0]));
