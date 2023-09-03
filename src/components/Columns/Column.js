const Column = (board) => {
  const columnElement = document.createElement("div");
  columnElement.classList.add("column");

  const columnTitle = document.createElement("span");
  columnTitle.classList.add("column-title", "heading-s");
  columnElement.innerHTML = board.name;
  columnElement.appendChild(columnTitle);

  const columnCardsContainer = document.createElement("div");
  columnCardsContainer.classList.add("column-cards-container");
  columnElement.appendChild(columnCardsContainer);

  return columnElement;
};

export default Column;
