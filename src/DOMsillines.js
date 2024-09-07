import { projects } from "./logic.js";

const projectsContainer = document.querySelector('.projectsContainer');
const todosContainer = document.querySelector('.todosContainer');
const addProjectDialog = document.querySelector('.addProjectDialog');
const addProjectForm = document.querySelector('.addProjectForm');
const addTodoDialog = document.querySelector('.addTodoDialog');
const addTodoForm = document.querySelector('.addTodoForm');

const addTodo = document.querySelector('.addTodo');


addEventListener('DOMContentLoaded', () => {
    dsiplayTodos(projects.getProject(localStorage.getItem('currentProject')));
    if(projects.getProjects().length == 0) {
        addProjectDialog.showModal();        
    }
});

JSON.parse(localStorage.getItem('projectsList')).forEach((e) => {
    const project = document.createElement('li');
    project.classList = 'project'
    const projectBtn = document.createElement('button');
    projectBtn.classList = 'projectBtn';
    projectBtn.textContent = e.title;
    projectBtn.onclick = () => {
        dsiplayTodos(e);
        localStorage.setItem("currentProject", e.title);
    }
    project.appendChild(projectBtn);
    projectsContainer.appendChild(project);
})


function dsiplayTodos(project) {
    todosContainer.innerHTML = ''
    project.todos.forEach((e) => {
        const todo = document.createElement('li');
        todo.classList = 'todo';
        const checkBtn = document.createElement('button');
        checkBtn.classList = 'check';
        const title = document.createElement('p');
        title.classList = 'title';
        title.textContent = e.title;
        const dueDate = document.createElement('p');
        dueDate.classList = 'dueDate';
        dueDate.textContent = e.dueDate;
        todo.appendChild(checkBtn);
        todo.appendChild(title);
        todo.appendChild(dueDate);
        todosContainer.appendChild(todo);
    })
}

const removeAllProjects = document.querySelector(".removeAllProjects");
removeAllProjects.onclick = () => {
    projects.reset();
    location.reload();
}


const addProject = document.querySelector(".addProject");
addProject.onclick = () => {
    addProjectDialog.showModal();
}

const cancelBtnProject = document.querySelector('.addProjectForm .cancel');
cancelBtnProject.onclick = () => {
    addProjectDialog.close();
    addProjectForm.reset();
}

const cancelBtnTodo = document.querySelector('.addTodoForm .cancel');
cancelBtnTodo.onclick = () => {
    addTodoDialog.close();
    addTodoForm.reset();
}

addProjectForm.addEventListener('submit', function(e) {
    const formData = new FormData(addProjectForm);
    localStorage.setItem("currentProject", formData.get('title'));
    projects.addProject(formData.get('title'));
    addProjectForm.reset();
    location.reload();
})

addTodo.onclick = () => {
    addTodoDialog.showModal();
}

console.log(localStorage.getItem('currentProject'));

addTodoForm.addEventListener('submit', e => {
    const formData = new FormData(addTodoForm);
    const currentProject = projects.getProject(localStorage.getItem('currentProject'));
    console.log(currentProject);
    currentProject.addTodo(formData.get('title'), formData.get('dueDate', '0'))
    addTodoForm.reset();
    dsiplayTodos(currentProject);
    location.reload();
});