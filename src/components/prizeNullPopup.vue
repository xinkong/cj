<template>
  <Popup v-model:show="show" :style="{ background: 'transparent', margin: '0', maxWidth: '750px', left: '50%', transform: 'translate(-50%, -50%)' }">
    <div class="popup-wrap">
      <div class="login-popup">
        <div class="title">My Rewards</div>
        <div class="prize-wrap">
          <img src="../assets/img/null-prize.png" alt="">
        </div>
        <div class="sub-btn" @click="handlePrize">
          Open boxs first $0<Icon name="arrow" />
        </div>
      </div>
      <div class="close" @click="show=false">
        <img src="../assets/img/close.png" alt="">
      </div>
    </div>
  </Popup>
</template>
<script>
import { Popup, Button, Icon } from 'vant';
export default {
  components: { Popup, Button, Icon },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    showPopup: {
      handler(newValue) {
        this.show = newValue
      },
      immediate: true
    },
    show(newVal) {
      this.$emit('update:showPopup', newVal)
    }
  },
  methods: {
    handlePrize() {
      this.$emit('handlePrize')
    }
  }
}
</script>
<style lang="scss" scoped>
.popup-wrap {
  min-height: 60vh;
}
.login-popup {
  background: transparent url("../assets/img/prize-null-bg.png") no-repeat left bottom;
  background-size: 100% 100%;
  width: 704px;
  height: 820px;
  box-sizing: border-box;
  padding-top: 10px;

  .title {
    font-size: 60px;
    font-weight: bolder;
    text-align: center;
    color: #fff;
  }

  .prize-wrap {
    width: 388px;
    height: 341px;
    margin: 80px auto;
    img {
      width: 100%;
      height: 100%;
    }
  }


  .time-text {
    width: 530px;
    font-size: 30px;
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

    .van-icon-arrow {
      font-weight: bolder;
    }
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
