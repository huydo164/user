<template>
  <a-layout-header>
    <div class="header--left" />

    <div class="header--right pr-4">
      <ul>
        <li>
          {{ $t('common.plan') }}
          {{ startTaxSettlement | date }}
          ~
          {{ endTaxSettlement | date }}
        </li>
        <li>{{ $t('common.joint_stock_company') }} {{ companyName }}</li>
        <li>{{ email }}</li>
        <li>
          <a
            href="javascript:void(0)"
            @click="logout()"
          >
            {{ $t('common.logout') }}
          </a>
        </li>
      </ul>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  computed: {
    /**
     * @return {String}
     */
    companyName() {
      return this.$auth?.user?.company_name
    },

    /**
     * @return {String}
     */
    email() {
      return this.$auth?.user?.email
    },

    /**
     * @return {Number}
     */
    startTaxSettlement() {
      return (this.$auth?.user?.start_tax_settlement || 0) * 1000
    },

    /**
     * @return {Number}
     */
    endTaxSettlement() {
      return (this.$auth?.user?.end_tax_settlement || 0) * 1000
    }
  },

  methods: {
    /**
     * Logout user
     */
    async logout() {
      this.$store.dispatch('setLoading', true)

      try {
        await this.$auth.logout()
      } catch (_) {
        this.$notification.error({
          message: this.$t('text.something_wrong')
        })
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.dropdown__locale {
  min-width: 50px;
  .ant-dropdown-menu {
    border: 1px solid #d8dbe0;
  }
  .ant-dropdown-menu-item {
    text-align: center;
  }
}

.dropdown__account {
  min-width: 160px;
  .ant-dropdown-menu {
    border: 1px solid #d8dbe0;
    padding-top: 0;
  }
}

.menu__profile {
  background: #ebedef;
  text-align: center;
  cursor: default;
  pointer-events: none;
}

.ant-layout-header {
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
  background: #fff;
  padding: 0;
  .header--left {
    display: flex;
    align-items: center;
  }
  .btn__header--collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    padding: 0 24px;
    cursor: pointer;
    color: #4c4c4c;
    transition: all 0.4s ease;
    &:hover {
      color: $primary-color;
    }
  }
  .header--right {
    display: flex;
    align-items: center;
    > * {
      margin-left: 10px;
    }
    ul {
      display: flex;
      margin-left: 0px;

      li {
        padding: 0px 10px;
        border-right: 1px solid;
        line-height: 12px;

        a {
          color: #4c4c4c;
        }
      }
      li:last-child {
        border-right: none;
      }
    }
  }
}
</style>
