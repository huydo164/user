import icons from './constants/icons'
import { ACCESS_TOKEN_MAX_AGE } from './constants/cookies'

require('dotenv').config()

export default {
  // Mode: https://nuxtjs.org/api/configuration-mode
  mode: 'spa',

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Taskebito',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Taskebito' },
      { name: 'og:title', content: 'Taskebito' },
      { name: 'og:site_name', content: 'Taskebito' },
      { name: 'og:description', content: 'Taskebito' },
      { name: 'apple-mobile-web-app-title', content: 'Taskebito' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/less/theme.less', lang: 'less' },
    { src: '~/assets/scss/style.scss', lang: 'scss' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/antd',
    '~/plugins/api',
    '~/plugins/filter'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment'
  ],

  // Fontawesome configuration: https://go.nuxtjs.dev/pwa
  fontawesome: {
    icons
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://auth.nuxtjs.org
    '@nuxtjs/auth',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // https://i18n.nuxtjs.org
    '@nuxtjs/i18n',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
    'cookie-universal-nuxt'
  ],

  // Auth module configuration: https://auth.nuxtjs.org
  auth: {
    localStorage: false,
    redirect: {
      login: '/login',
      logout: '/login',
      home: false
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'access_token' },
          user: { url: '/me', method: 'get', propertyName: 'data' },
          logout: { url: '/logout', method: 'post' }
        }
      }
    },
    cookie: {
      options: {
        maxAge: ACCESS_TOKEN_MAX_AGE
      }
    },
    plugins: [
      '~/plugins/api.js'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL
  },

  // i18n module configuration: https://i18n.nuxtjs.org/
  i18n: {
    locales: [
      { code: 'ja', iso: 'ja-JP' },
      { code: 'en', iso: 'en-US' }
    ],
    defaultLocale: 'ja',
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'ja',
      messages: {
        ja: require('./assets/locales/ja.json'),
        en: require('./assets/locales/en.json')
      },
      silentTranslationWarn: true
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Style resources module configuration: https://github.com/nuxt-community/style-resources-module#readme
  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_mixins.scss'
    ]
  }
}
