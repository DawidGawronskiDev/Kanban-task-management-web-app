import { renderColumns } from "../utils/renderUtils";
import Data from "../../data.json";

const BoardListItem = (field) => {
  const BoardListItem = document.createElement("li");
  BoardListItem.dataset.name = field.name;
  BoardListItem.dataset.active = false;
  BoardListItem.classList.add("board-list-item", "heading-m");
  BoardListItem.innerHTML = field.name;

  BoardListItem.addEventListener("click", (e) => {
    const boardListItems = document.querySelectorAll(".board-list-item");

    boardListItems.forEach((item) => (item.dataset.active = false));
    e.target.dataset.active = true;
    document.querySelector(".board-title").innerHTML = e.target.innerHTML;

    renderColumns(Data.boards, e.target.innerHTML);
  });

  return BoardListItem;
};

export default BoardListItem;
