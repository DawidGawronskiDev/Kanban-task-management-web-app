import './style.css'
import Data from './data.json'

import { handleChangeBoard } from './utils/utils'

import createHeader from './components/Header/Header'
import createAside from './components/Aside/Aside'
import createBoard from './components/Board/Board'

import createPopupBoardAdd from './components/Popups/PopupBoardAdd'

const localStorageKey = 'myData'
let localStorageData = localStorage.getItem(localStorageKey)
if (!localStorageData) {
  localStorageData = JSON.stringify(Data)
  localStorage.setItem(localStorageKey, localStorageData)
} else {
  Data = JSON.parse(localStorageData)
}

const root = document.querySelector('#root')
let currentBoard = Data.boards[0]

const createBoardListElement = (board) => {
  const boardListElement = createElement('li', ['board-list-element'])
  boardListElement.innerHTML = board.name
  boardListElement.dataset.active = false

  if (board.name === currentBoard.name) boardListElement.dataset.active = true

  return boardListElement
}

const changeCurrentBoard = (index) => {
  currentBoard = Data.boards[index]
}

const renderBoardListElements = (boards) => {
  const boardList = document.querySelector('.board-list')
  boardList.innerHTML = ''
  boards.forEach((board) =>
    boardList.appendChild(createBoardListElement(board))
  )

  const newBoard = createElement('li', ['new-board-button'])
  newBoard.innerHTML = '+ Add New Board'
  boardList.appendChild(newBoard)

  newBoard.addEventListener('click', () => {
    root.appendChild(createPopupBoardAdd(boards))
  })

  handleChangeBoard()
}

const createElement = (tagName, classNames) => {
  const element = document.createElement(tagName)
  classNames.forEach((className) => element.classList.add(className))
  return element
}

const renderApp = (data, currentBoard) => {
  root.innerHTML = ''
  root.appendChild(createHeader(currentBoard))
  root.appendChild(createAside())
  root.appendChild(createBoard(currentBoard))

  renderBoardListElements(data.boards)
}

renderApp(Data, currentBoard)

window.addEventListener('keydown', (e) => {
  if (document.querySelector('.popup') && e.code === 'Escape') {
    document.querySelector('.popup').remove()
  }
})

export {
  root,
  createElement,
  changeCurrentBoard,
  renderApp,
  currentBoard,
  localStorageKey,
  Data
}
