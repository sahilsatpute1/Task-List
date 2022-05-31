//DEFINE UI VARIABLES
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//Load all event listeners
loadEventListeners();

//Load all event Listeners
function loadEventListeners()  {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    form.addEventListener('submit', addTask);

    //remove task event
    taskList.addEventListener('click', removeTask);

    //Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //filter tasks
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else  {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        //Create a li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"><i/>'
        //Append icon to link li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    })
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    //Create a li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"><i/>'
    //Append icon to link li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';

    e.preventDefault();
}

//Store task in local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else  {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove a single task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm("Are you sure?")) {
        e.target.parentElement.parentElement.remove();

        //Remove from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
       if(taskItem.textContent === task)  {
           tasks.splice(index, 1);
       }  
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTasks(e) {
    // taskList.innerHTML = '';

    //Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from local storage
    clearTasksFromLocalStorage();
}

//Clear tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter tasks
function filterTasks(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        })

}
