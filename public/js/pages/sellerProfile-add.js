/**
 * Seller Profile Add/Edit page logic.
 * - If URL has ?id=... -> load seller profile and UPDATE
 * - Otherwise -> CREATE
 */
(function () {
  const form = document.getElementById("categoryForm");
  if (!form) return;

  const inputs = form.querySelectorAll("input, select");
  const pageTitle = document.querySelector("h4.mb-4");
  const submitBtn = form.querySelector('button[type="submit"]');

  const params = new URLSearchParams(window.location.search);
  const sellerId = params.get("id");
  const isEditMode = !!sellerId;

  async function loadSellerProfile() {
    if (!isEditMode) return;

    try {
      const res = await sellerProfileApi.getById(sellerId);
      const data = res.data;

      inputs[0].value = data.user_id ?? "";
      inputs[1].value = data.shop_name ?? "";
      inputs[2].value = data.gst_number ?? "";
      inputs[3].value = data.commission_percent ?? "";
      inputs[4].value = data.status ?? "";

      pageTitle.textContent = "Seller Profile Edit";
      submitBtn.textContent = "Update";
    } catch (error) {
      console.error("Failed to load seller profile:", error);
      alert(error?.response?.data?.message || "Failed to load seller profile.");
    }
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const payload = {
      user_id: inputs[0].value.trim(),
      shop_name: inputs[1].value.trim(),
      gst_number: inputs[2].value.trim(),
      commission_percent: inputs[3].value.trim(),
      status: inputs[4].value,
    };

    if (!payload.user_id || !payload.shop_name || !payload.status) {
      alert("Please fill all required fields.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = isEditMode ? "Updating..." : "Saving...";

    try {
      if (isEditMode) {
        await sellerProfileApi.update(sellerId, payload);
        alert("Seller profile updated successfully.");
      } else {
        await sellerProfileApi.create(payload);
        alert("Seller profile created successfully.");
      }
      window.location.href = "/sellerProfile";
    } catch (error) {
      console.error("Failed to save seller profile:", error);
      alert(error?.response?.data?.message || "Failed to save seller profile.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = isEditMode ? "Update" : "Submit";
    }
  });

  if (isEditMode) {
    loadSellerProfile();
  }
})();
