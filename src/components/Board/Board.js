import { root, createElement } from '../../main'
import createPopupColumnAdd from '../Popups/PopupColumnAdd'
import createPopupTaskDetail from '../Popups/PopupTaskDetail'

const createBoard = (board) => {
  if (document.querySelector('.board-element')) {
    document.querySelector('.board-element').remove()
  }

  const boardElement = createElement('div', ['board-element'])

  board.columns.length === 0
    ? (() => {
        const boardEmptyContainer = createElement('div', [
          'board-empty-container'
        ])
        boardElement.appendChild(boardEmptyContainer)

        const boardTitle = createElement('span', ['heading-l'])
        boardTitle.innerHTML =
          'This board is empty. Create a new column to get started.'
        boardEmptyContainer.appendChild(boardTitle)

        const createTaskButton = createElement('button', ['button-primary-l'])
        createTaskButton.innerHTML = '+ Add New Column'
        boardEmptyContainer.appendChild(createTaskButton)

        createTaskButton.addEventListener('click', (e) => {
          root.appendChild(createPopupColumnAdd(board))
        })
      })()
    : (() => {
        const boardsContainer = createElement('div', ['boards-container'])
        boardElement.appendChild(boardsContainer)

        board.columns.forEach((column) => {
          const columnElement = createElement('div', ['column-element'])

          const columnName = createElement('span', ['column-name', 'heading-s'])
          columnName.innerHTML = column.name
          columnElement.appendChild(columnName)

          column.tasks.forEach((task) => {
            const taskElement = createElement('div', ['task-element'])

            const taskTitle = createElement('span', ['task-title', 'heading-m'])
            taskTitle.innerHTML = task.title
            taskElement.appendChild(taskTitle)

            columnElement.appendChild(taskElement)

            taskElement.addEventListener('click', (e) =>
              root.appendChild(createPopupTaskDetail(task, board))
            )
          })

          boardsContainer.appendChild(columnElement)
        })
      })()

  return boardElement
}

export default createBoard
