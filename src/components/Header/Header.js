const Header = () => {
  const headerElement = document.createElement("header");

  const boardTitle = document.createElement("span");
  boardTitle.classList.add("board-title", "heading-xl");
  headerElement.appendChild(boardTitle);

  return headerElement;
};

export default Header;
