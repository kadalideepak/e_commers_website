/**
 * Seller Profile listing page logic.
 */
(function () {
  const tbody = document.getElementById("categoriesTableBody");
  if (!tbody) return;

  function renderRows(list) {
    tbody.innerHTML = "";

    if (!Array.isArray(list) || list.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 7;
      td.className = "text-center";
      td.textContent = "No seller profiles found.";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    list.forEach((item, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.user_id ?? ""}</td>
        <td>${item.shop_name ?? ""}</td>
        <td>${item.gst_number ?? ""}</td>
        <td>${item.commission_percent ?? ""}</td>
        <td>${item.status ?? ""}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-2 edit-btn">Edit</button>
          <button class="btn btn-sm btn-outline-danger delete-btn">Delete</button>
        </td>
      `;

      tr.querySelector(".edit-btn").addEventListener("click", () => {
        window.location.href = `/sellerProfile-add?id=${item.id}`;
      });

      tr.querySelector(".delete-btn").addEventListener("click", async () => {
        const ok = confirm(
          `Are you sure you want to delete "${item.shop_name}"?`,
        );
        if (!ok) return;

        try {
          await sellerProfileApi.remove(item.id);
          loadSellerProfiles();
        } catch (error) {
          console.error("Delete failed:", error);
          alert(
            error?.response?.data?.message ||
              "Failed to delete seller profile.",
          );
        }
      });

      tbody.appendChild(tr);
    });
  }

  async function loadSellerProfiles() {
    try {
      const res = await sellerProfileApi.list();
      renderRows(res.data);
    } catch (error) {
      console.error("Load failed:", error);
      renderRows([]);
      alert(
        error?.response?.data?.message || "Failed to load seller profiles.",
      );
    }
  }

  document.addEventListener("DOMContentLoaded", loadSellerProfiles);
})();
