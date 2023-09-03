const NewBoardButton = () => {
  const newBoardButton = document.createElement("li");
  newBoardButton.classList.add("new-board-button", "heading-m");
  newBoardButton.innerHTML = "+ Create New Board";

  return newBoardButton;
};

export default NewBoardButton;
