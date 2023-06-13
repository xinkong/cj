import axios from "axios";
import { showToast, showLoadingToast, closeToast } from 'vant'

console.log('NODE_ENV:', process.env.NODE_ENV);

// 判断环境
const BASEURL = process.env.NODE_ENV === 'production' ? 'https://boxservice.manghehe.com' : '/api';

const config = {
  baseURL: BASEURL,
  timeout: 6 * 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': ''
  },
  showLoading: true //默认显示
};

const request = axios.create(config);

request.defaults.headers.post['Content-Type'] = 'application/json';

request.interceptors.request.use(req => {
  // console.log('req:', req);
  const token = window.localStorage.getItem('accessToken') ? "Bearer " + window.localStorage.getItem('accessToken') : ''
  req.headers.Authorization = token
  req.headers.version = "EN"
  if(req?.showLoading) {
    showLoadingToast({
      message: 'Loading...',
      forbidClick: true,
    })
  }
  return req;
}, function (error) {
  return Promise.reject(error)
})


// http response 拦截器
request.interceptors.response.use(
  res => {
    // console.log('res:', res)
    const { data } = res
    //拦截响应，做统一处理
    const { code, message } = data || {}
    switch (code) {
      case 1002:
        showToast(message)
        console.log('token异常');
        return data;
      case 1005:
        showToast(message)
        console.log('登录过期'); //未登录未创建
        return data;
      case 0:
        console.log('success')
        closeToast()
        return data;
      default:
        showToast(message)
    }
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    closeToast()
    return Promise.reject(error) // 返回接口返回的错误信息
  })


//封装下post
request.post = function(url,params){
  return new Promise((resolve, reject) => {
    // console.log("****************************");
    axios({
      method: 'post',
      url: config.baseURL + url,
      params,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).then(response => {
      if (response.status === 200) {
        //根据实际情况进行更改
        resolve(response)
      } else {
        showToast(response.message)
        reject(response)
      }
    })
  })
}

export default request;
