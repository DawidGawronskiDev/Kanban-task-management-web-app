import { createElement } from '../../main'

const createAside = () => {
  const asideElement = createElement('aside', ['aside'])

  const boardList = createElement('ul', ['board-list'])
  asideElement.appendChild(boardList)

  return asideElement
}

export default createAside
