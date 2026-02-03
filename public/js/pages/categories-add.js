/**
 * Categories Add/Edit page logic.
 * - If URL has ?id=... -> load category and UPDATE via PUT /api/categories/:id
 * - Otherwise -> CREATE via POST /api/categories
 */
(function () {
  const form = document.getElementById("categoryForm");
  if (!form) return;

  const nameInput = document.getElementById("categoryName");
  const isActiveSelect = document.getElementById("categoryIsActive");
  const pageTitle = document.querySelector("h4.mb-4");
  const submitBtn = form.querySelector('button[type="submit"]');

  const params = new URLSearchParams(window.location.search);
  const categoryId = params.get("id");
  const isEditMode = !!categoryId;

  async function loadCategory() {
    if (!isEditMode) return;

    try {
      const res = await categoriesApi.getById(categoryId);
      const cat = res.data;

      if (nameInput) nameInput.value = cat.name ?? "";
      if (isActiveSelect) {
        isActiveSelect.value = cat.is_active ? "true" : "false";
      }

      if (pageTitle) {
        pageTitle.textContent = "Categories Edit";
      }
      if (submitBtn) {
        submitBtn.textContent = "Update";
      }
    } catch (error) {
      console.error("Failed to load category:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to load category. Please try again.";
      alert(msg);
    }
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = nameInput ? nameInput.value.trim() : "";
    const isActiveValue = isActiveSelect ? isActiveSelect.value : "";

    if (!name) {
      alert("Please enter category name.");
      return;
    }

    if (!isActiveValue) {
      alert("Please select active status.");
      return;
    }

    const is_active = isActiveValue === "true";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = isEditMode ? "Updating..." : "Saving...";
    }

    try {
      if (isEditMode) {
        await categoriesApi.update(categoryId, { name, is_active });
        alert("Category updated successfully.");
      } else {
        await categoriesApi.create({ name, is_active });
        alert("Category created successfully.");
      }
      window.location.href = "/categories";
    } catch (error) {
      console.error("Failed to save category:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to save category. Please try again.";
      alert(msg);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = isEditMode ? "Update" : "Submit";
      }
    }
  });

  // If in edit mode, load category details
  if (isEditMode) {
    loadCategory();
  }
})();

