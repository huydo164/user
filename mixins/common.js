export default {
  methods: {
    /**
     * Debounce trigger method
     */
    debounce(fn, ms) {
      let timer

      // eslint-disable-next-line space-before-function-paren
      return function () {
        const args = arguments
        const context = this

        if (timer) { clearTimeout(timer) }

        timer = setTimeout(() => {
          fn.apply(context, args)
          clearTimeout(timer)
        }, ms)
      }
    },

    /**
     * Get error message
     *
     * @param {Error} e
     * @returns {Error}
     */
    getErrorMessage(e) {
      let message = this.$t('text.something_wrong')
      const errors = e?.response?.data?.errors
      if (errors && typeof errors === 'object' && Object.entries(errors).length) {
        // eslint-disable-next-line no-unused-vars
        const [key, value] = Object.entries(errors)[0]
        message = value
      }
      return new Error(message)
    }
  }
}
