/**
 * Seller Profile API - list, create, update, delete seller profiles
 * Uses apiClient from config.js
 */
const sellerProfileApi = {
  /**
   * Get all seller profiles
   */
  list() {
    return apiClient.get("/api/seller-profiles");
  },
  /**
   * Get approved seller profiles
   */
  getApproved() {
    return apiClient.get("/api/seller-profiles/status/APPROVED");
  },

  /**
   * Create a new seller profile
   * @param {{
   *  user_id: number|string,
   *  shop_name: string,
   *  gst_number: string,
   *  commission_percentage: number|string,
   *  status: string
   * }} data
   */
  create(data) {
    return apiClient.post("/api/seller-profiles", data);
  },

  /**
   * Get seller profile by id
   * @param {number|string} id
   */
  getById(id) {
    return apiClient.get(`/api/seller-profiles/${id}`);
  },

  /**
   * Update seller profile
   * @param {number|string} id
   * @param {Object} data
   */
  update(id, data) {
    return apiClient.put(`/api/seller-profiles/${id}`, data);
  },

  /**
   * Delete seller profile
   * @param {number|string} id
   */
  remove(id) {
    return apiClient.delete(`/api/seller-profiles/${id}`);
  },
};
