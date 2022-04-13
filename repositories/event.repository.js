export default $axios => ({
  resource: 'event',

  /**
   * download file pdf
   */
  downloadPdf(id) {
    return $axios.get(`/download-event/${id}`, { responseType: 'blob' })
  },

  /**
   * update status event
   * @param {Number} id
   * @returns {Object}
   */
  updateStatus(id) {
    return $axios.post(`/event/${id}/set-success`)
  }
})
