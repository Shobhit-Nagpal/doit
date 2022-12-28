import { projects } from "./project";
import { tasks } from "./task";


const displayProjects = () => {
    const projectContainer = document.querySelector('#project-div');

    while (projectContainer.firstChild) {
        projectContainer.removeChild(projectContainer.firstChild);
    }



    if (localStorage.getItem("projects") === null) {
        projects = [];
    }
    else {
        projects = JSON.parse(localStorage.getItem("projects"));
    }

    for (let i = 0 ; i < projects.length ; i++) {

        let projectDiv = document.createElement('div');
        projectDiv.classList.add("projects");

        projectContainer.appendChild(projectDiv);

        let projectNameDiv = document.createElement('div');
        let deleteProjectBtn = document.createElement('button');
        let projectName = document.createElement('h3');

        projectName.textContent = projects[i].name;
        deleteProjectBtn.textContent = 'X';

        deleteProjectBtn.classList.add("remove-project");


        projectNameDiv.appendChild(projectName);

        projectDiv.appendChild(projectNameDiv);
        projectDiv.appendChild(deleteProjectBtn);

        if (projects[i].name === "Inbox") {
            projectDiv.removeChild(deleteProjectBtn);   
        }
    }


    //DELETING A PROJECT
    const deleteProjectBtns = document.querySelectorAll('.remove-project');
    deleteProjectBtns.forEach((deleteProjectBtn) => {
        deleteProjectBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            let projectName = deleteProjectBtn.parentElement.firstChild.textContent;
            console.log(projectName);

            deleteProject(projectName);
            displayProjects();
            displayProjectTasks("Inbox");
        });
    });


    
    //CLICKING ON A PROJECT TO SHOW TASKS
    const projects_ = document.querySelectorAll(".projects");
    projects_.forEach((project) => {
        project.addEventListener('click', (e) => {
            let projectName = project.firstChild.firstChild.textContent;
            displayProjectTasks(projectName);
            e.stopPropagation();
        });
    });
}

const displayProjectTasks = (projectName) => {

    if (localStorage.getItem("projects") === null) {
        projects = [];
    }
    else {
        projects = JSON.parse(localStorage.getItem("projects"));
    }

    
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    const projectTitle = document.querySelector('#page-heading');
    projectTitle.textContent = projectName;

    const taskDiv = document.querySelector('#task-div');
    
    while (taskDiv.firstChild) {
        taskDiv.removeChild(taskDiv.firstChild);
    }

    for (let i = 0 ; i < tasks.length ; i++) {
        if (tasks[i].projectName === projectName) {
        
          let task = document.createElement('div');
          task.classList.add("tasks");
          
          if (tasks[i].taskFinished === true) {
            task.classList.add("finished");
          }
          else {
            task.classList.add("unfinished");
          }
  
          taskDiv.appendChild(task);
  
          let taskFinishedBtn = document.createElement('button');
          let deleteTaskBtn = document.createElement('button');
          let taskName = document.createElement('h3');
          let taskPriority = document.createElement('p');
          let taskDue = document.createElement('p');

          taskFinishedBtn.textContent = 'Done';
          taskFinishedBtn.classList.add("task-fin");
  
          deleteTaskBtn.textContent = 'X';
          deleteTaskBtn.classList.add("remove-task");
  
          taskName.textContent = tasks[i].taskName;
          taskPriority.textContent = `Priority: ${tasks[i].taskPriority}`;
          taskDue.textContent = `Due: ${tasks[i].taskDue}`;
  
          task.appendChild(taskFinishedBtn);
          task.appendChild(deleteTaskBtn);
          task.appendChild(taskName);
          task.appendChild(taskPriority);
          task.appendChild(taskDue);
        }
    }



    //DELETING A TASK
    const deleteTaskBtns = document.querySelectorAll('.remove-task');
    deleteTaskBtns.forEach((deleteTaskBtn) => {
        deleteTaskBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let taskName = deleteTaskBtn.parentElement.childNodes[2].textContent;
            let projectName = document.querySelector('#page-heading').textContent;
            console.log(projectName);
            console.log(taskName);
            deleteTask(taskName, projectName);
            displayProjectTasks(projectName);
        });
    });


    const taskFinishedBtns = document.querySelectorAll('.task-fin');
    taskFinishedBtns.forEach((taskFinishedBtn) => {
        taskFinishedBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let taskName = taskFinishedBtn.parentElement.childNodes[2].textContent;
            let projectName = document.querySelector('#page-heading').textContent;
            let task = taskFinishedBtn.parentElement;
            console.log(taskName);
            console.log(projectName);
            completeTask(taskName, projectName);
            console.log(task);
            task.classList.remove('unfinished');
            task.classList.add('finished');
            displayProjectTasks(projectName);
        });
    });
}

const deleteProject = (name) => {
    if (localStorage.getItem("projects") === null) {
        projects = [];
    }
    else {
        projects = JSON.parse(localStorage.getItem("projects"));
    }

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }


    //Removing tasks of the project
    tasks = tasks.filter((task) => {
        return task.projectName !== name;
    });

    //Removing the project
    for (let i = 0 ; i < projects.length ; i++) {
        if (projects[i].name === name) {
            projects.splice(i,1);
            break;
        }
    }

    //Saving the new tasks array on localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    //Saving the new project array on localStorage
    localStorage.setItem("projects", JSON.stringify(projects));
}


const deleteTask = (taskName, projectName) => {

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    for (let i = 0 ; i < tasks.length ; i++) {

        if (tasks[i].taskName === taskName && tasks[i].projectName === projectName) {
            tasks.splice(i,1);
        }
        
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}



const completeTask = (taskName, projectName) => {
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    for (let i = 0 ; i < tasks.length ; i++) {
        if (tasks[i].taskName === taskName && tasks[i].projectName === projectName) {
            console.log(tasks[i]);
            tasks[i].taskFinished = true;    
            console.log(tasks[i].taskFinished);
        }
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export {displayProjects, displayProjectTasks, deleteProject}