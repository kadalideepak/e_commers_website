// Load shared <head> contents from an HTML partial
(function () {
  const head = document.head;
  if (!head) return;

  fetch("/partials/header.html")
    .then((res) => res.text())
    .then((html) => {
      const tmp = document.createElement("div");
      tmp.innerHTML = html;

      // Append each child of the partial into <head>
      Array.from(tmp.children).forEach((node) => {
        head.appendChild(node);
      });
    })
    .catch((err) => {
      console.error("Failed to load header partial:", err);
    });
})();

