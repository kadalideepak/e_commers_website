// Load shared footer scripts from an HTML partial
(function () {
  window.addEventListener("DOMContentLoaded", function () {
    fetch("/partials/footer.html")
      .then((res) => res.text())
      .then((html) => {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;

        Array.from(tmp.children).forEach((node) => {
          document.body.appendChild(node);
        });
      })
      .catch((err) => {
        console.error("Failed to load footer partial:", err);
      });
  });
})();

