import { createElement } from '../../main'

const createSubtasksEdit = (container, task) => {
  container.innerHTML = ''

  const subtasksTitle = createElement('span', ['body-m'])
  subtasksTitle.innerHTML = 'Subtasks'
  container.appendChild(subtasksTitle)

  task.subtasks.forEach((subtask) => {
    const subtaskInputContainer = createElement('div', ['input-container'])
    container.appendChild(subtaskInputContainer)

    const subtaskInput = createElement('input', ['input-container'])
    subtaskInput.value = subtask.title
    subtaskInput.type = 'text'
    subtaskInput.placeholder = 'e.g. Make coffee'
    subtaskInputContainer.appendChild(subtaskInput)

    subtaskInput.addEventListener('input', (e) => {
      subtask.title = e.target.value
    })

    const subtaskDelete = createElement('button', ['delete-button'])
    subtaskInputContainer.appendChild(subtaskDelete)

    subtaskDelete.addEventListener('click', (e) => {
      const deleteButtons = Array.from(
        document.querySelectorAll('.delete-button')
      )
      const buttonIndex = deleteButtons.indexOf(e.target)

      console.log(deleteButtons, buttonIndex)

      task.subtasks.splice(buttonIndex, 1)
      createSubtasksEdit(container, task)
    })
  })

  const addSubtaskButton = createElement('button', ['button-secondary'])
  addSubtaskButton.innerHTML = '+ Add Subtask'
  container.appendChild(addSubtaskButton)

  addSubtaskButton.addEventListener('click', () => {
    console.log(task)
    task.subtasks.push({
      isCompleted: false,
      title: ''
    })
    createSubtasksEdit(container, task)
  })
}

export default createSubtasksEdit
