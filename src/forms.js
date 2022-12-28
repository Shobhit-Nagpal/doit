//Project form open and close
const openProjectForm = () => {

    const projectBgModal = document.querySelector('#project-bg-modal');
    projectBgModal.classList.remove('hide');
    projectBgModal.classList.add('show');
}

const closeProjectForm = () => {

    const projectBgModal = document.querySelector('#project-bg-modal');
    projectBgModal.classList.remove('show');
    projectBgModal.classList.add('hide');
}

//Task form open and close
const openTaskForm = () => {
    const taskBgModal = document.querySelector('#task-bg-modal');
    taskBgModal.classList.remove('hide');
    taskBgModal.classList.add('show');
}

const closeTaskForm = () => {
    const taskBgModal = document.querySelector('#task-bg-modal');
    taskBgModal.classList.remove('show');
    taskBgModal.classList.add('hide');
}

export {openProjectForm, closeProjectForm, openTaskForm, closeTaskForm}