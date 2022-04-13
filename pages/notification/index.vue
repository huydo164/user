<template>
  <div class="notification__container">
    <div
      v-for="notification in listNotifications"
      :key="notification.id"
      class="notification-item"
    >
      <nuxt-link :to="getLinkDetail(notification.id)">
        <a-row>
          <a-col :span="3">
            {{ notification.created_at | date }}
          </a-col>
          <a-col :span="21">
            {{ notification.title }}
          </a-col>
        </a-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    listNotifications() {
      return this.$auth.user.notifications
    }
  },

  methods: {
    /**
     * Get link detail notification
     */
    getLinkDetail(id) {
      return '/notification/' + id
    }
  }
}
</script>

<style lang="scss" scoped>
.notification__container {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background: #fff;
  .notification-item {
    padding-top: 20px;
    a {
      color: #000;
      font-size: 20px;
    }
    &:hover {
      .ant-col {
        color: #ffaa3f !important;
        text-decoration: underline;
      }
    }
  }
}
</style>
