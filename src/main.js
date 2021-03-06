import Vue from 'vue'
import helper from './helper'
global.helper = helper

import config from './config'

import store from './store/'
global.store = store

import router from './router'
import i18n from './i18n/'
import menu from './menu'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import './http'

import 'vuetify/src/stylus/main.styl'
import 'src/styles/main.styl'

import App from './App.vue'

import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: config.locale,
  locales: {
    'en': require('vue-timeago/locales/en-US.json'),
    [config.locale]: require(`vue-timeago/locales/${config.locale}.json`),
  }
})

import Dropzone from 'vue2-dropzone'
import VueQuillEditor from 'vue-quill-editor'
import validator from 'indicative'
global.validator = validator
Vue.use(VueQuillEditor)
Vue.component('dropzone', Dropzone)

import VForm from './components/Form.vue'
import VGrid from './components/Grid.vue'

// import Modal from './components/Modal'
// Vue.use(Modal)


Vue.component('v-form', VForm)
Vue.component('v-grid', VGrid)

new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App),
  mounted() {

  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
  created() {
    // this.$http.get('/users/1').then(({data}) => console.log(data))
    global.$t = this.$t
    this.$store.commit('setMenu', menu)
    this.$store.dispatch('checkPageTitle', this.$route.path)
    this.$store.dispatch('checkAuth')


  }
});