document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("checkbox");
  let darkMode = localStorage.getItem("dark-mode");

  const enableDarkMode = () => {
    console.log("Enabling dark mode...");
    console.log("Body element:", document.body);
    document.body.classList.add("dark");
    localStorage.setItem("dark-mode", "dark");
  };

  const disableDarkMode = () => {
    console.log("Disabling dark mode...");
    console.log("Body element:", document.body);
    document.body.classList.remove("dark");
    localStorage.setItem("dark-mode", "light");
  };

  if (darkMode === "dark") {
    enableDarkMode();
    toggleBtn.checked = true; // Ensure checkbox reflects dark mode state
  } else {
    disableDarkMode();
    toggleBtn.checked = false; // Ensure checkbox reflects light mode state
  }

  toggleBtn.addEventListener("click", () => {
    if (toggleBtn.checked) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
});
