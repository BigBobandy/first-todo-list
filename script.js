const todoListElement = document.getElementById("list-of-todos");
const inputElement = document.getElementById("user-input");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-button");
const todoCounter = document.getElementById("todo-number");

addButton.addEventListener("click", main);

//This function checks if there are any todos stored in local storage and loads them in if so
loadStoredTodos();

function main(event) {
  //Prevents the page from reloading when a new todo is submitted
  event.preventDefault();

  //Prevents an empty input field from being submitted
  if (inputElement.value === "") {
    return;
  }

  //Getting the value of the new todo and assigning it to todoText variable
  const todoText = inputElement.value.trim();

  //Calls functions
  createElements(todoText);
  updateCounter();
  storeTodos();

  //Resets the input field to blank after submit
  inputElement.value = "";
}
//this functions creates all of the elements for every new todo and appends them
function createElements(todoText, isChecked = false) {
  //Creating the list item of the new todo
  const newTodo = document.createElement("li");
  newTodo.classList.add("list-item");

  //Creating a checkbox for each new todo list item
  const checkbox = document.createElement("input");
  //Giving the checkbox the class of checkbox and also setting its type
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = isChecked;

  //Creating a span that has a unicode character of a checkmark for styling purposes
  const checkMark = document.createElement("span");
  checkMark.classList.add("checkmark");
  checkMark.innerHTML = "✓";

  //Creating a label to wrap the text of the newTodo and the checkbox with
  const label = document.createElement("label");
  label.classList.add("checkbox");

  //Appending everything
  label.append(checkbox, checkMark, todoText);
  newTodo.append(label);
  todoListElement.append(newTodo);
}

//This functions counts how many todos there are and displays it in the todoCounter element
function updateCounter() {
  let counter = parseInt(todoListElement.children.length);
  todoCounter.innerText = counter;
  console.log(counter);
}

function storeTodos() {
  //Creating an empty array to store the todos in
  const storedTodos = [];
  //For loop that iterates over the list element adding each todo to the storedTodos array
  for (let i = 0; i < todoListElement.children.length; i++) {
    //Storing the list item at index i
    const todoItem = todoListElement.children[i];
    //Getting the text from the todo item and storing it in the todoText variable
    const todoText = todoItem.querySelector("label").lastChild.textContent;
    //Checking whether the isChecked boolean is true or false and storing it in the isChecked variable. If its checked it will equal true and false if it isn't
    const isChecked = todoItem.querySelector('input[type="checkbox"]').checked;
    //Storing the text which is equal to the todoText variable and checked which is a boolean equal to the isChecked variable in the storedTodos array
    storedTodos.push({ text: todoText, checked: isChecked });
  }
  //Storing the storedTodos array in local storage
  localStorage.setItem("storedTodos", JSON.stringify(storedTodos));
}

function loadStoredTodos() {
  //Retreiving the stored todo items from local storage and parsing it back into an array
  const storedTodos = JSON.parse(localStorage.getItem("storedTodos"));

  // Checks if there are any storedTodo items
  if (storedTodos) {
    // Iterates through the storedTodos array using a for...of loop
    for (const todoItem of storedTodos) {
      // Calls the createElements() function with the text and checked properties
      createElements(todoItem.text, todoItem.checked);
    }
  }
}
