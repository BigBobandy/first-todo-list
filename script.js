const todoListElement = document.getElementById("list-of-todos");
const inputElement = document.getElementById("user-input");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-button");
const todoCounter = document.getElementById("todo-number");

loadFromLocalStorage();

addButton.addEventListener("click", addTodo);

//Function to add todos to the list. This function also takes in a parameter of todoText with an empty string allowing it to be called inside the loadFromLocalStorage function
function addTodo(todoText = "") {
  const event = window.event || null;

  if (event) {
    event.preventDefault();
  }

  //Prevents an empty input field from being submitted and returns early if so
  if (inputElement.value.trim() === "") {
    return;
  }

  //creating the list item of the new todo
  const newTodo = document.createElement("li");
  newTodo.classList.add("list-item");

  //Creating a checkbox for each new todo and appending it to the new list item
  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";

  const checkMark = document.createElement("span");
  checkMark.classList.add("checkmark");
  checkMark.innerHTML = "✓";

  //Creating a label element to wrap the newTodo and the checkbox with
  const label = document.createElement("label");
  label.classList.add("checkbox");
  label.append(checkbox, checkMark, inputElement.value.trim());

  //Appending the checkbox to the new todo element and then appending the new todo element to the unordered list element
  newTodo.append(label);
  todoListElement.append(newTodo);
  saveToLocalStorage();

  //Setting the input field to blank after a new todo has been added
  inputElement.value = "";
}

function saveToLocalStorage() {
  const storedTodos = [];
  for (let i = 0; i < todoListElement.children.length; i++) {
    storedTodos.push(todoListElement.children[i].textContent);
  }
  localStorage.setItem("storedTodos", JSON.stringify(storedTodos));
}

function loadFromLocalStorage() {
  const storedTodos = JSON.parse(localStorage.getItem("storedTodos"));

  if (storedTodos) {
    // Call `addTodo` with the stored todo text for each stored todo
    for (const todoText of storedTodos) {
      addTodo(todoText);
    }
  }
}
