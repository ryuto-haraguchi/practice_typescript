var tasks = [];
var taskForm = document.getElementById('task-form');
var taskInput = document.getElementById('task-input');
var taskList = document.getElementById('task-list');
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(function (task) {
        var li = document.createElement('li');
        li.textContent = "".concat(task.name, " (").concat(task.completed ? 'Done' : 'Not Done', ")");
        var toggleButton = document.createElement('button');
        toggleButton.textContent = task.completed ? 'Undo' : 'Complete';
        toggleButton.addEventListener('click', function () { return toggleTaskCompletion(task.id); });
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () { return deleteTask(task.id); });
        li.appendChild(toggleButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}
function addTask(name) {
    var newTask = {
        id: tasks.length + 1,
        name: name,
        completed: false,
    };
    tasks.push(newTask);
    renderTasks();
}
function deleteTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    renderTasks();
}
function toggleTaskCompletion(id) {
    var task = tasks.find(function (task) { return task.id === id; });
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var taskName = taskInput.value.trim();
    if (taskName) {
        addTask(taskName);
        taskInput.value = '';
    }
});
