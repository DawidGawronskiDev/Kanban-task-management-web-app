import { handleTaskStatusChange } from '../../utils/utils'

const createDropdown = (currentBoard, task, updateImmediately = false) => {
  const statusContainer = document.createElement('div')
  statusContainer.classList.add('inputs-container')

  const statusTitle = document.createElement('span')
  statusTitle.classList.add('body-m')
  statusTitle.innerHTML = 'Status'
  statusContainer.appendChild(statusTitle)

  const statusDropdown = document.createElement('div')
  statusDropdown.classList.add('dropdown')
  statusContainer.appendChild(statusDropdown)

  statusDropdown.addEventListener('click', (e) => {
    const statusDropdownOptions = document.querySelector(
      '.status-dropdown-options'
    )

    statusDropdownOptions.dataset.visible === 'false'
      ? (statusDropdownOptions.dataset.visible = 'true')
      : (statusDropdownOptions.dataset.visible = 'false')
  })

  const statusDropdownTitle = document.createElement('div')
  statusDropdownTitle.classList.add('status-dropdown-title', 'body-l')
  statusDropdownTitle.innerHTML = currentBoard.columns[0].name
  statusDropdown.appendChild(statusDropdownTitle)

  const statusDropdownOptions = document.createElement('ul')
  statusDropdownOptions.classList.add('status-dropdown-options')
  statusDropdownOptions.dataset.visible = false
  statusDropdown.appendChild(statusDropdownOptions)

  currentBoard.columns.forEach((column) => {
    const statusDropdownOption = document.createElement('li')
    statusDropdownOption.classList.add('status-dropdown-option', 'body-l')
    statusDropdownOption.innerHTML = column.name
    statusDropdownOptions.appendChild(statusDropdownOption)

    !updateImmediately
      ? (() => {
          statusDropdownOption.addEventListener('click', (e) => {
            const newStatus = e.target.innerHTML
            task.status = newStatus
            statusDropdownTitle.innerHTML = newStatus
          })
        })()
      : (() => {
          statusDropdownOption.addEventListener('click', (e) => {
            const newStatus = e.target.innerHTML
            if (newStatus !== task.status) {
              statusDropdownTitle.innerHTML = newStatus
              handleTaskStatusChange(task.id, newStatus, currentBoard)
            }
          })
        })()
  })

  return statusContainer
}

export default createDropdown
