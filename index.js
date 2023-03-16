// Selectors

const taskInput = document.querySelector("#task-input");
const taskButton = document.querySelector(".task-button");
const taskContent = document.querySelector(".task-content");


// Event Listeners
document.addEventListener('DOMContentLoaded', getTasks);
taskButton.addEventListener('click', addTask);
taskContent.addEventListener('click', deleteCheck);

// Functions
function addTask(event){
    // Prevent form from submitting
    event.preventDefault();

    // taskDiv
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    // Create Li
    const newTask = document.createElement("li");
    newTask.innerText = taskInput.value;
    newTask.classList.add("task-item");
    taskDiv.appendChild(newTask);

    // Add task to localStorage
    saveLocalTasks(taskInput.value);   

    // Check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    taskDiv.appendChild(completedButton);

    // Deleted button
    const deletedButton = document.createElement('button');
    deletedButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deletedButton.classList.add("delete-btn");
    taskDiv.appendChild(deletedButton);

    // Append task
    taskContent.appendChild(taskDiv);

    // Clear task input
    taskInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // Delete task
    if (item.classList[0] === "delete-btn") {
      const task = item.parentElement;

    //   Animation
      task.classList.add("fall");
      removeLocalTasks(task);
      task.addEventListener("transitioned", function() {
        task.remove();
      }) 
    }

    // check task
    if (item.classList[0] === "complete-btn") {
        const task = item.parentElement;
        task.classList.toggle("completed");
    }
    
}


function saveLocalTasks(task) {
    // Check storage
    let tasks;
    if(localStorage.getItem('task') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;

    if(localStorage.getItem('task') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
    // taskDiv
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    // Create Li
    const newTask = document.createElement("li");
    newTask.innerText = task;
    newTask.classList.add("task-item");
    taskDiv.appendChild(newTask);

    // Check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    taskDiv.appendChild(completedButton);

    // Deleted button
    const deletedButton = document.createElement('button');
    deletedButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deletedButton.classList.add("delete-btn");
    taskDiv.appendChild(deletedButton);

    // Append task
    taskContent.appendChild(taskDiv);
    });
}

function removeLocalTasks(task) {
    let tasks;

    if(localStorage.getItem('task') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}