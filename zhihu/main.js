import './style.css'// 导入style.css
import Vue from 'vue';
import App from './app.vue';
import './daily/style.css'
require('./daily/data/mock1.js') // 引入mock文档

new Vue({
    el: '#app',
    render: h => h(App)
})