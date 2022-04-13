<template>
  <ul
    v-if="message"
    class="ant-form-item has-error"
  >
    <template v-if="objectToArray(message).length">
      <li
        v-for="(mess, id) in objectToArray(message)"
        :key="id"
        class="ant-form-explain"
      >
        {{ mess.message[0] }}
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => { }
    }
  },

  methods: {
    /**
     * Convert object to array
     * @param {Object} obj
     *
     * @return {Array}
     */
    objectToArray(obj) {
      const dataArray = []
      let index = 1

      Object.keys(obj).map(key => {
        dataArray.push({
          id: index,
          key,
          message: obj[key]
        })
        index++
      })
      return dataArray
    }
  }
}
</script>

<style lang="scss" scoped>
.has-error {
  padding-left: 8rem !important;
  list-style: disc;
}
</style>
