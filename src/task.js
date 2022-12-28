//Array to store all todos
let tasks = [];


//Factory function to create todos as object
const task = (taskName, taskPriority, taskDue, projectName) => {

    let taskFinished = false;
    return {taskName, taskPriority, taskDue, taskFinished, projectName};
}


export { tasks, task }