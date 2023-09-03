import Aside from "../components/Aside/Aside";
import BoardListItem from "../components/Aside/BoardListItem";
import NewBoardButton from "../components/Aside/NewBoardButton";

import Header from "../components/Header/Header";

import Columns from "../components/Columns/Columns";
import Column from "../components/Columns/Column";

// Data
import Data from "../data.json";

const render = (root) => {
  root.appendChild(Aside());
  root.appendChild(Header());
  root.appendChild(Columns());

  renderBoardListItems(Data.boards);
  renderColumns(
    Data.boards,
    document.querySelector(".board-list-item").innerHTML
  );
};

const renderBoardListItems = (fields) => {
  const boardList = document.querySelector(".board-list");
  boardList.innerHTML = "";

  fields.forEach((field) => boardList.appendChild(BoardListItem(field)));
  boardList.appendChild(NewBoardButton());
};

const renderColumns = (boards, boardName) => {
  const columnsElement = document.querySelector(".columns");
  columnsElement.innerHTML = "";

  const board = boards.filter((board) => board.name === boardName)[0];

  board.columns.forEach((column) => columnsElement.appendChild(Column(column)));
};

export { render, renderColumns };
