import { createApp } from 'vue'
import './style.css'
import 'vant/lib/index.css'
import 'lib-flexible'
import router from "./routes"
import request from "./utils/request";
import App from './App.vue'
//控制引入FastClick后input点击迟钝问题
import FastClick from "fastclick"

const app = createApp(App)

app.use(router).mount('#app')

app.config.globalProperties.$request = request;

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