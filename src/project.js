//Array to hold all projects created
let projects = [];

//Factory function to create an object called Project
const project = (name) => {
    return {name};
}

//Inbox is the default project
const inbox = project("Inbox");
projects.push(inbox);

if (localStorage.getItem("projects") === null) {
    localStorage.setItem("projects", JSON.stringify(projects))
}


export {projects, project}