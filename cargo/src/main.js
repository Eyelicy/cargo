import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { server } from './providers/http-service';
import axios from 'axios'
import qs from 'qs';

axios.defaults.withCredentials=true;

Vue.prototype.bus = new Vue;
Vue.prototype.$qs=qs;
Vue.prototype.$http = axios;
Vue.prototype.$server = server;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
