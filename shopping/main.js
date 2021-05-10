import './style.css'// 导入style.css
import Vue from 'vue'; // 导入vue
import App from './app.vue'
import VueRouter from 'vue-router';
import Vuex from 'vuex';
require('./mock.js');
import {get} from './axios.js'
Vue.use(VueRouter);
Vue.use(Vuex);

get('/plist', {}).then(res => {
     console.log(res.data)
});
const Routers = [
     {
          path: '/list',
          component: resolve => require(['./view/list.vue'], resolve),
          meta: {
               title: '商品列表'
          }
     },
     {
          path:'/product/:id',
          meta: {
               title: '商品详情'
          },
          component: resolve => require(['./view/product.vue'], resolve)
     },
     {
          path: '/cart',
          meta: {
               title: '购物车'
          },
          component: resolve => require(['./view/cart.vue'], resolve)
     },
     {
          path: '*',
          redirect: '/list'
     }
]
const RouterConfig = {
     mode: 'history',
     routes: Routers
}
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
     window.document.title = to.meta.title;
     next()
})
router.afterEach((to, from, next) => {
     window.scrollTo(0, 0);
})

const store = new Vuex.Store({
     state: {
          productList: [], // 商品列表数据
          cartList: [], // 购物车数据
     },
     getters: {
          // 用map方法过滤出brands 和 color 然后通过 getFilterArray 去重

          brands(state) {
               const brands = state.productList.map(item => item.brand);
               return getFilterArray(brands)
          },
          colors: (state) => {
               const colors = state.productList.map(item => item.color);
               return getFilterArray(colors)
          }
     },
     mutations: {
          setProductList(state, data) {
               state.productList = data
          },
          addCart(state, id) {
               // 先判断购物车是否已有，如果有数量+1
               const isAdded = state.cartList.find(item => item.id === id)
               if(isAdded){
                    state.cartList.forEach(item => {
                         if(item.id === isAdded.id) {
                              item.count ++
                         }
                    })
               } else {
                    state.cartList.push({
                         id: id,
                         count: 1
                    })
               }
          },
          editCartCount(state, payload) {
               const product = state.cartList.find(item => item.id === payload.id)
               product.count += payload.count
          },
          // 删除商品
          deleteCart(state, id) {
               // findIndex 返回第一个匹配到的索引
               const index = state.cartList.findIndex(item => item.id === id)
               state.cartList.splice(index, 1)
          },
     },
     actions: {
          getProductList(context) {
               get('/plist', {}).then(res => {
                    context.commit('setProductList', res.data)
               });
          },
     }
})
// 数组排重
function getFilterArray(array) {
     const res = [];
     const json = {};
     for(let i = 0; i<array.length; i++) {
          const _self = array[i]
          if(!json[_self]){
               res.push(_self);
               json[_self] = 1; // 存在的都是1
          }
     }
     return res;
}
// 创建vue实例
new Vue({
     router: router,
     store: store,
     render: h => h(App)
}).$mount(document.getElementById('app'))