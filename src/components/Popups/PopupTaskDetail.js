import { root, createElement } from '../../main'
import { handleTaskDelete, removePopup } from '../../utils/utils'

import createPopupTaskEdit from './PopupTaskEdit'
import createSubtasksDetail from '../Subtasks/SubtasksDetail'
import createDropdown from '../Dropdown/Dropdown'

const createPopupTaskDetail = (task, board) => {
  removePopup()

  const popup = createElement('div', ['task-detail', 'popup'])

  const taskTitleContainer = createElement('div', ['input-container'])
  popup.appendChild(taskTitleContainer)

  const taskTitle = createElement('span', ['heading-l'])
  taskTitle.innerHTML = task.title
  taskTitleContainer.appendChild(taskTitle)

  const taskOptionsContainer = createElement('div', ['task-options-container'])
  taskTitleContainer.appendChild(taskOptionsContainer)

  const taskOptions = createElement('button', ['task-options'])
  taskOptionsContainer.appendChild(taskOptions)

  taskOptions.addEventListener('click', (e) => {
    const taskOptionsList = document.querySelector('.task-options-list')

    taskOptionsList.dataset.visible === 'false'
      ? (taskOptionsList.dataset.visible = 'true')
      : (taskOptionsList.dataset.visible = 'false')
  })

  const taskOptionsList = createElement('ul', ['task-options-list'])
  taskOptionsList.dataset.visible = false
  taskOptionsContainer.appendChild(taskOptionsList)

  const editTaskItem = createElement('li', ['edit-task-item', 'body-l'])
  editTaskItem.innerHTML = 'Edit Task'
  taskOptionsList.appendChild(editTaskItem)

  editTaskItem.addEventListener('click', (e) =>
    root.appendChild(createPopupTaskEdit(task, board))
  )

  const deleteTaskItem = createElement('li', ['delete-task-item', 'body-l'])
  deleteTaskItem.innerHTML = 'Delete Task'
  taskOptionsList.appendChild(deleteTaskItem)

  deleteTaskItem.addEventListener('click', (e) => {
    handleTaskDelete(task.id, board)
  })

  const taskDescription = createElement('span', ['body-l'])
  taskDescription.innerHTML = task.description
  popup.appendChild(taskDescription)

  const subtaskContainer = createElement('div', ['inputs-container'])
  popup.appendChild(subtaskContainer)

  createSubtasksDetail(subtaskContainer, task)

  popup.appendChild(createDropdown(board, task, true))

  return popup
}

export default createPopupTaskDetail
