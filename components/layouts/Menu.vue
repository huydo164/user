<template>
  <div class="menu">
    <a-menu
      mode="horizontal"
      :selected-keys="selectedKeys"
      :default-open-keys="selectedKeys"
    >
      <template v-for="item in menu">
        <a-menu-item
          v-if="!item.menus.length"
          :key="item.id"
        >
          <menu-item :item="item" />
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>
<script>
import trim from 'lodash/trim'
import MenuItem from '~/components/molecules/MenuItem'
export default {
  components: {
    MenuItem
  },

  data: () => ({
    menu: [
      {
        icon: 'home',
        id: 0,
        link: '/',
        menus: [],
        parent_id: 0,
        position: 0,
        title: 'common.home'
      },
      {
        icon: 'edit',
        id: 1,
        link: '/event',
        menus: [],
        parent_id: 0,
        position: 1,
        title: 'common.event'
      },
      {
        icon: 'bell',
        id: 2,
        link: '/notification',
        menus: [],
        parent_id: 0,
        position: 2,
        title: 'common.message'
      },
      {
        icon: 'user',
        id: 3,
        link: '/contact',
        menus: [],
        parent_id: 0,
        position: 3,
        title: 'common.contact'
      },
      {
        icon: 'cog',
        id: 4,
        link: '/setting',
        menus: [],
        parent_id: 0,
        position: 4,
        title: 'common.setting'
      }
    ]
  }),

  computed: {
    selectedKeys() {
      const selectedKeys = []
      const deepFind = (menu, parent = null) => {
        menu.forEach(item => {
          if (trim(item.link, '/') === trim(this.$route.path, '/')) {
            if (parent) {
              selectedKeys.push(parent.id)
            }
            selectedKeys.push(item.id)
          }
          if (item.menus) {
            deepFind(item.menus, item)
          }
        })
      }
      deepFind(this.menu)
      return selectedKeys
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  border-bottom: 2px solid #fbac3c;

  ul {
    .ant-menu-item-selected,
    .ant-menu-item-active {
      border-bottom: 2px solid #fbac3c !important;

      a {
        color: #4c4c4c;
      }
    }
  }
}
</style>
