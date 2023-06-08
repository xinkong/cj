<template>
  <Popup v-model:show="show" :style="{ background: 'transparent', margin: '0', maxWidth: '750px', left: '50%', transform: 'translate(-50%, -50%)' }">
    <div class="popup-wrap">
      <div class="login-popup">
        <img class="img-1" src="../assets/img/prize-top-1.png" alt="">
        <div class="prize-wrap">
          <img :src="goods?.goodsPics" alt="">
          <div class="title van-ellipsis">{{ goods?.goodsTitle }}</div>
          <div class="price">{{goods?.symbol}}{{ goods?.price }}</div>
        </div>
        <div class="time-text">
          The commodity has been successfully received. Please apply for shipment in the 'BingoBox' APP
        </div>
        <div class="sub-btn" @click="goMyWin">
          View all rewards
        </div>
      </div>
      <div class="close" @click="show=false">
        <img src="../assets/img/close.png" alt="">
      </div>
    </div>
  </Popup>
</template>
<script>
import { Popup, Field, Button, CountDown, Checkbox } from 'vant';
export default {
  components: {Popup, Field, Button, CountDown, Checkbox},
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    winInfo: {
      type: Array,
      default: ()=> {
        return []
      }
    }
  },
  data() {
    return {
      show: false,
      goods: {}
    }
  },
  watch: {
    showPopup: {
      handler(newValue) {
        this.show = newValue
        const { returnObject = [] } = this.winInfo || {}
        this.goods = returnObject ? returnObject[0] : {}
      },
      immediate: true
    },
    show(newVal) {
      this.$emit('update:showPopup', newVal)
    }
  },
  methods: {
    goMyWin() {
      this.show = false
      this.$router.push('/win')
    }
  }
}
</script>
<style lang="scss" scoped>
.popup-wrap {
  min-height: 100vh;
}
.login-popup {
  background: transparent url("../assets/img/prize-bg.png") no-repeat left bottom;
  background-size: 100% 98%;
  width: 720px;
  height: 985px;
  padding-top: 170px;
  box-sizing: border-box;

  .img-1 {
    width: 484px;
    height: 125px;
  }

  .prize-wrap {
    width: 290px;
    height: 290px;
    border-radius: 10px;
    background-color: #d8b98b;
    margin: 80px auto 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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


  .time-text {
    width: 530px;
    font-size: 20px;
    color: #a15f00;
    margin: 25px auto;
    font-weight: bold;
    text-align: left;
  }


  .sub-btn {
    width: 505px;
    height: 115px;
    margin: 15px auto 0;
    font-size: 48px;
    font-weight: bold;
    color: #fbdfae;
    line-height: 115px;
    background: linear-gradient(to right, #ff702e, #fd4928);
    border-radius: 60px;
  }

}
.close {
  width: 100%;
  height: 58px;
  margin-top: 40px;
  text-align: center;
  img {
    width: 58px;
    height: 58px;
  }
}

</style>
