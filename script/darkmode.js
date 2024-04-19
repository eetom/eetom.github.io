// const toggleBtn = document.getElementById("checkbox");
// let darkMode = localStorage.getItem("dark-mode");


// const enableDarkMode = () => {
//       document.body.classList.add("dark");
//       localStorage.setItem("dark-mode", "dark");
// };

// const disableDarkMode = () => {
//       document.body.classList.remove("dark");
//       localStorage.setItem("dark-mode", "light");

// };

// if (darkMode === "dark") {
//       document.getElementById("checkbox").checked = true;
//       enableDarkMode(); // set state of darkMode on page load
// } else {
//       document.getElementById("checkbox").checked = false;
//       disableDarkMode(); // start with light mode
// }

// toggleBtn.addEventListener("click", (e) => {
//       darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
//       if (darkMode === "light") {
//             enableDarkMode();
//       } else {
//             disableDarkMode();
//       }
// }); "




// document.addEventListener("DOMContentLoaded", () => {
//       const toggleBtn = document.getElementById("checkbox");
//       let darkMode = localStorage.getItem("dark-mode");

//       const enableDarkMode = () => {
//             document.body.classList.add("dark");
//             localStorage.setItem("dark-mode", "dark");
//       };

//       const disableDarkMode = () => {
//             document.body.classList.remove("dark");
//             localStorage.setItem("dark-mode", "light");
//       };

//       // Apply dark mode directly on page load if previously set to dark
//       if (darkMode === "dark") {
//             enableDarkMode();
//             toggleBtn.checked = true; // Ensure checkbox reflects dark mode state
//       } else {
//             disableDarkMode();
//             toggleBtn.checked = false; // Ensure checkbox reflects light mode state
//       }

//       // Event listener for toggling dark mode
//       toggleBtn.addEventListener("click", () => {
//             if (toggleBtn.checked) {
//                   enableDarkMode();
//             } else {
//                   disableDarkMode();
//             }
//       });
// });