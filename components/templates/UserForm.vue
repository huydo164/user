<template>
  <a-form-model
    ref="form"
    :model="model"
    :rules="formRules"
    class="form__user"
    @submit.prevent="handleSubmit"
  >
    <a-spin :spinning="loading">
      <div class="container__user">
        <div
          v-if="title"
          class="wrapper__logo"
        >
          {{ $t('common.register') }}
        </div>
        <h2
          v-if="title && isConfirmed"
          class="text-center"
        >
          {{ $t('common.confirm_register') }}
        </h2>
        <div class="content__user">
          <table>
            <tbody>
              <tr>
                <td
                  class="form-title"
                  colspan="2"
                >
                  {{ $t('user.company_name') }}
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="company_name">
                    <a-input
                      v-model="model.company_name"
                      :placeholder="$t('user.company_name')"
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
                  colspan="2"
                >
                  {{ $t('user.business_type') }}
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="business_type">
                    <a-select
                      v-model="model.business_type"
                      :placeholder="$t('user.business_type')"
                    >
                      <a-select-option
                        v-for="type in businessTypes"
                        :key="type.id"
                      >
                        {{ type.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ getBusinessType(model.business_type) }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title"
                  colspan="2"
                >
                  {{ $t('user.company_size') }}
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="company_size">
                    <a-select
                      v-model="model.company_size"
                      :placeholder="$t('user.company_size')"
                    >
                      <a-select-option
                        v-for="size in companySizes"
                        :key="size.id"
                      >
                        {{ size.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ getCompanySize(model.company_size) }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title"
                  colspan="2"
                >
                  {{ $t('user.business_stage') }}
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="business_stage">
                    <a-select
                      v-model="model.business_stage"
                      :placeholder="$t('user.business_stage')"
                    >
                      <a-select-option
                        v-for="stage in businessStages"
                        :key="stage.id"
                      >
                        {{ stage.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ getBusinessStage(model.business_stage) }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title"
                  colspan="2"
                >
                  {{ $t('user.founding_date') }}
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="founding_date">
                    <a-date-picker
                      v-model="model.founding_date"
                      show-time
                      mode="date"
                      format="YYYY-MM-DD"
                      :placeholder="$t('user.founding_date')"
                    />
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ model.founding_date }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title-1"
                  rowspan="2"
                >
                  Tax settlement
                </td>
                <td class="form-title-2">
                  Start
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="start_tax_settlement">
                    <a-date-picker
                      v-model="model.start_tax_settlement"
                      show-time
                      format="YYYY-MM-DD"
                      :placeholder="$t('user.start_tax_settlement')"
                    />
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ model.start_tax_settlement }}
                </td>
              </tr>
              <tr>
                <td class="form-title">
                  End
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="end_tax_settlement">
                    <a-date-picker
                      v-model="model.end_tax_settlement"
                      show-time
                      format="YYYY-MM-DD"
                      :placeholder="$t('user.end_tax_settlement')"
                    />
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ model.end_tax_settlement }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title"
                  colspan="2"
                >
                  {{ $t('user.id_login') }}
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="email">
                    <a-input
                      v-model="model.email"
                      :placeholder="$t('user.email')"
                    />
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ model.email }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title"
                  colspan="2"
                >
                  {{ $t('user.password') }}
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="password">
                    <a-input
                      v-model="model.password"
                      type="password"
                      :placeholder="$t('user.password')"
                    />
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ getPassword(model.password) }}
                </td>
              </tr>
              <tr>
                <td
                  class="form-title"
                  colspan="2"
                >
                  {{ $t('user.password_confirm') }}
                </td>
                <td
                  v-if="!isConfirmed"
                  class="form-input"
                >
                  <a-form-model-item prop="password_confirmation">
                    <a-input
                      v-model="model.password_confirmation"
                      type="password"
                      :placeholder="$t('user.password_confirmation')"
                    />
                  </a-form-model-item>
                </td>
                <td
                  v-else
                  class="form-input pl-3"
                >
                  {{ getPassword(model.password_confirmation) }}
                </td>
              </tr>
            </tbody>
          </table>
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
            @click.prevent="confirm"
          >
            {{ $t('common.confirm') }}
          </a-button>
        </div>
        <template v-else>
          <div class="confirmed-return pb-3">
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
          <div class="confirmed-update">
            <a-button
              class="btn-update"
              html-type="submit"
              type="primary"
              size="large"
            >
              {{ $t('common.update') }}
            </a-button>
          </div>
        </template>
      </div>
    </a-spin>
  </a-form-model>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapState } from 'vuex'
