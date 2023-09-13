import { root, createElement } from '../../main'
import { handleTaskDelete, removePopup } from '../../utils/utils'

import createPopupTaskEdit from './PopupTaskEdit'
import createSubtasksDetail from '../Subtasks/SubtasksDetail'
import createDropdown from '../Dropdown/Dropdown'

const createPopupTaskDetail = (task, board) => {
  removePopup()

  const taskDetailElement = createElement('div', ['task-detail', 'popup'])

  const taskTitleContainer = createElement('div', ['input-container'])
  taskDetailElement.appendChild(taskTitleContainer)

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
  taskDetailElement.appendChild(taskDescription)

  const subtaskContainer = createElement('div', ['inputs-container'])
  taskDetailElement.appendChild(subtaskContainer)

  createSubtasksDetail(subtaskContainer, task)

  taskDetailElement.appendChild(createDropdown(board, task, true))

  return taskDetailElement
}

export default createPopupTaskDetail
