<template>
  <a-form-model
    ref="form"
    :model="this"
    :rules="formRules"
    class="form__login"
    @submit.prevent="handleSubmit"
  >
    <a-spin :spinning="loading">
      <div class="container__logo">
        <div class="content__login p-4">
          <a-form-model-item prop="email">
            <a-input
              v-model="email"
              size="large"
              :placeholder="$t('user.id')"
            />
          </a-form-model-item>

          <a-form-model-item prop="password">
            <a-input
              v-model="password"
              type="password"
              size="large"
              :placeholder="$t('user.password')"
            />
          </a-form-model-item>

          <div
            v-if="message"
            class="ant-form-item has-error"
          >
            <span class="ant-form-explain">{{ message }}</span>
          </div>

          <div class="text-center">
            <a-button
              class="btn-login"
              html-type="submit"
              type="primary"
              size="large"
            >
              {{ $t('common.login') }}
            </a-button>
          </div>
          <div class="text-center mt-2">
            <a
              href="#"
              class="login-guide"
            >
              {{ $t('login.guide') }}
            </a>
          </div>
        </div>
      </div>
    </a-spin>
  </a-form-model>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'guest',

  middleware: 'guest',

  data() {
    return {
      email: '',
      password: '',
      message: ''
    }
  },

  computed: {
    ...mapState({
      loading: 'loading'
    }),

    formRules() {
      return {
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
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('user.password') }),
            trigger: ['change', 'blur']
          },
          {
            min: 8,
            message: this.$t('validation.min', { field: this.$t('user.password'), min: 8 }),
            trigger: ['change', 'blur']
          },
          {
            pattern: /^(?=.*[a-z])(?=.*\d)[a-z\d]*$/,
            trigger: ['change', 'blur'],
            message: this.$t('validation.password_combine_lowercase_and_number')
          }
        ]
      }
    }
  },

  methods: {
    /**
     * Handle submit
     */
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.$store.dispatch('setLoading', true)

          try {
            const credential = {
              email: this.email,
              password: this.password
            }
            await this.$auth.login({ data: credential })
            this.$notification.success({
              message: this.$t('notification.login_success')
            })
            this.message = ''
            this.$router.push({ path: '/' })
          } catch (_) {
            this.$notification.error({
              message: this.$t('notification.error'),
              description: this.$t('notification.login_failed')
            })
            this.message = this.$t('text.some_fields_were_wrong', { field1: this.$t('user.email'), field2: this.$t('user.password') })
          } finally {
            this.$store.dispatch('setLoading', false)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form__login {
  /deep/ {
    width: 100%;
    max-width: 400px;
    background: #fff;
    .container__logo {
      padding-bottom: 30px;
      .wrapper__logo {
        text-align: center;
        background: $primary-color;
        padding: 30px 0 80px;
      }
      .img__logo {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 80px;
        line-height: 1;
        border-radius: 50%;
        margin: auto;
      }
    }
    .content__login {
      position: relative;
      background: #fff;
      border-radius: 6px;
      margin: auto;
      z-index: 2;
    }
    input {
      border-color: #747474;
      border-radius: 8px;
    }
    ::placeholder {
      color: #9f9f9f;
    }
    .btn-login {
      min-width: 140px;
      min-height: 48px;
      border-radius: 8px;
      background-color: #ffaa3f;
      border-color: #ffaa3f;
    }
    .login-guide {
      color: #eb9752;
      font-size: 12px;
    }
  }
}
</style>
