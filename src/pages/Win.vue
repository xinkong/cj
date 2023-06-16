<template>
  <div class="page-win">

    <section class="top-warp">
      <img @click="back" class="back-img" src="../assets/img/back.png" alt="">
      <img class="top-img" src="../assets/img/win-top-1.png" alt="title">
    </section>
    <section class="swipe-wrap">
      <div v-if="swipeList.length > 1" class="swipe-icon" @click="handlePrev">
        <img src="../assets/img/swipe-icon.png" alt="">
      </div>
      <Swipe class="swipe-warp" ref="swipeRef">
        <swipe-item v-for="(item, index) in swipeList" :key="index" class="swipe-item-content">
          <div v-for="i in item" class="swipe-item-c-i">
            <img :src="i.picUrl" alt="">
            <div class="title van-ellipsis">{{ i.title }}</div>
            <div class="price">{{ i.symbol }}{{ i.price }}</div>
          </div>
        </swipe-item>
        <template #indicator="{ active, total }">
          <div></div>
        </template>
      </Swipe>
      <div v-if="swipeList.length > 1" class="swipe-icon rt" @click="handleNext">
        <img src="../assets/img/swipe-icon.png" alt="">
      </div>
    </section>
    <section class="text-warp">
      <div>This product is valid for  24 hours<br/> please pick it up as soon as possible!</div>
    </section>
    <div class="sub-btn again" @click="again">
      {{boxSimInfo?.symbol+boxSimInfo?.price}} Draw again
    </div>
    <section class="flow-warp">
      <img class="flow-title-img" src="../assets/img/win-btm-title.png" alt="">
      <div class="flow-list">
        <div class="flow-item">
          <img src="../assets/img/flow-icon1.png" alt="">
          <div class="flow-title">1.Download APP</div>
        </div>
        <div class="flow-item">
          <img src="../assets/img/flow-icon2.png" alt="">
          <div class="flow-title">2.Enter the warehouse page</div>
        </div>
        <div class="flow-item">
          <img src="../assets/img/flow-icon3.png" alt="">
          <div class="flow-title">3.Activate the commodity and ship it</div>
        </div>
      </div>
    </section>
    <div class="sub-btn download-btn" @click="download">
      Download APP<br/>
      receive commodity>>
    </div>
    <div class="logo-wrap" @click="download">
      <!--      <img class="logo-img" src="../assets/img/float.png" alt="logo">-->
      <div class="logo-img">
        <div class="title">click download</div>
      </div>
    </div>
  </div>
</template>
<script>
import {showConfirmDialog, showToast, Swipe, SwipeItem} from 'vant';
import API from "../utils/api";

