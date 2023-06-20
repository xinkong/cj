<template>
  <div class="page-home">

    <div class="logo-wrap">
      <img class="logo-img" src="../assets/img/logo.png" alt="logo">
    </div>
    <section class="top-warp">
      <img class="top-img" src="../assets/img/home-top-img.png" alt="title">
    </section>
    <section class="m-content">
      <div class="m-top">
        <img @click="handleAllPrize" class="top-all-prize-img" src="../assets/img/m-top-1.png" alt="">
        <div class="top-prize-list">
          <div class="top-prize-item" v-for="i in allGoods">
            <img v-if="i?.picUrl" class="prize-img" :src="i?.picUrl" :alt="i.title">
          </div>
        </div>
        <div class="top-slogan">¥59/个 新人首抽免费</div>
      </div>
      <div class="m-btm">
        <div class="cj-wrap">
          <cj ref="cjRef" @prizeFinished="prizeFinished"/>
        </div>
        <img @click="goMyPrize" class="btm-my-prize-img" src="../assets/img/my-prize.png" alt="">
        <div @click="start" id="lottie" class="btm-start-prize">
          <img class="img-1" src="../assets/img/cj-bg1.png" alt="">
          <img class="img-2" src="../assets/img/cj-bg2.png" alt="">
          <img class="img-3" src="../assets/img/cj-1.png" alt=""/>
          <div class="label" v-if="userType !== 2">限时0元</div>
          <div id="fingerCanvas" class="finger"></div>
        </div>
      </div>
    </section>
    <!--    <section class="name-list">-->
    <!--      <div class="text-wrap">-->
    <!--        <img src="../assets/img/name-list.png" alt="">-->
    <!--        <div class="text-des">-->
    <!--          <name-list/>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </section>-->
    <section class="active-rule">
      <div class="text-wrap">
        <img src="../assets/img/active-rule.png" alt="">
        <div class="text-des">
          1、每位新用户都有1次免费抽奖机会，100%可中奖！官方正品包邮到家。<br/>
          2、奖品领取方式：奖品抽中后将发放至您的仓库中，请到【宾果盲盒】APP内【仓库】页面中申请提货。<br/>
          3、若您通过非法途径获得奖品的，公司有权不提供奖品，活动最终解释权归杭州绘领网络科技有限公司所有。<br/>
        </div>
      </div>
    </section>
    <login-popup v-model:showPopup="showLoginPopup" @loginSuccess="loginSuccess" :boxSimInfo="boxSimInfo"/>
    <prize-popup v-model:showPopup="showPrizePopup" :win-info="winInfo"/>
    <prize-null-popup v-model:showPopup="showPrizeNullPopup" @handlePrize="handlePrize"/>
    <new-user-prize-popup v-if="showNewUserPrizePopup" v-model:showPopup="showNewUserPrizePopup"
                          :boxSimInfo="boxSimInfo" :userType="userType" @handlePrize="handlePrize"/>
    <Overlay :show="backLoadingShow" :custom-style="{background: 'transparent'}">
      <div class="wrapper" @click.stop>
        <div class="block">
          <Loading color="#fff" text-color="#fff" vertical>加载中...</Loading>
        </div>
      </div>
    </Overlay>

    <div class="logo-wrap2" @click="downloadInfo(4)">
      <div class="logo-img2">
        <div class="title2">点击下载</div>
      </div>
    </div>
  </div>
</template>
<script>
import cj from "../components/cj.vue";
import loginPopup from "../components/loginPopup.vue";
import prizePopup from "../components/prizePopup.vue";
import prizeNullPopup from "../components/prizeNullPopup.vue";
import newUserPrizePopup from "../components/newUserPrizePopup.vue";
import nameList from "../components/nameList.vue";
import {showToast, showConfirmDialog, Overlay, Loading} from "vant";
import API from "../utils/api";
import lottie from 'lottie-web'
import ljcj from '../assets/json/ljcj.json'
import SVGA from 'svgaplayerweb'

