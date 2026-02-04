/**
 * Products API - list, create, update, delete products
 * Uses apiClient from config.js
 */
const productsApi = {
  /**
   * Get all products
   */
  list() {
    return apiClient.get("/api/products");
  },

  /**
   * Create a new product
   * @param {{
   * seller_id:number,
   * category_id:number,
   * name:string,
   * description:string,
   * price:number,
   * stock:number,
   * status:boolean
   * }} data
   */
  create(data) {
    return apiClient.post("/api/products", data);
  },

  /**
   * Get product by id
   * @param {number|string} id
   */
  getById(id) {
    return apiClient.get(`/api/products/${id}`);
  },

  /**
   * Update product
   * @param {number|string} id
   */
  update(id, data) {
    return apiClient.put(`/api/products/${id}`, data);
  },

  /**
   * Delete product
   * @param {number|string} id
   */
  remove(id) {
    return apiClient.delete(`/api/products/${id}`);
  },
};
