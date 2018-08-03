// Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearnBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#Task');


// Load all event listeners
loadEventListerners();

// Load all event listeners
function loadEventListerners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit',addTask);
    taskList.addEventListener("click", removeTask);
    clearnBtn.addEventListener('click', clearTasks)
    filter.addEventListener('keyup',filterTasks);
}

//Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    //Create li element
    const li = document.createElement("li");

    //Add class
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement("a");
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>'

    li.appendChild(link);

    taskList.appendChild(li);

    // Store data in local storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [] ;
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent == task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(e){
    //taskList.innerHtml = '';

    // Faster
    while(taskList.hasChild) {
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
}


// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;

        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}

function storeTaskInLocalStorage (task) {
    let tasks;
    if (localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'))
    } else {
        tasks = []
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks ;

    if(localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }else {
        tasks = [];
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement("li");

        //Add class
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>'

        li.appendChild(link);

        taskList.appendChild(li);
    });
}


  

