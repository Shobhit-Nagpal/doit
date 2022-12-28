import { projects, project } from "./project";
import { tasks, task } from "./task.js";


const addProjectToStorage = (projectName) => {

    if (projectName === "") {
        alert("Need to name your project :)")
        return;
    }

    //Making project object and pushing to array
    const _project = project(projectName);
    projects.push(_project);

    //Storing projects array as string in localStorage
    localStorage.setItem("projects", JSON.stringify(projects));
}



const addTaskToStorage = (taskName, taskPriority, taskDue, projectName) => {
    
    //Making task object and pushing to array
    const _task = task(taskName, taskPriority, taskDue, projectName);
    tasks.push(_task);


    //Storing tasks array as string in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

}


export {addProjectToStorage, addTaskToStorage}