const Aside = () => {
  const Aside = document.createElement("aside");

  const logoContainer = document.createElement("div");
  logoContainer.classList.add("logo-container");
  Aside.appendChild(logoContainer);

  const boardsList = document.createElement("ul");
  boardsList.classList.add("board-list");
  Aside.appendChild(boardsList);

  return Aside;
};

export default Aside;