export default {
  components: {Swipe, SwipeItem},
  data() {
    return {
      swipeList: [
        // [
        //   { t: '', name: '1', price: '222.00' },
        //   { t: '', name: '2', price: '33.00' },
        // ],
        // [
        //   { t: '', name: '1', price: '222.00' },
        //   { t: '', name: '2', price: '33.00' },
        // ],
        // [
        //   { t: '', name: '1', price: '222.00' },
        //   { t: '', name: '2', price: '33.00' },
        // ]
      ],
      boxSimInfo: this.$route.query
    }
  },

  computed: {
    isLogin() {
      const accessToken = window.localStorage.getItem('accessToken')
      return !!accessToken
    }
  },
  created() {
    this.getMyGoods()
  },
  methods: {
    async getMyGoods() {
      if (!this.isLogin) {
        showToast('please log in first')
        return this.$router.push('/')
      }
      try {
        const {code, data} = await this.$request({
          url: API.getMyGoods,
          method: 'post'
        })
        if (code === 0) {
          if (data.length) {
            let pList = []
            for (let i = 0; i < Math.ceil(data.length / 2); i++) {
              pList.push([])
              pList[i] = data.slice(i * 2, i * 2 + 2)
            }
            this.swipeList = JSON.parse(JSON.stringify(pList))
          }
        }
      } catch (e) {

      }
    },
    download() {
      const appSource = this.appSource()
      const IOSUrl = 'https://apps.apple.com/app/id1670056674'
      let ele = document.createElement('a')
      ele.download = 'bingobox'
      ele.style.display = 'none'
      ele.href = appSource === 'ios' ? IOSUrl : 'https://boxpic.manghehe.com/apk/BingoBox_global.apk'
      document.body.appendChild(ele)
      ele.click()
      document.body.removeChild(ele)
    },
    appSource() {
      const u = navigator.userAgent;
      const isiOS = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        return "ios";
      } else {
        return "android";
      }
    },
    again() {
      this.start()
    },
    async start() {
      const userType = await this.getUserState() // 0.不存在，需要创建；1.已创建，未下单新用户；2:老用户
      if (userType === 0) {
        showToast('please log in first')
        return this.$router.push('/')
      }
      try {
        const {code, data} = await this.$request({
          url: API.createOrder,
          method: 'post',
          data: {
            payType: userType === 1 ? 1 : 13  // 新人0元购的时候 传1，非0元购时传2
          }
        })
        if (code === 0) {
          const {orderNum, state, payUlr} = data
          if (state === 1) { //-1.订单创建失败；1.订单创建成功，待支付；
            if (userType === 1) { //新用户直接抽
              await this.completeOrder(orderNum)
            } else { //调起支付
              window.localStorage.setItem('orderNum', orderNum)
              window.location.href = payUlr
              await this.showConfirmDialog()
            }
          } else {
            showToast('Order creation failed')
          }
        }
      } catch (e) {

      }
    },
    async completeOrder(orderNum) {
      try {
        const {code, data} = await this.$request({
          url: API.completeOrder,
          method: 'post',
          data: {
            orderNum
          }
        })
        if (code === 0) {
          const winInfo = JSON.stringify(data)
          window.localStorage.setItem('winInfo', winInfo)
          this.$router.push(`/?orderNum=${orderNum}`)
        }
      } catch (e) {

      }
    },
    async showConfirmDialog() {
      const beforeClose = (action) =>
          new Promise(async (resolve) => {
            if (action === 'confirm') {
              // 查询支付状态先????????????? 路径传參???? 获取到??? 继续下单
              await this.getMyGoods()
              const orderNum = window.localStorage.getItem('orderNum')
              await this.completeOrder(orderNum)
              // const data = {"orderNum":"017150837581795","name":"薅羊毛_1","price":0.00,"currency":"USD","symbol":"$","state":0,"returnObject":[{"gradeCode":10,"goodsCode":"BAH93","goodsTitle":" 志高便携小风扇充电便携式电风扇手持夹扇","goodsPics":"https://boxpic.manghehe.com/product/goods/listpic/eQTIbOnVxf42TweXgvpUog==_1677203436276_ae31d101-22af-4368-8fd0-00a52bf36006.png!gsv","price":59.00,"symbol":"¥","certifiedUrl":"https://item.jd.com/10030664466849.html"}]}
              // const winInfo = JSON.stringify(data)
              // window.localStorage.setItem('winInfo',  winInfo)
              // this.$router.push(`/?orderNum=${orderNum}`)
              resolve(true);
            } else {
              resolve(true);
            }
          });

      await showConfirmDialog({
        message: 'Has the payment been completed?',
        confirmButtonText: 'Completed',
        cancelButtonText: 'Canceled',
        beforeClose
      });
    },
    async getUserState() {
      try {
        const {code, data} = await this.$request({
          url: API.getUserState,
          method: 'post'
        })
        if (code === 0) {
          window.localStorage.setItem('userType', data)
          return data
        }
      } catch (e) {
        return -1
      }
    },
    back() {
      this.$router.go(-1)
    },
    handlePrev() {
      this.$refs.swipeRef.prev()
    },
    handleNext() {
      this.$refs.swipeRef.next()
    }
  },
}
</script>
<style lang="scss" scoped>
.page-win {
  min-height: 100vh;
  background: url("../assets/img/home-bg.jpg") no-repeat left top;
  background-size: 100% 100%;
  position: relative;

  .logo-wrap {
    position: absolute;
    right: 0;
    top: 41%;
    transform: translateY(-75%);
    width: 110px;
    height: 137px;

    .logo-img {
      width: 100%;
      height: 100%;
      background: url("../assets/img/float.png") no-repeat center;
      background-size: 100% 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .title {
      font-size: 24px;
      font-weight: bold;
    }
  }

  .top-warp {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    box-sizing: border-box;
    position: relative;

    .back-img {
      position: absolute;
      left: 45px;
      top: 68px;
      width: 49px;
      height: 65px;
    }

    .top-img {
      width: 399px;
      height: 137px;
    }
  }

  .swipe-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;

    .swipe-icon {
      width: 67px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .rt {
      transform: rotate(180deg);
    }

    .swipe-warp {
      width: 580px;
      min-height: 308px;

      .swipe-item-content {
        display: flex;
        align-items: center;
        justify-content: center;

        .swipe-item-c-i {
          width: 275px;
          height: 308px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #629fb1;
          margin: 0 15px;

          img {
            display: block;
            width: 150px;
            height: 185px;
          }

          .title, .price {
            font-size: 24px;
            color: #fff;
            font-weight: bold;
            text-align: center;
            margin-top: 10px;
          }

          .title {
            max-width: 250px;
          }
        }
      }
    }
  }

  .text-warp {
    width: 620px;
    margin: 0 auto;
    color: #3c4ed4;
    font-size: 36px;
    text-align: left;
    font-weight: bold;
    line-height: 40px;
  }

  .sub-btn {
    width: 505px;
    height: 115px;
    margin: 20px auto 0;
    font-size: 40px;
    font-weight: bold;
    color: #fbdfae;
    line-height: 115px;
    background: linear-gradient(to right, #ff702e, #fd4928);
    border-radius: 60px;

    .van-icon-arrow {
      font-weight: bolder;
    }
  }

  .again {
    -webkit-animation: bounce-down 0.8s linear infinite;
    animation: bounce-down 0.8s linear infinite;
  }

  .flow-warp {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px auto 0;

    .flow-title-img {
      width: 687px;
      height: 56px;
      margin-bottom: 30px;
    }

    .flow-list {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .flow-item {
        text-align: center;
        color: #a06000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 80px;

        &:last-child {
          margin-right: 0;
        }

        img {
          width: 130px;
          height: 130px;
          display: block;
          margin-bottom: 10px;
        }

        .flow-title {
          font-size: 24px;
          font-weight: bold;
          line-height: 30px;
        }
      }
    }
  }

  .download-btn {
    font-size: 30px;
    height: 80px;
    line-height: 1.1;
    padding-top: 10px;
    margin-top: 42px;
  }

}

@-webkit-keyframes bounce-down {
  25% {
    -webkit-transform: scale(0.8);
  }
  50%, 100% {
    -webkit-transform: scale(1);
  }
  75% {
    -webkit-transform: scale(0.8);
  }
}

@keyframes bounce-down {
  25% {
    transform: scale(0.8);
  }
  50%, 100% {
    transform: scale(1);
  }
  75% {
    transform: scale(0.8)
  }
}
</style>
