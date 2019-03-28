import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import shopper from '@/views/shopping-cart'
import goodsDetail from '@/views/goods-detail'
import shouHuo from '@/views/shouHuo'
import giveTable from '@/views/giveTable'
import myOffer from '@/views/myOffer'
import myAdress from '@/views/myAdress'
import indexPaoWuXian from '@/views/indexPaoWuXian'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      component: index
    },{
      path: '/Shopper',
      // name: 'HelloWorld',
      component: shopper
    },
    {
      path:'/goodsDetail/:id?',
      component: goodsDetail
    },
    {
      path:'/overshopping',
      name: 'overshopping',
      component: shouHuo
    },
    {
      path: '/giveTable',
      name: 'giveTable',
      component: giveTable
    },
    {
      path: '/myOffer',
      name: 'myOffer',
      component: myOffer
    },
    {
      path: '/myAdress',
      name: 'myAdress',
      component: myAdress
    }
  ]
})
