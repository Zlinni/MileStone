import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router:router,
  store,
  vuetify
}).$mount('#app')
