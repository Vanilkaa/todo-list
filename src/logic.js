function Project(title) {
    this.title = title;
    this.todos = [];
    this.addTodo = function (title, dueDate, check) {
        this.todos.push(new Todo(title, dueDate, check));
    }
    this.removeTodo = function (title) {
        const index = this.todos.indexOf(this.todos.find((todo) => todo.title == title));
        this.todos.splice(index, 1);
    }
}

function Todo(title, dueDate, check) {
    this.title = title;
    this.dueDate = dueDate;
    this.check = check;
}

export const projects = (function () {
    let projectsList = [];

    function addProject(title) {
        projectsList.push(new Project(title));
    }

    function removeProject(title) {
        const index = projectsList.indexOf(projectsList.find((project) => {
            project.title == title;
        }));
        projectsList.splice(index, 1);
    }

    function getProject(title) {
        return projectsList.find((project) => 
            project.title == title);
    }

    function init(projects) {
        projectsList = projects == null ? new Array() : projects;
        projectsList = projectsList.map((e) => Object.assign(new Project('amogus'), e))
    }

    function reset() {
        projectsList = [];
    }

    function getProjects() {
        return projectsList;
    }

    return { addProject, removeProject, getProject, init, reset, getProjects }
})();

addEventListener('DOMContentLoaded', () => {
    projects.init(JSON.parse(localStorage.getItem("projectsList")));
    console.log(projects.getProjects());
});

addEventListener("beforeunload", () => {
    localStorage.setItem("projectsList", JSON.stringify(projects.getProjects()));
});
