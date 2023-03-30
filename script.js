const todoListElement = document.getElementById("list-of-todos");
const inputElement = document.getElementById("user-input");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-button");
const todoCounter = document.getElementById("todo-number");

addButton.addEventListener("click", addTodo);

function addTodo() {
  //Prevents the page from reloading when a new todo is added
  event.preventDefault();

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

  //Creating a label element to wrap the newTodo and the checkbox with
  const label = document.createElement("label");
  label.append(checkbox, inputElement.value.trim());

  //Appending the checkbox to the new todo element and then appending the new todo element to the unordered list element
  newTodo.append(label);
  todoListElement.append(newTodo);

  //Setting the input field to blank after a new todo has been added
  inputElement.value = "";
}
