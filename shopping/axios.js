import axios from 'axios'

// 创建一个axios的对象
const instance = axios.create({
  baseURL: 'http://localhost:8888', // 会再发送请求的	时候拼接在url参数面前
  timeout: 5000
})
// 请求拦截,所有的网络请求都会先走这个方法
// 我们可以添加自定义的内容[和服务器商议]
instance.interceptors.request.use(function(config) {
    console.log(1,config)
    return config;
}, function(err) {
  return Promise.reject(err);
});
//响应拦截，所有网络请求返回数据之后都会限制性此方法
// 可以根据服务器的返回状态码做相应的处理
instance.interceptors.response.use(function(response) {
  return response;
}, function(err) {
  return Promise.reject(err);
});

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params
    ).then(response => {
        resolve(response)
    }).catch((error) => {
        reject(error)
    })
  })
}