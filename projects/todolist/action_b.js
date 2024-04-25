// Array to store tasks with their associated timers
let tasks = [];

// Function to add a new task
function newElement() {
  const inputValue = document.getElementById("myInput").value.trim();
  if (inputValue === "") {
    alert("Please enter a task description.");
    return;
  }

  // Create task object with description and initial timer state
  const task = {
    description: inputValue,
    timer: {
      isRunning: false,
      seconds: 0,
      timerId: null
    }
  };

  // Add task to tasks array
  tasks.push(task);
  console.log("New task added:", task);

  // Render the task on the page
  renderTask(task);

  // Clear input field
  document.getElementById("myInput").value = "";
}

// Function to render a task on the page
// Function to render a task on the page
// Function to render a task on the page
function renderTask(task) {
  const list = document.getElementById("myUL");
  const li = document.createElement("li");

  // Create div for task description and timer
  const descriptionTimerDiv = document.createElement("div");
  descriptionTimerDiv.style.flex = "1"; // Make this div expand to fill remaining space
  descriptionTimerDiv.style.display = "flex";
  descriptionTimerDiv.style.alignItems = "center";

  // Create div for buttons
  const buttonsDiv = document.createElement("div");
  buttonsDiv.style.display = "flex";
  buttonsDiv.style.alignItems = "center";

  // Create elements for task description and timer
  const descriptionSpan = document.createElement("span");
  descriptionSpan.textContent = task.description;
  descriptionSpan.classList.add("task-description"); // Apply CSS class
  descriptionSpan.style.cursor = "pointer"; // Change cursor to pointer

  const timerSpan = document.createElement("span");
  timerSpan.textContent = formatTime(task.timer.seconds);
  timerSpan.classList.add("task-timer"); // Apply CSS class

  // Create start/pause button
  const startBtn = document.createElement("button");
  startBtn.innerHTML = '<i class="fa fa-play-circle"></i> Start'; // Icon + text
  startBtn.classList.add("start-btn"); // Apply CSS class
  startBtn.onclick = () => toggleTimer(task);

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa fa-trash"></i> Delete'; // Icon + text
  deleteBtn.classList.add("delete-btn"); // Apply CSS class
  deleteBtn.onclick = () => deleteTask(task);

  // Add click event listener to toggle styles on task item click
  li.addEventListener("click", (event) => {
    if (!event.target.closest("button")) {
      // Clicked anywhere within the task item that is not a button
      toggleTaskCompletion(li);
    }
  });

  // Append description and timer elements to descriptionTimerDiv
  descriptionTimerDiv.appendChild(timerSpan);
  descriptionTimerDiv.appendChild(descriptionSpan);

  // Append start button to buttonsDiv
  buttonsDiv.appendChild(startBtn);

  // Append delete button to buttonsDiv
  buttonsDiv.appendChild(deleteBtn);

  // Append divs to list item
  li.appendChild(descriptionTimerDiv);
  li.appendChild(buttonsDiv);

  // Append list item to the list
  list.appendChild(li);
}

// Function to toggle task completion styles (background color and text decoration) on the <li> element
function toggleTaskCompletion(taskItem) {
  if (taskItem.classList.contains("completed")) {
    // Task is currently completed, toggle back to incomplete
    taskItem.classList.remove("completed");
  } else {
    // Task is currently incomplete, toggle to completed
    taskItem.classList.add("completed");
  }
}

// Function to toggle the timer for a task
function toggleTimer(task) {
  const startBtn = findStartButton(task);

  if (!task.timer.isRunning) {
    // Start the timer
    task.timer.timerId = setInterval(() => {
      task.timer.seconds++;
      updateTimerDisplay(task);
    }, 1000);
    task.timer.isRunning = true;
    startBtn.innerHTML = '<i class="fa fa-pause-circle"></i> Pause'; // Icon + text
    startBtn.classList.add("pause-btn"); 
    console.log("Timer started for task:", task);
  } else {
    // Pause the timer
    clearInterval(task.timer.timerId);
    task.timer.isRunning = false;
    startBtn.innerHTML = '<i class="fa fa-play-circle"></i> Start'; // Icon + text
    startBtn.classList.remove("pause-btn");
    console.log("Timer paused for task:", task);
  }
}

// Helper function to find the start button for a task
function findStartButton(task) {
  const listItems = document.getElementsByTagName("li");
  for (const li of listItems) {
    const descriptionSpan = li.querySelector("span:nth-child(2)");
    if (descriptionSpan && descriptionSpan.textContent === task.description) {
      const startBtn = li.querySelector(".start-btn");
      return startBtn;
    }
  }
}

// Function to update the timer display for a task
function updateTimerDisplay(task) {
  const listItems = document.getElementsByTagName("li");
  Array.from(listItems).forEach(li => {
    const descriptionSpan = li.querySelector("span:nth-child(2)");
    if (descriptionSpan && descriptionSpan.textContent === task.description) {
      const timerSpan = li.querySelector("span:first-child");
      if (timerSpan) {
        timerSpan.textContent = formatTime(task.timer.seconds);
        console.log("Timer display updated for task:", task);
      }
    }
  });
}

// Function to format seconds into hh:mm:ss format
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Function to delete a task
function deleteTask(task) {
  // Stop the timer if running
  if (task.timer.isRunning) {
    clearInterval(task.timer.timerId);
    console.log("Timer stopped for task:", task);
  }

  // Remove task from tasks array
  tasks = tasks.filter(t => t !== task);

  // Remove task from the DOM
  const list = document.getElementById("myUL");
  const listItems = list.getElementsByTagName("li");
  Array.from(listItems).forEach(li => {
    const descriptionSpan = li.querySelector("span:nth-child(2)");
    if (descriptionSpan && descriptionSpan.textContent === task.description) {
      list.removeChild(li);
      console.log("Task deleted:", task);
    }
  });
}

