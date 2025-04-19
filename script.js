let tasks = [];
let currentFilter = 'all';
function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text === '') return;
  tasks.push({ text, completed: false });
  input.value = '';
  renderTasks();
}
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'pending') return !task.completed;
  });
  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task' + (task.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleTask(index);

    const span = document.createElement('span');
    span.className = 'task-text';
    span.innerText = task.text;

    const button = document.createElement('button');
    button.innerHTML = '🗑️';
    button.onclick = () => deleteTask(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
  });
}
renderTasks();