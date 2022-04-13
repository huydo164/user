<template>
  <a-layout-footer class="layout__footer">
    <a-row
      type="flex"
      :gutter="30"
    >
      <a-col
        :span="24"
        :sm="12"
      >
        <a
          href="https://digidinos.com/"
          target="_blank"
          class="link-company"
        >©Minamoto Consulting Co.,Ltd.</a>
      </a-col>
    </a-row>
  </a-layout-footer>
</template>

<style scoped lang="scss">
.layout__footer {
  background-color: #fff;
  border-top: 1px solid #d8dbe0;
  @include mq(max_xs) {
    text-align: center;
  }
  .col__footer--right {
    text-align: right;
    @include mq(max_xs) {
      text-align: center;
    }
  }
  .link-company {
    color: #4c4c4c;
  }
}
</style>
