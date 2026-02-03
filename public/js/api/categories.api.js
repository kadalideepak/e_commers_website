/**
 * Categories API - list, create, update, delete categories
 * Uses apiClient from config.js
 */
const categoriesApi = {
  /**
   * Get all categories
   * @returns {Promise<Array<{id:number,name:string,is_active:boolean}>>}
   */
  list() {
    return apiClient.get("/api/categories");
  },

  /**
   * Create a new category
   * @param {{name: string, is_active: boolean}} data
   * @returns {Promise<any>}
   */
  create(data) {
    return apiClient.post("/api/categories", data);
  },

  /**
   * Get a single category by id
   * @param {number|string} id
   */
  getById(id) {
    return apiClient.get(`/api/categories/${id}`);
  },

  /**
   * Update a category
   * @param {number|string} id
   * @param {{name: string, is_active: boolean}} data
   */
  update(id, data) {
    return apiClient.put(`/api/categories/${id}`, data);
  },

  /**
   * Delete a category
   * @param {number|string} id
   */
  remove(id) {
    return apiClient.delete(`/api/categories/${id}`);
  },
};

