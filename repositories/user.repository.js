export default $axios => ({
  resource: 'user',

  /**
   * Register a new member
   *
   * @param {Object} data
   * @returns {Object}
   */
  register(data) {
    return $axios.post('/register', data)
  },

  /**
   * Update user profile
   *
   * @param {Object} data
   * @returns {Object}
   */
  updateProfile(data) {
    return $axios.post('/me', data)
  },

  /**
   * Send contact email
   *
   * @param {Object} data
   * @returns {Object}
   */
  sendContact(data) {
    return $axios.post('/send-contact', data)
  },

  /**
   * Check email unique
   *
   * @param {Object} data
   */

  checkEmailUnique(data) {
    return $axios.post('/check-email', data)
  }
})
