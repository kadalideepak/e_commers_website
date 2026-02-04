/**
 * Seller Profile listing page logic.
 */
(function () {
  const tbody = document.querySelector("tbody");
  if (!tbody) return;

  function renderRows(sellers) {
    tbody.innerHTML = "";

    if (!Array.isArray(sellers) || sellers.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 7;
      td.textContent = "No seller profiles found.";
      td.className = "text-center";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    sellers.forEach((s, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${s.user_id}</td>
        <td>${s.shop_name}</td>
        <td>${s.gst_number}</td>
        <td>${s.commission_percentage}%</td>
        <td>${s.status}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-2 edit-btn" data-id="${s.id}">
            Edit
          </button>
          <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${s.id}">
            Delete
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });

    // Edit
    tbody.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.href = `/sellerProfile-add?id=${btn.dataset.id}`;
      });
    });

    // Delete
    tbody.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this seller profile?"))
          return;

        try {
          await sellerProfileApi.remove(btn.dataset.id);
          loadSellerProfiles();
        } catch (error) {
          console.error("Failed to delete seller profile:", error);
          alert(
            error?.response?.data?.message ||
              "Failed to delete seller profile. Please try again.",
          );
        }
      });
    });
  }

  async function loadSellerProfiles() {
    try {
      const response = await sellerProfileApi.list();
      renderRows(response.data);
    } catch (error) {
      console.error("Failed to load seller profiles:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to load seller profiles. Please try again.",
      );
    }
  }

  document.addEventListener("DOMContentLoaded", loadSellerProfiles);
})();
