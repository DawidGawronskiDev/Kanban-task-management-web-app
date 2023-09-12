import { localStorageKey, Data, renderApp, createElement } from '../../main'
import { validateForm } from '../../utils/utils'
import createSubtasksEdit from '../Subtasks/SubtasksEdit'
import createDropdown from '../Dropdown/Dropdown'

const createPopupTaskAdd = (board) => {
  if (document.querySelector('.popup')) {
    document.querySelector('.popup').remove()
  }
  const popup = createElement('form', ['task-edit', 'popup'])

  const newTask = {
    description: '',
    status: board.columns[0].name,
    subtasks: [
      {
        isCompleted: false,
        title: ''
      },
      {
        isCompleted: false,
        title: ''
      }
    ],
    title: ''
  }

  const popupTitle = createElement('span', ['heading-l'])
  popupTitle.innerHTML = 'Add New Task'
  popup.appendChild(popupTitle)

  const titleContainer = createElement('div', ['inputs-container'])
  popup.appendChild(titleContainer)

  const titleInputTitle = createElement('span', ['body-m'])
  titleInputTitle.innerHTML = 'Title'
  titleContainer.appendChild(titleInputTitle)

  const titleInput = createElement('input', ['input-container'])
  titleInput.setAttribute('required', 'required')
  titleInput.type = 'text'
  titleInput.placeholder = 'e.g. Take coffee break'
  titleInput.value = newTask.title
  titleContainer.appendChild(titleInput)

  titleInput.addEventListener('input', (e) => {
    newTask.title = e.target.value
    console.log(newTask)
  })

  const descriptionContainer = createElement('div', ['inputs-container'])
  popup.appendChild(descriptionContainer)

  const descriptionInputTitle = createElement('span', ['body-m'])
  descriptionInputTitle.innerHTML = 'Description'
  descriptionContainer.appendChild(descriptionInputTitle)

  const descriptionInput = createElement('textarea', [])
  descriptionInput.setAttribute('required', 'required')
  descriptionInput.placeholder = 'e.g. It’s always good to take a break.'
  descriptionInput.value = newTask.description
  descriptionContainer.appendChild(descriptionInput)

  descriptionInput.addEventListener('input', (e) => {
    newTask.description = e.target.value
    console.log(newTask)
  })

  const subtasksContainer = createElement('div', ['inputs-container'])
  popup.appendChild(subtasksContainer)

  createSubtasksEdit(subtasksContainer, newTask)

  popup.appendChild(createDropdown(board, newTask, false))

  const createTaskButton = createElement('button', ['button-primary-l'])
  createTaskButton.type = 'Submit'
  createTaskButton.innerHTML = 'Create Task'
  popup.appendChild(createTaskButton)

  popup.addEventListener('submit', (e) => {
    e.preventDefault()

    if (validateForm()) {
      const taskColumn = board.columns.find(
        (column) => column.name === newTask.status
      )

      taskColumn.tasks.push(newTask)

      localStorage.setItem(localStorageKey, JSON.stringify(Data))
      renderApp(Data, board)
    } else {
      console.log('Validation failed')
    }
  })

  return popup
}

export default createPopupTaskAdd
