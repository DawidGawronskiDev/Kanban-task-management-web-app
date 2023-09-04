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

      taskElement.addEventListener("click", () => console.log(task));
    });

    boardElement.appendChild(columnElement);
  });

  return boardElement;
};

const renderBoardList = (board) => {
  const boardElement = document.querySelector(".board-element");
  boardElement.innerHTML = createBoard(board).innerHTML;
};

root.appendChild(createBoardList(Data.boards));
root.appendChild(createBoard(Data.boards[0]));
