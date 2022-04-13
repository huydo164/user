export default {

  methods: {

    /**
     * Download file
     *
     * @param {Object} data
     * @param {String} type
     * @param {String} name
     */
    downloadFile: ({ data, type, name }) => {
      if (!process.client) {
        return
      }
      const blob = new Blob([data], { type })
      const element = window.document.createElement('a')
      element.href = window.URL.createObjectURL(blob)
      element.download = name
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      window.URL.revokeObjectURL(blob)
    }
  }
}
