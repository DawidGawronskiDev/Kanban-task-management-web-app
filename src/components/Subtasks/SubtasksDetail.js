import { createElement } from '../../main'

const createSubtasksDetail = (container, task) => {
  const subtasksTitle = createElement('span', ['subtask-title', 'body-m'])
  subtasksTitle.innerHTML = 'Subtasks'
  container.appendChild(subtasksTitle)

  task.subtasks.forEach((subtask) => {
    const subtaskContainerItem = createElement('div', [
      'input-container',
      ['subtask-container']
    ])
    subtaskContainerItem.dataset.isCompleted = subtask.isCompleted
    container.appendChild(subtaskContainerItem)

    const subtaskCheckbox = createElement('input', ['subtask-checkbox'])
    subtaskCheckbox.type = 'checkbox'
    if (subtask.isCompleted) subtaskCheckbox.checked = true
    subtaskContainerItem.appendChild(subtaskCheckbox)

    subtaskCheckbox.addEventListener('click', (e) => {
      e.target.checked === true
        ? (subtask.isCompleted = true)
        : (subtask.isCompleted = false)

      subtaskContainerItem.dataset.isCompleted = e.target.checked
    })

    const taskLabel = document.createElement('label')
    taskLabel.classList.add('task-label')
    taskLabel.innerHTML = subtask.title
    subtaskContainerItem.appendChild(taskLabel)
  })
}

export default createSubtasksDetail
