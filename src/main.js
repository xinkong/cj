import { createApp } from 'vue'
import './style.css'
import 'vant/lib/index.css'
import 'lib-flexible'
import router from "./routes"
import request from "./utils/request";
import App from './App.vue'
//控制引入FastClick后input点击迟钝问题
import FastClick from "fastclick"
/*****main.js****/
import VueCountryIntl from 'vue-country-intl';
// 引入css
import 'vue-country-intl/lib/vue-country-intl.css'

// import { initializeApp } from 'firebase/app';
//
// const firebaseConfig = {
//   apiKey: "AIzaSyASpPTPsvWyAu5zjT9TV7GzE5fCjoNx25Q",
//   authDomain: "drawbox-a10a7.firebaseapp.com",
//   projectId: "drawbox-a10a7",
//   storageBucket: "drawbox-a10a7.appspot.com",
//   messagingSenderId: "389872188801",
//   appId: "1:389872188801:web:300bf2f6967eab2316bc80",
//   measurementId: "G-EW1XY1XXPR"
// };
//
// const firebase = initializeApp(firebaseConfig);
const app = createApp(App)

// 全局注册组件

app.use(router).mount('#app')

app.config.globalProperties.$request = request;

app.component('vue-country-intl', VueCountryIntl);

FastClick.prototype.focus = (targetElement) => {
  let length
  if (
    targetElement.setSelectionRange &&
    targetElement.type.indexOf("date") !== 0 &&
    targetElement.type !== "time" &&
    targetElement.type !== "month"
  ) {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  }
}
