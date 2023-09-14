import { root, createElement } from '../../main'
import createPopupTaskAdd from '../Popups/PopupTaskAdd'

const createHeader = (board) => {
  const headerElement = createElement('header', ['header'])

  const logoContainer = createElement('div', ['header-logo-container'])
  headerElement.appendChild(logoContainer)

  const headerContainer = createElement('div', ['header-container'])
  headerElement.appendChild(headerContainer)

  const boardName = createElement('span', ['heading-xl'])
  boardName.innerHTML = board.name
  headerContainer.appendChild(boardName)

  const addNewTask = createElement('button', ['button-primary-l', 'heading-m'])
  addNewTask.innerHTML = '+ Add New Task'
  headerContainer.appendChild(addNewTask)

  addNewTask.addEventListener('click', () =>
    root.appendChild(createPopupTaskAdd(board))
  )

  const headerOptionsContainer = createElement('div', ['options-container'])
  headerElement.appendChild(headerOptionsContainer)

  const headerOptions = createElement('button', ['toggle-options'])
  headerOptionsContainer.appendChild(headerOptions)

  const headerOptionsList = createElement('ul', ['header-options-list'])
  headerOptionsList.dataset.visible = false
  headerOptionsContainer.appendChild(headerOptionsList)

  const editBoard = createElement('li', ['edit-board', 'body-l'])
  editBoard.innerHTML = 'Edit Board'
  headerOptionsList.appendChild(editBoard)

  const deleteBoard = createElement('li', ['delete-board', 'body-l'])
  deleteBoard.innerHTML = 'Delete Board'
  headerOptionsList.appendChild(deleteBoard)

  headerOptions.addEventListener('click', () => console.log('Hi!'))

  return headerElement
}

export default createHeader
