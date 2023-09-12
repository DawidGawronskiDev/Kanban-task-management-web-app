import {
  localStorageKey,
  Data,
  currentBoard,
  createElement,
  renderApp
} from '../../main'
import createSubtasksEdit from '../Subtasks/SubtasksEdit'
import createDropdown from '../Dropdown/Dropdown'
import { handleTaskStatusChange } from '../../utils/utils'

const createPopupTaskEdit = (task, board) => {
  const popup = document.querySelector('.popup')

  if (popup) popup.remove()
  const taskEditElement = createElement('div', ['task-edit', 'popup'])

  const newTask = task

  const popupTitle = createElement('span', ['heading-l'])
  popupTitle.innerHTML = 'Edit Task'
  taskEditElement.appendChild(popupTitle)

  const titleContainer = createElement('div', ['inputs-container'])
  taskEditElement.appendChild(titleContainer)

  const titleContainerHeading = createElement('span', ['body-m'])
  titleContainerHeading.innerHTML = 'Title'
  titleContainer.appendChild(titleContainerHeading)

  const titleContainerInput = createElement('input', ['title-container-input'])
  titleContainerInput.type = 'text'
  titleContainerInput.value = newTask.title
  titleContainer.appendChild(titleContainerInput)

  titleContainerInput.addEventListener('input', (e) => {
    newTask.title = e.target.value
  })

  const descriptionContainer = createElement('div', ['inputs-container'])
  taskEditElement.appendChild(descriptionContainer)

  const descriptionContainerHeading = createElement('span', ['body-m'])
  descriptionContainerHeading.innerHTML = 'Description'
  descriptionContainer.appendChild(descriptionContainerHeading)

  const descriptionContainerInput = createElement('textarea', [
    'description-container-input',
    'body-l'
  ])
  descriptionContainerInput.placeholder =
    'e.g. It’s always good to take a break.'
  descriptionContainerInput.value = newTask.description
  descriptionContainer.appendChild(descriptionContainerInput)

  descriptionContainerInput.addEventListener('input', (e) => {
    newTask.description = e.target.value
  })

  const subtasksContainer = createElement('span', ['inputs-container'])
  taskEditElement.appendChild(subtasksContainer)

  createSubtasksEdit(subtasksContainer, newTask)

  taskEditElement.appendChild(createDropdown(board, newTask, false))

  const saveTaskButton = createElement('button', ['button-primary-l'])
  saveTaskButton.innerHTML = 'Save Changes'
  taskEditElement.appendChild(saveTaskButton)

  saveTaskButton.addEventListener('click', (e) => {
    task = newTask
    handleTaskStatusChange(task.id, newTask.status, currentBoard)
    localStorage.setItem(localStorageKey, JSON.stringify(Data))
    renderApp(Data, currentBoard)
  })

  return taskEditElement
}

export default createPopupTaskEdit