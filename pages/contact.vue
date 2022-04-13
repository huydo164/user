<template>
  <contact-form
    :message="message"
    @submit="handleSubmit"
  />
</template>

<script>
import ContactForm from '~/components/templates/ContactForm.vue'

export default {
  components: {
    ContactForm
  },

  data() {
    return {
      message: ''
    }
  },

  methods: {
    /**
     * Handle submit
     */
    async handleSubmit(data) {
      try {
        this.message = ''
        await this.$api.user.sendContact(data)
        this.$notification.success({
          message: this.$t('notification.send_contact_success'),
          description: this.$t('notification.send_contact_success2')
        })
      } catch (e) {
        this.$notification.error({
          message: this.$t('notification.error'),
          description: this.$t('notification.send_contact_failed')
        })
        this.message = e.response.data.message
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
</script>
