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

  return headerElement
}

export default createHeader
