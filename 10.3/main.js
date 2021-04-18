import './style.css'// 导入style.css
import Vue from 'vue'; // 导入vue
import App from './app.vue'

// 创建vue实例
new Vue({
     render: h => h(App)
}).$mount(document.getElementById('app'))