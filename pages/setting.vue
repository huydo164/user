<template>
  <user-form
    :message="message"
    @submit="handleSubmit"
  />
</template>

<script>
import UserForm from '~/components/templates/UserForm.vue'

export default {
  components: {
    UserForm
  },

  data() {
    return {
      message: {}
    }
  },

  methods: {
    /**
     * Handle submit
     */
    async handleSubmit(data) {
      this.$store.dispatch('setLoading', true)

      try {
        await this.$api.user.updateProfile(data)
        this.$notification.success({
          message: this.$t('notification.update_setting_success')
        })
        this.message = {}
        this.$router.push({ path: '/' })
      } catch (e) {
        this.$notification.error({
          message: this.$t('notification.error'),
          description: this.$t('notification.update_setting_failed')
        })
        this.message = e.response.data.errors ?? {}
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
</script>
