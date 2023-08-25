const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

function displayTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  savedTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = task;
    listItem.addEventListener('click', () => {
      listItem.classList.toggle('completed');
      updateLocalStorage();
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deletebtn');
    deleteButton.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
    deleteButton.addEventListener('click', () => {
      savedTasks.splice(index, 1);
      displayTasks();
      updateLocalStorage();
    });

    const editButton = document.createElement('button');
    editButton.classList.add('editbtn');
    editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    editButton.addEventListener('click', () => {
      const editInput = document.createElement('input');
      editInput.classList.add('editinput')
      editInput.type = 'text';
      editInput.value = task;
      editInput.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
          const newTask = editInput.value.trim();
          if (newTask !== '') {
            savedTasks[index] = newTask;
            displayTasks();
            updateLocalStorage();
          }
        }
      });

      listItem.textContent = '';
      listItem.appendChild(editInput);
      editInput.focus();
    });

    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    taskList.appendChild(listItem);
  });
}

function addTask() {
  const taskInput = document.getElementById('task-input');
  const task = taskInput.value.trim();

  if (task !== '') {
    savedTasks.push(task);
    displayTasks();
    updateLocalStorage();
    taskInput.value = '';
  }
}

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

document.getElementById('add-button').addEventListener('click', addTask);

displayTasks();

const taskInput = document.getElementById('taskInput');
taskInput.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    addTask();
  }
});
