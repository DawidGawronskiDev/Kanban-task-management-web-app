import {
  localStorageKey,
  Data,
  currentBoard,
  createElement,
  renderApp
} from '../../main'

const createPopupBoardAdd = (boards) => {
  console.log(boards)
  const popup = document.querySelector('.popup')
  if (popup) popup.remove()

  const newBoard = {
    name: '',
    columns: [{ name: '', tasks: [] }]
  }

  const newBoardPoup = createElement('div', ['new-board-popup', 'popup'])
  const popupTitle = createElement('span', ['popup-title', 'heading-l'])
  popupTitle.innerHTML = 'Add New Board'
  newBoardPoup.appendChild(popupTitle)

  const nameInputContainer = createElement('div', ['inputs-container'])
  newBoardPoup.appendChild(nameInputContainer)

  const nameInputTitle = createElement('span', ['body-m'])
  nameInputTitle.innerHTML = 'Name'
  nameInputContainer.appendChild(nameInputTitle)

  const nameInput = createElement('input', ['name-input'])
  nameInput.type = 'text'
  nameInput.placeholder = 'e.g. Web Design'
  nameInputContainer.appendChild(nameInput)

  nameInput.addEventListener('click', (e) => {
    newBoard.name = e.target.value
  })

  nameInput.addEventListener('input', (e) => {
    newBoard.name = e.target.value
  })

  const columnsInputContainer = createElement('div', ['inputs-container'])
  newBoardPoup.appendChild(columnsInputContainer)

  const columnsInputContainerTitle = createElement('span', ['body-m'])
  columnsInputContainerTitle.innerHTML = 'Columns'
  columnsInputContainer.appendChild(columnsInputContainerTitle)

  const createColumnInputContainer = (column) => {
    const columnInputContainer = createElement('div', ['input-container'])
    columnsInputContainer.appendChild(columnInputContainer)

    const columnNameInput = createElement('input', [])
    columnNameInput.type = 'text'
    columnNameInput.value = column.name
    columnInputContainer.appendChild(columnNameInput)

    columnNameInput.addEventListener('input', (e) => {
      column.name = e.target.value
    })

    const columnDelete = createElement('button', ['delete-button'])
    columnInputContainer.appendChild(columnDelete)

    columnDelete.addEventListener('click', (e) => {
      const columnIndex = newBoard.columns.indexOf(column)
      newBoard.columns.splice(columnIndex, 1)
      localStorage.setItem(localStorageKey, JSON.stringify(Data))
      createColumnInputs()
    })

    return columnInputContainer
  }

  const createColumnInputs = () => {
    columnsInputContainer.innerHTML = ''

    const columnsInputTitle = createElement('span', ['body-m'])
    columnsInputTitle.innerHTML = 'Columns'
    columnsInputContainer.appendChild(columnsInputTitle)

    newBoard.columns.forEach((column) => {
      columnsInputContainer.appendChild(createColumnInputContainer(column))
    })
  }
  createColumnInputs()

  const addColumn = createElement('button', ['add-column', 'button-secondary'])
  addColumn.innerHTML = '+ Add New Column'
  newBoardPoup.appendChild(addColumn)

  addColumn.addEventListener('click', (e) => {
    newBoard.columns.push({ name: '', tasks: [] })
    localStorage.setItem(localStorageKey, JSON.stringify(Data))
    createColumnInputs()
  })

  const createNewBoard = createElement('button', [
    'create-new-board',
    'button-primary-s'
  ])
  createNewBoard.innerHTML = 'Create New Board'
  newBoardPoup.appendChild(createNewBoard)

  createNewBoard.addEventListener('click', (e) => {
    boards.push(newBoard)
    localStorage.setItem(localStorageKey, JSON.stringify(Data))
    renderApp(Data, currentBoard)
  })

  return newBoardPoup
}

export default createPopupBoardAdd
