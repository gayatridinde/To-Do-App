// Input references
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let add = document.getElementById("add");

// Load existing tasks
let data = JSON.parse(localStorage.getItem("data")) || [];

// Form submit handler
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (textInput.value.trim() === "") {
    msg.innerHTML = "Task cannot be blank";
  } else {
    msg.innerHTML = "";
    addTask();
    resetForm();
  }
});

// Add task
function addTask() {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
    status: "incomplete"
  });

  localStorage.setItem("data", JSON.stringify(data));
  showTasks();
  showToast("Task Created 📝");
}

// Display tasks
function showTasks() {
  document.getElementById("incompleteTasks").innerHTML = "";
  document.getElementById("completedTasks").innerHTML = "";

  data.forEach(function (task, index) {
    let containerId = task.status === "completed" ? "completedTasks" : "incompleteTasks";

    let taskHTML = `
      <div id="${index}" class="task-item">
        <input type="checkbox" onchange="toggleStatus(${index})" ${task.status === "completed" ? "checked" : ""} />
        <span class="fw-bold ${task.status === "completed" ? "text-decoration-line-through" : ""}">${task.text}</span>
        <span class="small text-secondary">${task.date}</span>
        <p>${task.description}</p>
        <span class="options">
          <i onclick="editTask(this)" class="fas fa-edit"></i>
          <i onclick="deleteTask(this)" class="fas fa-trash-alt"></i>
        </span>
      </div>
    `;

    document.getElementById(containerId).innerHTML += taskHTML;
  });
}

// Toggle task status
function toggleStatus(index) {
  data[index].status = data[index].status === "completed" ? "incomplete" : "completed";
  localStorage.setItem("data", JSON.stringify(data));
  showTasks();
  showToast(`Marked as ${data[index].status === "completed" ? "Completed ✅" : "Incomplete ❌"}`);
}

// Delete task
function deleteTask(element) {
  let taskElement = element.parentElement.parentElement;
  data.splice(taskElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  showTasks();
  showToast("Task Deleted 🗑️");
}

// Edit task
function editTask(element) {
  let taskElement = element.parentElement.parentElement;
  let index = taskElement.id;

  textInput.value = data[index].text;
  dateInput.value = data[index].date;
  textarea.value = data[index].description;

  deleteTask(element);
  showToast("Task Edited ✏️");
}

// Reset form
function resetForm() {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
}

// Toast
function showToast(message) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.getElementById("toastContainer").appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// On load
showTasks();
