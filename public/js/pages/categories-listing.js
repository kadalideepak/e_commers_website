/**
 * Categories listing page logic.
 * Fetches categories from /api/categories and renders table rows.
 */
(function () {
  const tbody = document.getElementById("categoriesTableBody");
  if (!tbody) return;

  function renderRows(categories) {
    tbody.innerHTML = "";

    if (!Array.isArray(categories) || categories.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 4;
      td.textContent = "No categories found.";
      td.className = "text-center";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    categories.forEach((cat, index) => {
      const tr = document.createElement("tr");

      // S.No
      const tdIndex = document.createElement("td");
      tdIndex.textContent = String(index + 1);
      tr.appendChild(tdIndex);

      // Name
      const tdName = document.createElement("td");
      tdName.textContent = cat.name ?? "";
      tr.appendChild(tdName);

      // Is Active
      const tdActive = document.createElement("td");
      tdActive.textContent = cat.is_active ? "True" : "False";
      tr.appendChild(tdActive);

      // Action buttons (Edit/Delete placeholders)
      const tdAction = document.createElement("td");
      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "btn btn-sm btn-outline-primary me-2";
      editBtn.textContent = "Edit";
      editBtn.dataset.id = cat.id;

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "btn btn-sm btn-outline-danger";
      deleteBtn.textContent = "Delete";
      deleteBtn.dataset.id = cat.id;

      tdAction.appendChild(editBtn);
      tdAction.appendChild(deleteBtn);
      tr.appendChild(tdAction);

      tbody.appendChild(tr);

      // Edit click - go to categories-add with query param
      editBtn.addEventListener("click", () => {
        window.location.href = `/categories-add?id=${cat.id}`;
      });

      // Delete click
      deleteBtn.addEventListener("click", async () => {
        const confirmed = window.confirm(
          `Are you sure you want to delete category "${cat.name}"?`,
        );
        if (!confirmed) return;

        try {
          await categoriesApi.remove(cat.id);
          // Reload list after delete
          await loadCategories();
        } catch (error) {
          console.error("Failed to delete category:", error);
          const msg =
            error?.response?.data?.message ||
            "Failed to delete category. Please try again.";
          alert(msg);
        }
      });
    });
  }

  async function loadCategories() {
    try {
      const response = await categoriesApi.list();
      renderRows(response.data);
    } catch (error) {
      console.error("Failed to load categories:", error);
      renderRows([]);
      alert(
        error?.response?.data?.message ||
          "Failed to load categories. Please try again.",
      );
    }
  }

  // Run on page load
  document.addEventListener("DOMContentLoaded", loadCategories);
})();

