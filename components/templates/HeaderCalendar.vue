<template>
  <div class="cal-header">
    <button
      class="btn-arrow"
      type="button"
      @click="previousMonth()"
    >
      <a-icon type="double-left" />
    </button>
    {{ String(year) + $t('common.year') }}{{ String(month + 1) + $t('common.month') }}
    <button
      class="btn-arrow"
      type="button"
      @click="nextMonth()"
    >
      <a-icon type="double-right" />
    </button>
  </div>
</template>
<script>
export default {
  props: {
    month: {
      type: Number,
      default: 0
    },
    year: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      currentMonth: this.month
    }
  },

  watch: {
    month() {
      this.currentMonth = this.month
    }
  },

  methods: {
    previousMonth() {
      this.updateMonth(--this.currentMonth)
    },

    nextMonth() {
      this.updateMonth(++this.currentMonth)
    },

    updateMonth(month) {
      this.$emit('update-month', month)
    }
  }
}
</script>

<style lang="scss" scoped>
.cal-header {
  padding: 10px;
  font-size: 24px;
}
.btn-arrow {
  border: none;
  background: 000;
  font-weight: 900;
  &:hover {
    cursor: pointer;
  }
}
</style>
