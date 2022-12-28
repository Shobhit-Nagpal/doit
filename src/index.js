import {addProjectToStorage, addTaskToStorage} from "./storage";
import { openProjectForm, closeProjectForm, openTaskForm, closeTaskForm } from "./forms";
import { displayProjects, displayProjectTasks } from "./dom";


//Display projects on loading the page
displayProjects();

//Display project tasks (inbox) on loading page
displayProjectTasks("Inbox");



//Event listeners for buttons and functinoality
const addProjectBtn = document.querySelector("#add-project");
addProjectBtn.addEventListener('click', () => {
    openProjectForm();
});



const closeProjectFormBtn = document.querySelector('#close-project-form');
closeProjectFormBtn.addEventListener('click', () => {
    console.log("Clicked");
    closeProjectForm();
});



const addTaskBtn = document.querySelector('#add-task');
addTaskBtn.addEventListener('click', () => {
    openTaskForm();
});




const closeTaskBtn = document.querySelector('#close-task-form');
closeTaskBtn.addEventListener('click', () => {
    closeTaskForm();
});




const createNewProjectBtn = document.querySelector('#project-submit');
createNewProjectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const projectName = document.querySelector('#project-name').value;
    addProjectToStorage(projectName);
    closeProjectForm();
    displayProjects();
});




const createNewTaskBtn = document.querySelector('#task-submit');
createNewTaskBtn.addEventListener('click', (e) => {

    e.stopPropagation();

    const projectName = document.querySelector('#page-heading').textContent;

    let taskName = document.querySelector('#task-name').value;
    let taskPriority;

    if (document.getElementById('task-high').checked) {
        taskPriority = document.getElementById('task-high').value;
    }
    else if (document.getElementById('task-medium').checked) {
        taskPriority = document.getElementById('task-medium').value;
    }
    else {
        taskPriority = document.getElementById('task-low').value;
    }

    let taskDue = document.querySelector('#task-due').value;

    addTaskToStorage(taskName, taskPriority, taskDue, projectName);
    closeTaskForm();
    displayProjectTasks(projectName);
});


//Preventing default on submitting the forms
const taskForm = document.querySelector('#task-form');
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
});


const projectForm = document.querySelector('#project-form');
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
});