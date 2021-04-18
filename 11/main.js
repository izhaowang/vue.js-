import './style.css'// 导入style.css
import Vue from 'vue'; // 导入vue
import VueRouter from 'vue-router'; // 导入vue-router
import Vuex from 'vuex'; // 导入vuex
import App from './app.vue'
// 配置路由规则 1步
const Routers = [
     {
          path: '/index',
          component: resolve => require(['./views/index.vue'], resolve)
     },
     {
          path: '/about',
          component: resolve => require(['./views/about.vue'], resolve)
     },
     {
          path: '*',
          redirect: '/index'
     },
     {
          path: '/user/:id', // 动态路由
          component: resolve  => require(['./views/user.vue'], resolve),
          beforeEnter:(to, from, next) => {
               console.log('路由独享守卫beforeEnter');
               console.log(to);
               console.log(from);
               next()
          }
     }
]
Vue.use(VueRouter); // 使用vue-router插件 2.步
Vue.use(Vuex) // 使用vuex 11.
// 继续在main.js 里完成配置和路由实例：
const RouterConfig = { 
 // 使用HTML5的History模式 3步
     mode: 'history',
     routes: Routers
}
const router  =  new VueRouter(RouterConfig);
// 导航提供了钩子函数
router.beforeEach((to, from, next) => { // 路由改变前的触发钩子
     console.log('路由改变前的触发钩子');
     console.log(to);
     //to 即将要进入目标的路由对象
      // from 导航即将要离开的路由对象
     // 调用next（）后，进入下一个钩子
     next()
})

router.afterEach((to, from, next) => { // 路由改变后的触发钩子
     console.log('路由改变后的触发钩子');
     //to 即将要进入目标的路由对象
      // from 导航即将要离开的路由对象
     // 调用next（）后，进入下一个钩子
})
// 配置vuex 11.
const store = new Vuex.Store({
     // 组件内，store的数据只能读取，不能手动改变， 改变store唯一的方式是显式地提交mutations
     state: {  // 数据,state里面的数据是响应式的， 数据变化时，组件也会立即更新
          count: 0,
          list: [1,2,7,8,34,67]
     },
     mutations: {
          increase(state) {  // 再组件内通过 this.$store.commit('increase')来出发increase方法
               state.count++
          },
          decrease(state) {
               state.count--
          },
          cal(state, params) {
               state.count += params.n;
          }
     },
     getters: { // 将state中的数据进行统一的预处理，
          filterPreList: (state) => {// 再组件中使用$store.getters.filterPreList
               debugger
               return state.list.filter(item => item < 10)
          },
          reversePreList:(state, getters) => {
               debugger
               return getters.filterPreList.reverse();
          }
     },
     actions: { // actions 提交的mutation, 一般用于异步操作
          increase(context) { // 组件中使用$store.dispatch触发
               return new Promise(resolve => {
                    setTimeout( () => {
                         context.commit('increase')
                         resolve()
                    }, 1000)
               })
          }
     }
})
// 创建vue实例
new Vue({
     router, // 4步 然后在package.json中也要配置webpack-dev-server也要配置支持History模式 --history-api-fallback, 最后在app.vue增加路由占位符
     store: store,
     render: h => h(App)
}).$mount(document.getElementById('app'))