<template>
  <user-form
    :message="message"
    :title="$t('common.register')"
    @submit="handleSubmit"
  />
</template>

<script>
import UserForm from '~/components/templates/UserForm.vue'

export default {
  layout: 'guest',

  components: {
    UserForm
  },

  middleware: 'guest',

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
      try {
        await this.$api.user.register(data)
        this.$notification.success({
          message: this.$t('notification.register_success')
        })
        this.message = {}
        this.$router.push({ path: '/' })
      } catch (e) {
        this.$notification.error({
          message: this.$t('notification.error'),
          description: this.$t('notification.register_failed')
        })
        this.message = e.response.data.errors ?? {}
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
</script>