export default {
  name: 'home',
  components: {
    cj,
    loginPopup,
    prizePopup,
    prizeNullPopup,
    newUserPrizePopup,
    nameList,
    Overlay,
    Loading
  },
  data() {
    return {
      showLoginPopup: false,
      showPrizeNullPopup: false,
      showNewUserPrizePopup: false,
      showPrizePopup: false,
      boxSimInfo: null,
      myGoods: null,
      winInfo: null,
      allGoods: [{}, {}, {}, {}, {}],
      userType: 0,
      backLoadingShow: false,
      timer: null,
      player: null,
      parser: null,
    }
  },
  created() {
    this.getBoxSimInfo()
    this.getData()
    this.getUserState()
    // var player = new SVGA.Player('#fingerCanvas');
    // var parser = new SVGA.Parser('#fingerCanvas'); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
    // parser.load("../assets/img/finger.svga", function(videoItem) {
    //   player.setVideoItem(videoItem);
    //   player.startAnimation();
    // })
  },

  mounted() {
    // lottie.loadAnimation({
    //   container: document.getElementById('lottie'), // the dom element that will contain the animation
    //   renderer: 'svg',
    //   loop: true,
    //   autoplay: true,
    //   path: ljcj
    // });
    // 支付回调验证???
    const {orderNum} = this.$route.query
    if (orderNum) {
      const winInfo = window.localStorage.getItem('winInfo')
      this.winInfo = JSON.parse(winInfo)
      if (this.winInfo) {
        this.backLoadingShow = true
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.backLoadingShow = false
          this.winBackPrize(this.winInfo)
        }, 3000)
      }
    }
    let player = new SVGA.Player('#fingerCanvas');
    let parser = new SVGA.Parser('#fingerCanvas');
    parser.load('https://xinkong-1256187045.cos.ap-shanghai.myqcloud.com/icon/finger.svga', function (videoItem) {
      player.setVideoItem(videoItem);
      player.startAnimation();
    })
  },
  // initMachineSVGA() {
  //   let player = new SVGA.Player('#fingerCanvas');
  //   let parser = new SVGA.Parser('#fingerCanvas');
  //   parser.load('../assets/img/finger.jpg', function (videoItem) {
  //     player.setVideoItem(videoItem);
  //     player.startAnimation();
  //   })
  //
  // },
  methods: {
    async getData() {
      try {
        const {code, data} = await this.$request({
          url: API.getBoxGoodsList,
          method: 'post',
          data: {
            pageSize: 5,
            pageNum: 1
          }
        })
        if (code === 0) {
          this.allGoods = data || []
        }
      } catch (e) {
      }
    },
    async getBoxSimInfo() {
      try {
        const {code, data} = await this.$request({
          url: API.getBoxSimInfo,
          method: 'post'
        })
        if (code === 0) {
          this.boxSimInfo = data
          window.localStorage.setItem('boxSimInfo', data)
        }
      } catch (e) {

      }
    },
    async goMyPrize() {
      const isLogin = this.getLoginState()
      if (!isLogin) {
        this.showLoginPopup = true
        return
      }
      try {
        const {code, data} = await this.$request({
          url: API.getMyGoods,
          method: 'post'
        })
        if (code === 0) {
          this.myGoods = data
          if (data?.length) {
            this.$router.push('/win')
          } else {
            this.showPrizeNullPopup = true
          }
        }
      } catch (e) {

      }
    },
    handleAllPrize() {
      // this.winInfo = {"orderNum":"017150837581795","name":"薅羊毛_1","price":0.00,"currency":"USD","symbol":"$","state":0,"returnObject":[{"gradeCode":10,"goodsCode":"BAH93","goodsTitle":" 志高便携小风扇充电便携式电风扇手持夹扇","goodsPics":"https://boxpic.manghehe.com/product/goods/listpic/eQTIbOnVxf42TweXgvpUog==_1677203436276_ae31d101-22af-4368-8fd0-00a52bf36006.png!gsv","price":59.00,"symbol":"¥","certifiedUrl":"https://item.jd.com/10030664466849.html"}]}
      // this.$refs.cjRef.start(this.winInfo)
      this.showNewUserPrizePopup = true
    },
    async start() {
      const userType = await this.getUserState() // 0.不存在，需要创建；1.已创建，未下单新用户；2:老用户
      if (userType === 0) return this.showLoginPopup = true
      if (userType === 2) {
        const beforeClose = (action) =>
            new Promise(async (resolve) => {
              if (action === 'confirm') {
                // // 查询支付状态先????????????? 路径传參???? 获取到??? 继续下单
                // const orderNum = window.localStorage.getItem('orderNum')
                await this.downloadInfo(2)
                resolve(true);
              }else {
                resolve(true);
              }
            });
        await showConfirmDialog({
          message: '首次免费已抽取，请下载APP查看商品',
          confirmButtonText: '下载领取',
          cancelButtonText: '取消',
          beforeClose
        });

      } else {
        try {
          const {code, data} = await this.$request({
            url: API.createOrder,
            method: 'post',
            data: {
              payType: userType  // 新人0元购的时候 传1，非0元购时传2
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
              showToast('订单创建失败')
            }
          }
        } catch (e) {

        }
      }
    },

    async downloadInfo(downLoadType) {
      const {code, data} = await this.$request({
        url: API.downloadInfo,
        method: 'post',
        data: {
          type: downLoadType
        }
      })
      if (code === 0) {
        this.$downLoadApp()
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
          this.winInfo = data
          await this.$refs.cjRef.start(data)
        }
      } catch (e) {

      }
    },
    async showConfirmDialog() {
      const beforeClose = (action) =>
          new Promise(async (resolve) => {
            if (action === 'confirm') {
              // 查询支付状态先????????????? 路径传參???? 获取到??? 继续下单
              const orderNum = window.localStorage.getItem('orderNum')
              await this.completeOrder(orderNum)
              resolve(true);
            } else {
              resolve(true);
            }
          });

      await showConfirmDialog({
        message: '是否已完成支付?',
        confirmButtonText: '已完成',
        cancelButtonText: '已取消',
        beforeClose
      });
    },
    loginSuccess() {
      console.log('loginSuccess')
      this.start()
    },
    prizeFinished() {
      // 抽完奖更新用户状态
      this.getUserState()
      window.localStorage.removeItem('orderNum')
      // 展示商品
      this.showPrizePopup = true
    },
    handlePrize() {
      this.start()
    },
    getLoginState() {
      const accessToken = window.localStorage.getItem('accessToken')
      return !!accessToken
    },
    async winBackPrize(winInfo) {
      await this.$refs.cjRef.start(winInfo)
      window.localStorage.removeItem('winInfo')
    },
    async getUserState() {
      try {
        const {code, data} = await this.$request({
          url: API.getUserState,
          method: 'post'
        })
        if (code === 0) {
          this.userType = data
          window.localStorage.setItem('userType', data)
          return data
        }
      } catch (e) {
        return -1
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.page-home {
  min-height: 100vh;
  background: #fe4a31 url("../assets/img/home-bg.jpg") no-repeat left top;
  background-size: 100% 50%;
  position: relative;

  .logo-wrap {
    position: absolute;
    left: 10px;
    top: 13px;
    width: 93px;
    height: 93px;

    .logo-img {
      width: 100%;
      height: 100%;
    }
  }

  .logo-wrap2 {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-75%);
    width: 110px;
    height: 137px;

    .logo-img2 {
      width: 100%;
      height: 100%;
      background: url("../assets/img/float.png") no-repeat center;
      background-size: 100% 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .title2 {
      font-size: 24px;
      font-weight: bold;
    }
  }

  .top-warp {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    box-sizing: border-box;

    .top-img {
      width: 699px;
      height: 244px;
    }
  }

  .m-content {
    .m-top {
      position: relative;
      width: 750px;
      height: 298px;
      padding-top: 73px;
      box-sizing: border-box;
      background: url("../assets/img/m-top-bg.png") left top;
      background-size: 100% 100%;
      //.m-top-img {
      //  position: absolute;
      //  left: 0;
      //  top: 0;
      //  width: 100%;
      //  height: 100%;
      //}
      .top-all-prize-img {
        position: absolute;
        left: 85px;
        top: 10px;
        width: 236px;
        height: 38px;
      }

      .top-prize-list {
        margin: 0 auto;
        min-width: 650px;
        display: flex;
        align-items: center;
        justify-content: center;

        .top-prize-item {
          width: 113px;
          height: 113px;
          background: url("../assets/img/m-top-prize-bg.png") no-repeat center;
          background-size: 100%;
          margin-right: 15px;

          &:last-child {
            margin-right: 0;
          }

          .prize-img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .top-slogan {
        font-size: 26px;
        font-weight: bold;
        color: #ffffff;
        position: absolute;
        left: 50%;
        bottom: 27px;
        transform: translateX(-50%);
      }
    }

    .m-btm {
      position: relative;
      width: 750px;
      height: 710px;
      background: url("../assets/img/m-btm-bg.png") left top;
      background-size: 100% 100%;

      .cj-wrap {
        position: absolute;
        left: 100px;
        top: 38px;
        width: 560px;
        height: 322px;
      }

      .btm-my-prize-img {
        position: absolute;
        left: 100px;
        bottom: 120px;
        width: 193px;
        height: 162px;
      }

      .btm-start-prize {
        position: absolute;
        right: 95px;
        bottom: 118px;
        width: 300px;
        height: 162px;
        line-height: 162px;
        text-align: center;
        font-size: 40px;

        .img-1 {
          position: absolute;
          left: 0;
          top: 0;
          width: 300px;
          height: 162px;
          z-index: 1;
          -webkit-animation: bounce-down 1.4s linear infinite;
          animation: bounce-down 1.4s linear infinite;
        }

        .img-2 {
          position: absolute;
          left: 0;
          top: 0;
          width: 300px;
          height: 160px;
          z-index: 2;
        }

        .img-3 {
          position: absolute;
          left: 30px;
          top: 15px;
          width: 232px;
          height: 55px;
          z-index: 3;
          -webkit-animation: bounce-down 1.4s linear infinite;
          animation: bounce-down 1.4s linear infinite;

        }

        .label {
          position: absolute;
          right: -28px;
          top: -46px;
          background: url("../assets/img/tips.png") no-repeat center;
          background-size: 100% 100%;
          width: 142px;
          height: 46px;
          text-align: center;
          line-height: 37px;
          font-size: 24px;
          color: #ff5137;
          z-index: 10;
        }

        .finger {
          position: absolute;
          right: 20px;
          top: 20px;
          background-size: 100% 100%;
          width: 150px;
          height: 150px;
          text-align: center;
          line-height: 37px;
          font-size: 24px;
          color: #ff5137;
          z-index: 10;
        }
      }
    }
  }

  .name-list {
    width: 100%;
    padding: 0 24px 16px 24px;
    box-sizing: border-box;
  }

  .active-rule {
    width: 100%;
    padding: 16px 24px 32px;
    box-sizing: border-box;
  }

  .text-wrap {
    width: 100%;
    background-color: #e82507;
    color: #ffffff;
    border-radius: 10px;
    min-height: 200px;
    padding: 20px;
    box-sizing: border-box;

    img {
      height: 34px;
      width: auto;
      margin: 0 auto;
    }

    .text-des {
      margin-top: 15px;
      font-size: 24px;
      color: #fff;
      font-weight: bold;
      text-align: left;
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 240px;
  height: 240px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

@-webkit-keyframes bounce-down {
  25% {
    -webkit-transform: translateY(-4px);
  }
  50%, 100% {
    -webkit-transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(4px);
  }
}

@keyframes bounce-down {
  25% {
    transform: translateY(-4px);
  }
  50%, 100% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(4px);
  }
}
</style>
