// selectors
const todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");
const todoButton = document.querySelector(".todo-button");
const todoInput = document.querySelector(".todo-input");
const filterOption = document.querySelector(".filter-todo");
// const select = document.querySelector(".select");

// event listeneres
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addItem);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
//functions
function addItem(item) {
  if (todoInput.value != "") {
    // console.log("You have added an empty item to the list");
    item.preventDefault();
    const newTodoDiv = document.createElement("div");
    newTodoDiv.classList.add("todo");

    const newItem = document.createElement("li");
    newItem.classList.add("todo-list");
    newItem.innerText = todoInput.value;
    newTodoDiv.appendChild(newItem);
    //add todo to local localStorage
    saveLocalTodos(todoInput.value);

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    newTodoDiv.appendChild(completeButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    newTodoDiv.appendChild(deleteButton);

    todoList.appendChild(newTodoDiv);
    todoInput.value = "";
  } else {
    console.log("Please add something to the list");
    alert("Please add something to the list");
  }
}

function deleteCheck(event) {
  const item = event.target;
  if (item.classList[0] === "delete-button") {
    const removableItem = item.parentElement;
    removableItem.classList.add("fall");
    removeLocalTodos(removableItem);
    removableItem.addEventListener("transitionend", function () {
      removableItem.remove();
    });
    // removableItem.remove();
  }

  if (item.classList[0] === "complete-button") {
    const completedItem = item.parentElement;
    completedItem.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  // console.log(e.target.value);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "pending":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;
    }
  });
}

function saveLocalTodos(todo) {
  //check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const newTodoDiv = document.createElement("div");
    newTodoDiv.classList.add("todo");

    const newItem = document.createElement("li");
    newItem.classList.add("todo-list");
    newItem.innerText = todo;
    newTodoDiv.appendChild(newItem);

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    newTodoDiv.appendChild(completeButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    newTodoDiv.appendChild(deleteButton);

    todoList.appendChild(newTodoDiv);
  });
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
