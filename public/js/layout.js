// Load shared sidebar into any page that has <div id="sidebar"></div>
function loadSidebar() {
  const sidebarContainer = document.getElementById("sidebar");
  if (!sidebarContainer) return;

  fetch("/partials/sidebar.html")
    .then((response) => response.text())
    .then((html) => {
      sidebarContainer.innerHTML = html;
    })
    .catch((err) => {
      console.error("Failed to load sidebar:", err);
    });
}

document.addEventListener("DOMContentLoaded", loadSidebar);

