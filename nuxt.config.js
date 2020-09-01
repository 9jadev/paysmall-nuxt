import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  generate: {
    fallback: true,
    routes: [
      '/ResetPassword/token',
      '/user/EditInvoice/id'
    ]
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-tel-input',
    {src: '~/plugins/vuelidate', mode: 'client'},
    { src: '~/plugins/vuex-persist', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: 'https://smallpay.herokuapp.com/api',
    baseURL: 'http://127.0.0.1:8000/api',
    // baseURL: 'https://smallpaystage.herokuapp.com/api',
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
          dark: {
            primary: colors.blue.darken2,
            accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3
          }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    transpile: ['vue-tel-input']
  },
  server: {
    port: 3000 
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'accessToken' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get', propertyName: 'user'}
        },
        tokenRequired: true,
        tokenType: 'Bearer',
        autoFetchUser: true
      },
      'laravel.passport': {
        url: 'https://smallpay.herokuapp.com/login',
        client_id: '1',
        client_secret: 'HmJmfSyvie1ASNufrhU9SeTjoRyklCXYKnyMPLnK'
      },
    },
    redirect: {
      login: '/Login',
      logout: '/Login',
      home: '/user'
    },
  },
  env: {
    upload_preset: process.env.upload_preset || 'x62tzib0',
    cloudapi_key: process.env.cloudapi_key || '428216586742493',
    cloudUrl: process.env.cloudUrl || 'https://api.cloudinary.com/v1_1/examqueat/image/upload',
    accountVerify: process.env.accountVerify || 'https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account',
    PBFPubKey: process.env.PBFPubKey || 'FLWPUBK-b40c00896a8507cf67d23e1fe0b7cded-X',
    Backend: process.env.Backend || 'http://127.0.0.1:8000'
  }
}  
