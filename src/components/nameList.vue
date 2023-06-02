<template>
  <div class="list-container">
    <div :class="list.length ? 'marquee' : ''" id="carList">
      <template v-for="(item, index) in list" :key="index">
        <div class="list-item">
          <div class="item-time van-ellipsis">{{ item.createTimeStr }}</div>
          <div class="item-name van-ellipsis">{{ item.nick }}</div>
          <div class="item-goods van-ellipsis">
            抽中了 <span class="goods-name">{{ item.goodsName }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import API from "../utils/api";
export default {
  data(){
    return {
      list: [],
      timer: null
    }
  },
  mounted() {
    this.getData()
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods:{
    // 获取信息
    async getData() {
      this.list = []
      try {
        const { code, data } = await this.$request({
          url: API.getWinInfo,
          method: 'post'
        })
        if (code === 0) {
          this.list = (data || []).map(item => {
            const { createTime, ...other } = item
            return {
              createTimeStr: this.processingTime(createTime),
              createTime,
              ...other
            }
          })
          if(this.list.length < 10) {
            this.list = this.list.concat(this.list);
          }
        }
      } finally {
        if(this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getData()
        }, 1000 * 60 * 2)
      }
    },
    processingTime(dateTimeStamp){   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
      var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
      var hour = minute * 60;
      var day = hour * 24;
      var week = day * 7;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();   //获取当前时间毫秒
      // console.log(now)
      var diffValue = now - dateTimeStamp;//时间差
      let result=""
      if(diffValue < 0){
        return;
      }
      var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
      var hourC = diffValue/hour;
      var dayC = diffValue/day;
      var weekC = diffValue/week;
      var monthC = diffValue/month;
      if(monthC >= 1 && monthC <= 3){
        result = " " + parseInt(monthC) + "月前"
      }else if(weekC >= 1 && weekC <= 3){
        result = " " + parseInt(weekC) + "周前"
      }else if(dayC >= 1 && dayC <= 6){
        result = " " + parseInt(dayC) + "天前"
      }else if(hourC >= 1 && hourC <= 23){
        result = " " + parseInt(hourC) + "小时前"
      }else if(minC >= 1 && minC <= 59){
        result =" " + parseInt(minC) + "分钟前"
      }else if(diffValue >= 0 && diffValue <= minute){
        result = "刚刚"
      }else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate
      }
      return result;
    }
  }
}
</script>
<style lang="scss" scoped>
.list-container {
  width: 100%;
  height: 170px;
  overflow: hidden;
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  color: #fff;

  .item-time {
    width: 120px;
  }

  .item-name {
    width: 150px;
  }

  .item-goods {
    max-width: 400px;
    flex: 1;
    .goods-name {
      color: #ffef82;
    }
  }

}
//无限滚动
.marquee {
  //animation-delay: -5s;
  animation: marquee 11s linear infinite;
}
//.marquee:hover {
//  animation-play-state: paused;
//}
@keyframes marquee {
  0% {
    -ms-transform: translateY(0%);
    -webkit-transform: translateY(0%);
    -moz-transform: translateY(0%);
    -o-transform: translateY(0%);
    transform: translateY(0%);
  }
  100% {
    -ms-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
}
</style>
