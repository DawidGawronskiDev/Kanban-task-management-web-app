const setup = () => {
  const boardListItem = document.querySelector(".board-list-item");
  boardListItem.dataset.active = true;

  const boardTitle = document.querySelector(".board-title");
  boardTitle.innerHTML = boardListItem.innerHTML;
};

export default setup;
