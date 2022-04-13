<template>
  <div class="notification__container">
    <div
      v-if="notification && notification.id"
      class="notification-item"
    >
      <a-row class="title">
        <a-col :span="3">
          {{ notification.created_at | date }}
        </a-col>
        <a-col :span="21">
          {{ notification.title }}
        </a-col>
      </a-row>
      <p class="content">
        {{ notification.content }}
      </p>
    </div>
    <div class="notification-close">
      <button
        class="btn-close"
        @click="goBack()"
      >
        {{ $t('common.close') }}
      </button>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    notification() {
      const id = parseInt(this.$route.params.id)
      return this.$auth.user.notifications.find(item => item.id === id)
    }
  },

  methods: {
    /**
     * Go back to previous notification list
     */
    goBack() {
      this.$router.go(-1)
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
    color: #000;
    font-size: 20px;
    .title {
      color: #ffaa3f !important;
      text-decoration: underline;
    }
    .content {
      padding-top: 50px;
    }
  }

  .notification-close {
    text-align: right;
    bottom: 100px;
    position: absolute;
    right: 111px;
  }
  .btn-close {
    color: #fff;
    min-width: 100px;
    min-height: 40px;
    border: none;
    border-radius: 8px;
    background-color: #878787;
    border-color: #878787;
  }
}
</style>
