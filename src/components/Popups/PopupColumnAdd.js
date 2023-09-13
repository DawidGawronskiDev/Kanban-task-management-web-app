import {
  localStorageKey,
  Data,
  currentBoard,
  createElement,
  renderApp
} from '../../main'

import { removePopup } from '../../utils/utils'

const createPopupColumnAdd = (board) => {
  removePopup()

  const popup = createElement('div', ['popup'])

  const newColumn = {
    name: '',
    tasks: []
  }

  const popupTitle = createElement('span', ['heading-l'])
  popupTitle.innerHTML = 'Add New Column'
  popup.appendChild(popupTitle)

  const columnInputContainer = createElement('div', ['inputs-container'])
  popup.appendChild(columnInputContainer)

  const columnNameTitle = createElement('span', ['body-m'])
  columnNameTitle.innerHTML = 'Name'
  columnInputContainer.appendChild(columnNameTitle)

  const columnNameInput = createElement('input', ['input-container'])
  columnNameInput.type = 'text'
  columnNameInput.value = newColumn.name
  columnInputContainer.appendChild(columnNameInput)

  columnNameInput.addEventListener('input', (e) => {
    newColumn.name = e.target.value
  })

  const createColumnButton = createElement('button', ['button-primary-l'])
  createColumnButton.innerHTML = 'Create Column'
  popup.appendChild(createColumnButton)

  createColumnButton.addEventListener('click', (e) => {
    board.columns.push(newColumn)
    localStorage.setItem(localStorageKey, JSON.stringify(Data))
    renderApp(Data, currentBoard)
  })

  return popup
}

export default createPopupColumnAdd