import Common from '~/mixins/common'
import DataForm from '~/mixins/data-form'
import { BUSINESS_TYPES, COMPANY_SIZES, BUSINESS_STAGES } from '~/constants/options'

export default {
  mixins: [Common, DataForm],

  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: Object,
      default: () => { }
    }
  },

  data() {
    return {
      businessStages: BUSINESS_STAGES,
      businessTypes: BUSINESS_TYPES,
      companySizes: COMPANY_SIZES,
      isConfirmed: false,
      timer: null,
      resource: 'user'
    }
  },

  computed: {
    ...mapState({
      loading: 'loading'
    }),

    isLoggedIn() {
      return this.$auth.loggedIn
    },

    formRules() {
      return {
        company_name: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('user.company_name') }),
            trigger: ['change', 'blur']
          }
        ],
        business_type: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('user.business_type') }),
            trigger: ['change', 'blur']
          }
        ],
        company_size: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('user.company_size') }),
            trigger: ['change', 'blur']
          }
        ],
        business_stage: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('user.business_stage') }),
            trigger: ['change', 'blur']
          }
        ],
        founding_date: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('user.founding_date') }),
            trigger: ['change', 'blur']
          }
        ],
        start_tax_settlement: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('user.start_tax_settlement') }),
            trigger: ['change', 'blur']
          }
        ],
        end_tax_settlement: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('user.end_tax_settlement') }),
            trigger: ['change', 'blur']
          }
        ],
        email: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('user.email') }),
            trigger: ['change', 'blur']
          },
          {
            type: 'email',
            trigger: ['change', 'blur'],
            message: this.$t('validation.invalid_email')
          },
          {
            asyncValidator: (rule, value, callback) => {
              const validate = async () => {
                try {
                  await this.$api.user.checkEmailUnique({ value, lang: this.$i18n.locale })
                  callback()
                } catch (e) {
                  return callback(this.getErrorMessage(e))
                }
              }
              this.debounce(validate(), 500)
            },
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: !this.isLoggedIn,
            message: this.$t('validation.required', { field: this.$t('user.password') }),
            trigger: ['change', 'blur']
          },
          {
            min: 8,
            trigger: ['change', 'blur'],
            message: this.$t('validation.min', { field: this.$t('user.password'), min: 8 })
          },
          {
            pattern: /^(?=.*[a-z])(?=.*\d)[a-z\d]*$/,
            trigger: ['change', 'blur'],
            message: this.$t('validation.password_combine_lowercase_and_number')
          }
        ],
        password_confirmation: [
          {
            validator: (rule, value, callback) => {
              if (!value && !this.isLoggedIn) {
                callback(new Error(this.$t('validation.required', { field: this.$t('user.password_confirm') })))
              } else if (value !== this.model.password) {
                callback(new Error(this.$t('validation.password_confirm_not_match')))
              } else {
                callback()
              }
            },
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },

  mounted() {
    this.initModel()
  },

  methods: {
    /**
     * Init model data
     */
    initModel() {
      this.$store.dispatch('setLoading', true)

      try {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
        let model = {}
        if (this.$auth.loggedIn) {
          model = cloneDeep(this.$auth.user)
        }
        this.setModel(model)
      } catch (_) {
        this.$notification.error({
          message: this.$t('text.something_wrong')
        })
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    },

    /**
     * Get model
     *
     * @returns {Object}
     */
    getModel() {
      const model = {
        company_name: this.model.company_name,
        business_type: this.model.business_type,
        company_size: this.model.company_size,
        business_stage: this.model.business_stage,
        founding_date: Math.floor(this.model.founding_date.valueOf() / 1000),
        start_tax_settlement: Math.floor(this.model.start_tax_settlement.valueOf() / 1000),
        end_tax_settlement: Math.floor(this.model.end_tax_settlement.valueOf() / 1000),
        email: this.model.email,
        password: this.model.password,
        password_confirmation: this.model.password_confirmation
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
      if (data.id) {
        this.model.founding_date = data.founding_date ? this.$moment.unix(data.founding_date) : ''
        this.model.start_tax_settlement = data.start_tax_settlement ? this.$moment.unix(data.start_tax_settlement) : ''
        this.model.end_tax_settlement = data.end_tax_settlement ? this.$moment.unix(data.end_tax_settlement) : ''
      }
    },

    /**
     * Get business type names
     *
     * @param {Int} type
     */
    getBusinessType(type) {
      if (!type) {
        return ''
      }
      const businessType = this.businessTypes.find(bType => bType.id === type)

      return businessType ? businessType.name : ''
    },

    /**
     * Get company size
     *
     * @param {Int} size
     */
    getCompanySize(size) {
      if (!size) {
        return ''
      }
      const companySize = this.companySizes.find(cSize => cSize.id === size)

      return companySize ? companySize.name : ''
    },

    /**
     * Get business stage names
     *
     * @param {Int} stage
     */
    getBusinessStage(stage) {
      if (!stage) {
        return ''
      }
      const businessStage = this.businessStages.find(bStage => bStage.id === stage)

      return businessStage ? businessStage.name : ''
    },

    /**
     * Convert password to ***
     *
     * @param {String} password
     * @return {String}
     */
    getPassword(password) {
      return password ? '*'.repeat(password.length) : ''
    },

    /**
     * Change to isConfirmed
     */
    confirm(e) {
      this.$store.dispatch('setLoading', true)
      this.$refs.form.validate(valid => {
        this.$store.dispatch('setLoading', false)
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
        if (valid && this.isConfirmed) {
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
.form__user {
  /deep/ {
    width: 100%;
    max-width: 1200px;
    background: #fff;
    margin: auto;
    .has-feedback .ant-form-explain,
    .is-validating .ant-form-explain,
    .has-feedback .ant-form-split,
    .is-validating .ant-form-split {
      color: #f5222d !important;
    }
    .container__user {
      padding-bottom: 30px;
      .wrapper__logo {
        text-align: right;
        font-size: 35px;
        color: #ffab42;
        padding: 30px 0 30px;
      }
    }
    .content__user {
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
        height: 40px;
        border: 1px solid #cccccc;
      }
    }
    .form-title {
      width: 12%;
      text-align: center;
      background-color: #878787;
      color: #fff;
    }
    .form-title-1 {
      width: 13%;
      text-align: center;
      background-color: #878787;
      color: #fff;
    }
    .form-title-2 {
      width: 12%;
      text-align: center;
      background-color: #878787;
      color: #fff;
    }
    .form-input {
      height: 43px;
      width: 84%;
      .ant-select-selection,
      input {
        background-color: #ededed;
        border-color: #747474;
        border-radius: 8px;
      }
    }
    .ant-calendar-picker {
      min-width: 100% !important;
    }
    .ant-form-item {
      margin: 0;
      padding: 0 5px;
    }
    ::placeholder {
      color: #9f9f9f;
    }
    .confirm {
      width: 100px;
      top: -50px;
      position: relative;
      z-index: 2;
      display: flex;
      float: right;
    }
    .confirmed-return {
      float: right;
      top: -100px;
      position: relative;
      z-index: 2;
      width: 100px;
      clear: both;
    }
    .confirmed-update {
      float: right;
      top: -100px;
      position: relative;
      z-index: 2;
      width: 100px;
      clear: both;
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
