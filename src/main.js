// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Routers from './router.js';
// import VueRouter from 'vue-router';
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.scss'
import './layui/css/layui.css'
import './layui/layui.js'
import ElementUI from 'element-ui'
import store from './store/index'

Vue.use(ElementUI)
// Vue.use(iView);
// Vue.use(VueRouter);
Vue.config.productionTip = false

// router.map(Routers);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
