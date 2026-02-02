/**
 * Auth API - login, signup, etc.
 * Uses apiClient from config.js
 */
const authApi = {
  /**
   * Login with email and password
   * @param {Object} credentials - { email, password }
   * @returns {Promise<{ message, token, user }>}
   */
  login(credentials) {
    return apiClient.post("/api/auth/login", credentials);
  },

  /**
   * Signup (register) - optional for future use
   * @param {Object} data - { name, email, password, role }
   */
  signup(data) {
    return apiClient.post("/api/auth/signup", data);
  },
};
