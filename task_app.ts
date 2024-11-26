interface Task {
    id: number;
    name: string;
    completed: boolean;
}

let tasks: Task[] = [];

const taskForm = document.getElementById('task-form') as HTMLFormElement;
const taskInput = document.getElementById('task-input') as HTMLInputElement;
const taskList = document.getElementById('task-list') as HTMLUListElement; 

function renderTasks(): void {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.textContent = `${task.name} (${task.completed ? 'Done' : 'Not Done'})`;

    const toggleButton = document.createElement('button');
    toggleButton.textContent = task.completed ? 'Undo' : 'Complete';
    toggleButton.addEventListener('click', () => toggleTaskCompletion(task.id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(toggleButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  })
}

function addTask(name: string): void {
  const newTask: Task = {
    id: tasks.length + 1,
    name: name,
    completed: false,
  };
  tasks.push(newTask);
  renderTasks();
}

function deleteTask(id: number): void {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function toggleTaskCompletion(id: number): void {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

taskForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const taskName = taskInput.value.trim();
  if (taskName) {
    addTask(taskName); 
    taskInput.value = '';
  }
})