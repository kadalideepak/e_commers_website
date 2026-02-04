/**
 * Products Add/Edit page logic.
 * - ?id=... → Edit product
 * - No id → Create product
 */
(function () {
  const form = document.querySelector("form");
  if (!form) return;

  const sellerInput = form.querySelector(
    'input[placeholder="Enter seller id"]',
  );
  const categoryInput = form.querySelector(
    'input[placeholder="Enter category id"]',
  );
  const nameInput = form.querySelector('input[placeholder="Product name"]');
  const priceInput = form.querySelector('input[placeholder="Product price"]');
  const descInput = form.querySelector("textarea");
  const stockInput = form.querySelector('input[placeholder="Stock quantity"]');
  const statusSelect = form.querySelector("select");
  const pageTitle = document.querySelector("h4.mb-4");
  const submitBtn = form.querySelector('button[type="submit"]');

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const isEditMode = !!productId;

  async function loadProduct() {
    if (!isEditMode) return;

    try {
      const res = await productsApi.getById(productId);
      const p = res.data;

      sellerInput.value = p.seller_id ?? "";
      categoryInput.value = p.category_id ?? "";
      nameInput.value = p.name ?? "";
      priceInput.value = p.price ?? "";
      descInput.value = p.description ?? "";
      stockInput.value = p.stock ?? "";
      statusSelect.value = p.status ? "Active" : "Inactive";

      pageTitle.textContent = "Products Edit";
      submitBtn.textContent = "Update";
    } catch (err) {
      console.error(err);
      alert("Failed to load product");
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      seller_id: Number(sellerInput.value),
      category_id: Number(categoryInput.value),
      name: nameInput.value.trim(),
      description: descInput.value.trim(),
      price: Number(priceInput.value),
      stock: Number(stockInput.value),
      status: statusSelect.value === "Active",
    };

    if (!data.name) {
      alert("Product name is required");
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
      console.error(err);
      alert("Failed to save product");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = isEditMode ? "Update" : "Submit";
    }
  });

  if (isEditMode) loadProduct();
})();
