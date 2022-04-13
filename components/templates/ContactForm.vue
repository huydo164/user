<template>
  <a-form-model
    ref="form"
    :model="model"
    :rules="formRules"
    class="form__contact"
    @submit.prevent="handleSubmit"
  >
    <a-spin :spinning="loading">
      <div class="container__contact">
        <h2 v-if="isConfirmed" class="text-center">
          {{ $t('common.confirm_send') }}
        </h2>
        <div class="content__contact">
          <table>
            <tbody>
              <tr>
                <td
                  class="form-title"
                >
                  {{ $t('contact.company_name') }}
                  <span v-if="!isConfirmed">※</span>
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="company_name">
                    <a-input
                      v-model="model.company_name"
                      :placeholder="$t('contact.company_name')"
                    />
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ model.company_name }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title"
                >
                  {{ $t('contact.sender_name') }}
                  <span v-if="!isConfirmed">※</span>
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="sender_name">
                    <a-input
                      v-model="model.sender_name"
                      :placeholder="$t('contact.sender_name')"
                    />
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ model.sender_name }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title"
                >
                  {{ $t('contact.sender_email') }}
                  <span v-if="!isConfirmed">※</span>
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="sender_email">
                    <a-input
                      v-model="model.sender_email"
                      :placeholder="$t('contact.sender_email')"
                    />
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ model.sender_email }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title"
                >
                  {{ $t('contact.category') }}
                  <span v-if="!isConfirmed">※</span>
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="category">
                    <a-select
                      v-model="model.category"
                      :placeholder="$t('contact.category')"
                    >
                      <a-select-option
                        v-for="category in categories"
                        :key="category.id"
                      >
                        {{ category.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ getCategoryName(model.category) }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title"
                >
                  {{ $t('contact.title') }}
                  <span v-if="!isConfirmed">※</span>
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="title">
                    <a-select
                      v-model="model.title"
                      :placeholder="$t('contact.title')"
                    >
                      <a-select-option
                        v-for="title in titles"
                        :key="title.id"
                      >
                        {{ title.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ getTitleName(model.title) }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title"
                >
                  {{ $t('contact.detail') }}
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="detail">
                    <a-input
                      v-model="model.detail"
                      :placeholder="$t('contact.detail')"
                    />
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ model.detail }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-if="message"
          class="ant-form-item has-error"
        >
          <span class="ant-form-explain">{{ message }}</span>
        </div>

        <div
          v-if="!isConfirmed"
          class="confirm"
        >
          <a-button
            class="btn-confirm"
            html-type="button"
            type="primary"
            size="large"
            @click="confirm"
          >
            {{ $t('common.confirm') }}
          </a-button>
        </div>
        <template v-else>
          <div class="confirm">
            <div class="confirmed-update">
              <a-button
                class="btn-update mr-4"
                html-type="submit"
                type="primary"
                size="large"
              >
                {{ $t('common.send') }}
              </a-button>
              <a-button
                class="btn-return"
                html-type="button"
                type="primary"
                size="large"
                @click="notConfirm"
              >
                {{ $t('common.return') }}
              </a-button>
            </div>
          </div>
        </template>
      </div>
    </a-spin>
  </a-form-model>
</template>

<script>
import { mapState } from 'vuex'
import DataForm from '~/mixins/data-form'
import { CATEGORIES, TITLES } from '~/constants/options'

export default {
  mixins: [DataForm],

  props: {
    message: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      categories: CATEGORIES,
      titles: TITLES,
      isConfirmed: false,
      resource: 'user'
    }
  },

  computed: {
    ...mapState({
      loading: 'loading'
    }),

    formRules() {
      return {
        company_name: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('contact.company_name') }),
            trigger: ['change', 'blur']
          }
        ],
        sender_name: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('contact.sender_name') }),
            trigger: ['change', 'blur']
          }
        ],
        sender_email: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('contact.sender_email') }),
            trigger: ['change', 'blur']
          },
          {
            type: 'email',
            message: this.$t('validation.invalid_email'),
            trigger: ['change', 'blur']
          }
        ],
        category: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('contact.category') }),
            trigger: ['change', 'blur']
          }
        ],
        title: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('contact.title') }),
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },

  methods: {
    /**
     * Get model
     *
     * @returns {Object}
     */
    getModel() {
      const model = {
        company_name: this.model.company_name,
        sender_name: this.model.sender_name,
        sender_email: this.model.sender_email,
        category: this.model.category,
        title: this.model.title,
        detail: this.model.detail
      }

      return model
    },

    /**
     * Set model
     *
     * @param {Object} data
     */
    setModel(data) {
      this.model = data
    },

    /**
     * Get category names
     *
     * @param {Int} category
     */
    getCategoryName(categoryId) {
      if (!categoryId) {
        return ''
      }
      const category = this.categories.find(item => item.id === categoryId)

      return category ? category.name : ''
    },

    /**
     * Get title names
     *
     * @param {Int} title
     */
    getTitleName(titleId) {
      if (!titleId) {
        return ''
      }
      const title = this.categories.find(item => item.id === titleId)

      return title ? title.name : ''
    },

    /**
     * Change to isConfirmed
     */
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isConfirmed = true
        }
      })
    },

    /**
     * Change isConfirmed to haven't been confirmed
     */
    notConfirm() {
      this.isConfirmed = false
    },

    /**
     * Handle submit
     */
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('setLoading', true)
          const data = this.getModel()

          this.$emit('submit', data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form__contact {
  /deep/ {
    width: 100%;
    max-width: 1200px;
    background: #fff;
    margin: auto;
    .container__contact {
      padding-bottom: 30px;
      .wrapper__logo {
        text-align: right;
        font-size: 35px;
        color: #ffab42;
        padding: 30px 0 30px;
      }
    }
    .content__contact {
      position: relative;
      background: #fff;
      border-radius: 6px;
      margin: auto;
      z-index: 2;
      padding: 1.5rem 8rem;
    }
    table {
      width: 100%;
      td {
        height: 60px;
        border: 1px solid #cccccc;
      }
    }
    .form-title {
      width: 25%;
      text-align: center;
      background-color: #878787;
      color: #fff;
    }
    .form-input {
      height: 70px;
      .ant-select-selection,
      input {
        background-color: #ededed;
        border-color: #747474;
        border-radius: 8px;
        min-height: 50px;
      }
    }
    .ant-form-item {
      margin: 0;
      padding: 0 5px;
    }
    ::placeholder {
      color: #9f9f9f;
    }
    .confirm {
      text-align: center;
    }
    .btn-return {
      min-width: 100px;
      min-height: 40px;
      border-radius: 8px;
      background-color: #ff0000;
      border-color: #ff0000;
    }
    .btn-update {
      min-width: 100px;
      min-height: 40px;
      border-radius: 8px;
      background-color: #0f0;
      border-color: #0f0;
    }
    .btn-confirm {
      min-width: 100px;
      min-height: 40px;
      border-radius: 8px;
      background-color: #878787;
      border-color: #878787;
    }
    .login-guide {
      color: #eb9752;
      font-size: 12px;
    }
    .ant-select-selection__placeholder {
      color: #9f9f9f;
    }
  }
}
</style>
