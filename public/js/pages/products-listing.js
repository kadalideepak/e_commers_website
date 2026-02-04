/**
 * Products listing page logic.
 */
(function () {
  const tbody = document.querySelector("tbody");
  if (!tbody) return;

  function renderRows(products) {
    tbody.innerHTML = "";

    if (!products.length) {
      const tr = document.createElement("tr");
      tr.innerHTML =
        '<td colspan="9" class="text-center">No products found.</td>';
      tbody.appendChild(tr);
      return;
    }

    products.forEach((p, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${p.seller_id}</td>
        <td>${p.category_id}</td>
        <td>${p.name}</td>
        <td>${p.description}</td>
        <td>${p.price}</td>
        <td>${p.stock}</td>
        <td>${p.status ? "Active" : "Inactive"}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-2 edit-btn" data-id="${p.id}">
            Edit
          </button>
          <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${p.id}">
            Delete
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });

    // Edit
    tbody.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.href = `/products-add?id=${btn.dataset.id}`;
      });
    });

    // Delete
    tbody.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
          await productsApi.remove(btn.dataset.id);
          loadProducts();
        } catch (err) {
          console.error(err);
          alert("Failed to delete product");
        }
      });
    });
  }

  async function loadProducts() {
    try {
      const res = await productsApi.list();
      renderRows(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  }

  document.addEventListener("DOMContentLoaded", loadProducts);
})();
