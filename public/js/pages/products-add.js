/**
 * Products Add/Edit page logic.
 * - Loads APPROVED seller profiles into dropdown
 * - Supports Create & Edit
 */
(function () {
  const form = document.querySelector("form");
  if (!form) return;

  // Inputs / Selects
  const sellerSelect = document.getElementById("sellerSelect");
  const categoryInput = form.querySelector(
    'input[placeholder="Enter category id"]',
  );
  const nameInput = form.querySelector('input[placeholder="Product name"]');
  const priceInput = form.querySelector('input[placeholder="Product price"]');
  const descInput = form.querySelector("textarea");
  const stockInput = form.querySelector('input[placeholder="Stock quantity"]');
  const statusSelect = form.querySelector("select");

  const submitBtn = form.querySelector('button[type="submit"]');
  const pageTitle = document.querySelector("h4.mb-4");

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const isEditMode = !!productId;

  /* ================================
     Load Approved Seller Profiles
  ================================= */
  async function loadApprovedSellers() {
    try {
      const res = await sellerProfileApi.getApproved();
      const sellers = res.data;

      sellerSelect.innerHTML = '<option value="">Select</option>';

      sellers.forEach((s) => {
        const option = document.createElement("option");
        option.value = s.id; // seller_profile.id
        option.textContent = s.shop_name;
        sellerSelect.appendChild(option);
      });
    } catch (err) {
      console.error("Failed to load approved sellers:", err);
      alert("Failed to load approved sellers");
    }
  }

  /* ================================
     Load Product (Edit mode)
  ================================= */
  async function loadProduct() {
    if (!isEditMode) return;

    try {
      const res = await productsApi.getById(productId);
      const p = res.data;

      sellerSelect.value = p.seller_profile_id ?? "";
      categoryInput.value = p.category_id ?? "";
      nameInput.value = p.name ?? "";
      priceInput.value = p.price ?? "";
      descInput.value = p.description ?? "";
      stockInput.value = p.stock ?? "";
      statusSelect.value = p.status ? "Active" : "Inactive";

      pageTitle.textContent = "Products Edit";
      submitBtn.textContent = "Update";
    } catch (err) {
      console.error("Failed to load product:", err);
      alert("Failed to load product");
    }
  }

  /* ================================
     Submit (Create / Update)
  ================================= */
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      seller_profile_id: Number(sellerSelect.value),
      category_id: Number(categoryInput.value),
      name: nameInput.value.trim(),
      description: descInput.value.trim(),
      price: Number(priceInput.value),
      stock: Number(stockInput.value),
      status: statusSelect.value === "Active",
    };

    if (!data.seller_profile_id) {
      alert("Please select seller");
      return;
    }
    if (!data.name) {
      alert("Please enter product name");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = isEditMode ? "Updating..." : "Saving...";

    try {
      if (isEditMode) {
        await productsApi.update(productId, data);
        alert("Product updated successfully");
      } else {
        await productsApi.create(data);
        alert("Product created successfully");
      }
      window.location.href = "/products";
    } catch (err) {
      console.error("Failed to save product:", err.response?.data || err);
      alert(
        err?.response?.data?.message ||
          "Failed to save product. Please try again.",
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = isEditMode ? "Update" : "Submit";
    }
  });

  /* ================================
     Init
  ================================= */
  document.addEventListener("DOMContentLoaded", async () => {
    await loadApprovedSellers();
    if (isEditMode) {
      loadProduct();
    }
  });
})();
