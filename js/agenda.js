document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const calendarEl = document.getElementById("calendar");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";

    // Ordena as tarefas por data e hora
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

    sortedTasks.forEach(task => {
      const li = document.createElement("li");
      const dataBR = task.date.split("-").reverse().join("/");
      li.innerHTML = `
        <strong>${task.desc}</strong> - ${dataBR} às ${task.time}
        <button onclick="editTask('${task.id}')">Editar</button>
        <button onclick="deleteTask('${task.id}')">Excluir</button>
      `;
      taskList.appendChild(li);
    });
  }

  // Atualiza o calendário com os eventos
  function updateCalendar() {
    calendar.removeAllEvents();
    tasks.forEach(task => {
      calendar.addEvent({
        title: task.desc,
        start: `${task.date}T${task.time}`,
        allDay: false
      });
    });
  }

  // Inicializa o calendário
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: [],
  });
  calendar.render();
  updateCalendar();

  // Adiciona nova tarefa
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const desc = document.getElementById("task-desc").value.trim();
    const date = document.getElementById("task-date").value;
    const time = document.getElementById("task-time").value;

    if (desc && date && time) {
      const newTask = {
        id: Date.now().toString(),
        desc,
        date,
        time
      };
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      updateCalendar();
      form.reset();
    }
  });

  // Excluir tarefa por ID
  window.deleteTask = function(id) {
    if (confirm("Deseja excluir esta tarefa?")) {
      tasks = tasks.filter(task => task.id !== id);
      saveTasks();
      renderTasks();
      updateCalendar();
    }
  };

  // Editar tarefa por ID
  window.editTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      document.getElementById("task-desc").value = task.desc;
      document.getElementById("task-date").value = task.date;
      document.getElementById("task-time").value = task.time;

      // Remove temporariamente a tarefa para atualizar depois
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      renderTasks();
      updateCalendar();
    }
  };

  renderTasks();
});

document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('task-list');
  const taskForm = document.getElementById('task-form');
  const taskDesc = document.getElementById('task-desc');
  const taskDate = document.getElementById('task-date');
  const taskTime = document.getElementById('task-time');

  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const desc = taskDesc.value;
    const date = taskDate.value;
    const time = taskTime.value;

    // Criar o item da tarefa
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${desc} - ${date} às ${time}</span>
      <div class="task-actions">
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Excluir</button>
      </div>
    `;

    // Adicionar evento de excluir
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(li);
    });

    // Adicionar evento de editar
    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
      taskDesc.value = desc;
      taskDate.value = date;
      taskTime.value = time;
      taskList.removeChild(li);
    });

    // Adicionar a tarefa à lista
    taskList.appendChild(li);

    // Limpar os campos do formulário
    taskDesc.value = '';
    taskDate.value = '';
    taskTime.value = '';
  });
});

document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
