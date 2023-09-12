import {
  root,
  createBoard,
  createTaskEdit,
  localStorageKey,
  Data
} from '../main'

const handleTaskStatusChange = (taskId, newStatus, board) => {
  for (const column of board.columns) {
    const taskIndex = column.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      const task = column.tasks.splice(taskIndex, 1)[0]
      task.status = newStatus
      const targetColumn = board.columns.find((col) => col.name === newStatus)
      targetColumn.tasks.push(task)
      root.appendChild(createBoard(board))
      localStorage.setItem(localStorageKey, JSON.stringify(Data))
      break
    }
  }
}

const handleTaskDelete = (taskId, board) => {
  for (const column of board.columns) {
    const taskIndex = column.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      column.tasks.splice(taskIndex, 1)
      document.querySelector('.popup').remove()
      root.appendChild(createBoard(board))
      localStorage.setItem(localStorageKey, JSON.stringify(Data))
    }
  }
}

const handleSubtaskDelete = (subtaskIndex, task, board) => {
  task.subtasks.splice(subtaskIndex, 1)
  localStorage.setItem(localStorageKey, JSON.stringify(Data))
  root.appendChild(createTaskEdit(task, board))
}

const handleTaskSave = (taskId, board) => {
  const editedTask = document.querySelector('.task-edit')
  const titleInput = editedTask.querySelector('.title-container-input')
  const descriptionInput = editedTask.querySelector(
    '.description-container-input'
  )
  const statusDropdownTitle = editedTask.querySelector('.status-dropdown-title')

  const editedTaskData = {
    title: titleInput.value,
    description: descriptionInput.value,
    status: statusDropdownTitle.innerHTML,
    subtasks: []
  }

  const subtaskInputs = editedTask.querySelectorAll('.subtask-input')
  subtaskInputs.forEach((subtaskInput) => {
    editedTaskData.subtasks.push({
      title: subtaskInput.value,
      isCompleted: false // By default, subtasks are not completed
    })
  })

  for (const column of board.columns) {
    const taskIndex = column.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      column.tasks[taskIndex] = editedTaskData
      localStorage.setItem(localStorageKey, JSON.stringify(Data))
      root.appendChild(createBoard(board))
      break
    }
  }

  document.querySelector('.popup').remove()
}

export {
  handleTaskStatusChange,
  handleTaskDelete,
  handleSubtaskDelete,
  handleTaskSave
}
