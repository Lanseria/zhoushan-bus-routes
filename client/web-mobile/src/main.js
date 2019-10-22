import Vue from 'vue'
import App from './App'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import router from './router'
import '@/common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('@/common/image/default.png'),
  lazyComponent: true
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})