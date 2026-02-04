/**
 * Seller Profile Add/Edit page logic.
 * - ?id=... → Edit
 * - No id → Create
 */
(function () {
  const form = document.querySelector("form");
  if (!form) return;

  const userIdInput = form.querySelector('input[placeholder="Enter user id"]');
  const shopNameInput = form.querySelector(
    'input[placeholder="Enter shope name"], input[placeholder="Enter shop name"]',
  );
  const gstInput = form.querySelector('input[placeholder="Enter gst number"]');
  const commissionInput = form.querySelector('input[type="number"]');
  const statusSelect = form.querySelector("select");

  const pageTitle = document.querySelector("h4.mb-4");
  const submitBtn = form.querySelector('button[type="submit"]');

  const params = new URLSearchParams(window.location.search);
  const sellerId = params.get("id");
  const isEditMode = !!sellerId;

  async function loadSellerProfile() {
    if (!isEditMode) return;

    try {
      const res = await sellerProfileApi.getById(sellerId);
      const s = res.data;

      userIdInput.value = s.user_id ?? "";
      shopNameInput.value = s.shop_name ?? "";
      gstInput.value = s.gst_number ?? "";
      commissionInput.value = s.commission_percentage ?? "";
      statusSelect.value = s.status ?? "Pending";

      pageTitle.textContent = "Seller Profile Edit";
      submitBtn.textContent = "Update";
    } catch (error) {
      console.error("Failed to load seller profile:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to load seller profile. Please try again.",
      );
    }
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      user_id: Number(userIdInput.value),
      shop_name: shopNameInput.value.trim(),
      gst_number: gstInput.value.trim(),
      commission_percentage: Number(commissionInput.value),
      status: statusSelect.value,
    };

    if (!data.shop_name) {
      alert("Please enter shop name.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = isEditMode ? "Updating..." : "Saving...";

    try {
      if (isEditMode) {
        await sellerProfileApi.update(sellerId, data);
        alert("Seller profile updated successfully.");
      } else {
        await sellerProfileApi.create(data);
        alert("Seller profile created successfully.");
      }
      window.location.href = "/sellerProfile";
    } catch (error) {
      console.error("Failed to save seller profile:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to save seller profile. Please try again.",
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = isEditMode ? "Update" : "Submit";
    }
  });

  if (isEditMode) {
    loadSellerProfile();
  }
})();
