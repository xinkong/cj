<template>
  <Popup v-model:show="show"
         :style="{ background: 'transparent', margin: '0', maxWidth: '750px', left: '50%', transform: 'translate(-50%, -50%)' }">
    <div class="popup-wrap">
      <div class="login-popup">
        <img class="img-1" src="../assets/img/login-top-1.png" alt="">
        <img class="img-2" src="../assets/img/login-top-2.png" alt="">
        <div class="prize-wrap">
          <img :src="boxSimInfo?.picUrl" alt="">
        </div>
        <div class="new-user-text">
          <div class="text">新人价:</div>
          <div class="price">¥0.00</div>
          <div class="line-price">{{ boxSimInfo?.symbol + boxSimInfo?.price }}</div>
        </div>
        <div class="time-text">
          <span>奖品已锁定, 请在</span>
          <count-down :time="time" :style="{lineHeight: 'inherit'}" @finish="onFinish">
            <template #default="timeData">
              <span class="time">{{ timeData.minutes }}</span>
              <span class="time"> min</span>
              <span class="time">{{ timeData.seconds }}</span>
              <span class="time"> s</span>
            </template>
          </count-down>
          <span> 内完成注册</span>
        </div>
        <div class="form">
          <div class="content">
            <Button
                class="area"
                v-model="area"
                maxlength="3"
                placeholder="区号"
            >+1</Button>
            <Field
                class="phone"
                v-model="phone"
                type="number"
                maxlength="11"
                placeholder="请输入手机号"
            />

          </div>

          <div class="sms">
            <Field
                v-model="sms"
                type="number"
                maxlength="8"
                placeholder="请输入短信验证码"
            >
              <template #button>
                <div class="sms-text" @click="getSms">
                  <span v-if="!showTime">获取验证码</span>
                  <span v-else class="time">{{ time2 }}后重新获取</span>
                </div>
              </template>
            </Field>
          </div>
        </div>
        <div class="agree">
          <Checkbox v-model="agree">
            <template #icon="props">
              <div class="img-icon">
                <img v-if="props.checked" src="../assets/img/check.png" alt="">
              </div>
            </template>
          </Checkbox>
          <span>同意</span>
          <span class="color-text" @click="goRules(1)">《用户协议》</span>与<span class="color-text"
                                                                           @click="goRules(1)">《隐私政策》</span>
        </div>
        <div class="sub-btn" @click="login">
          注册
        </div>
      </div>
      <div class="close" @click="show=false">
        <img src="../assets/img/close.png" alt="">
      </div>
    </div>
  </Popup>
</template>

<script>
import {Popup, Field, Button, CountDown, Checkbox, showToast} from 'vant';
import API from "../utils/api";

export default {
  components: {Popup, Field, Button, CountDown, Checkbox},
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    boxSimInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      show: false,
      phone: '',
      area: '',
      sms: '',
      time: 15 * 60 * 1000,
      agree: false,
      showTime: false,
      timer: null,
      time2: 60,
      isPhoneNum: /^1[0-9][0-9]\d{8}$/
    }
  },
  computed: {
    list: function () {
      var _this = this;
      //逻辑-->根据input的value值筛选countryList中的数据
      var arrCount = []; //声明一个空数组来存放数据
      var conlenth = this.countryList.length
      for (var i = 0; i < conlenth; i++) {
        //for循环数据中的每一项（根据name值）
        if (this.countryList[i].name.search(this.searchVal) != -1) {
          arrCount.push(this.countryList[i]);
        }
      }
      return arrCount;
    }
  },
  watch: {
    showPopup: {
      handler(newValue) {
        this.show = newValue
        newValue && this.init()
      },
      immediate: true
    },
    show(newVal) {
      this.$emit('update:showPopup', newVal)
    }
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    // 点击取消的按钮
    onCancel() {
      this.searchVal = ''
      this.$router.go(-1)
    },
    // 选择国家
    choose(index, obj) {
      this.iselct = index;
      this.getCountry(obj);
      this.time = setTimeout(() => {
        this.$router.go(-1);
        clearTimeout(this.time);
      }, 1000)
      console.log(index, obj)
    },
    onSearch() {

    },
    init() {
      this.phone = ''
      this.sms = ''
      this.time = 15 * 60 * 1000
      this.agree = false
      this.showTime = false
      this.timer = null
      this.time2 = 60
    },
    onFinish() {
      showToast('已过期')
      this.show = false
    },
    async getSms() {
      const {showTime, isPhoneNum, phone} = this
      if (showTime) return
      if (!phone) return showToast('请输入手机号')
      if (!isPhoneNum.test(phone)) return showToast('请输入正确手机号')
      this.showTime = true
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.time2 === 1) {
          clearInterval(this.timer)
          this.time2 = 60
          this.showTime = false
        }
        this.time2 -= 1
      }, 1000)
      try {
        const {code} = await this.$request({
          url: API.sendMsg,
          method: 'post',
          data: {
            phone
          }
        })
        if (code === 0) {
          showToast('短信已发送,请注意查收')
        }
      } catch (e) {
        clearInterval(this.timer)
        this.time2 = 60
        this.showTime = false
      }
    },
    async login() {
      const {agree, isPhoneNum, phone, sms} = this
      if (!agree) return showToast('请同意用户协议')
      if (!phone) return showToast('请输入手机号')
      if (!isPhoneNum.test(phone)) return showToast('请输入正确手机号')
      if (!sms) return showToast('请输入验证码')
      try {
        const {code, data} = await this.$request({
          url: API.smsLogin,
          method: 'post',
          data: {
            phoneNum: phone,
            msgCode: sms
          }
        })
        if (code === 0) {
          const {access_token} = data
          window.localStorage.setItem('accessToken', access_token)
          await this.getUserState()
        }
      } catch (e) {

      }
    },
    async getUserState() {
      try {
        const {code, data} = await this.$request({
          url: API.getUserState,
          method: 'post'
        })
        if (code === 0) {
          if (data === 0) { //新用户 需注册
            window.localStorage.setItem('userType', data)
            await this.createNewUser()
          } else {
            showToast('注册成功，正在为您抽奖中')
            this.show = false
            this.$emit('loginSuccess')
          }
        }
      } catch (e) {

      }
    },
    async createNewUser() {
      try {
        const {code} = await this.$request({
          url: API.createNewUser,
          method: 'post'
        })
        if (code === 0) {
          window.localStorage.setItem('userType', '1')
          showToast('注册成功，正在为您抽奖中')
          this.show = false
          this.$emit('loginSuccess')
        }
      } catch (e) {

      }
    },

    goRules(type) {
      window.location.href = type === 1 ? 'https://www.manghehe.com/agreement/UserAgreement_cn.html' : 'https://www.manghehe.com/agreement/PrivacyAgreement_cn.html'
    }
  }
}
</script>
<style>
input.van-field__control::-webkit-input-placeholder {
  color: #8f7c61;
  font-size: 28px;
}

.van-checkbox__icon {
  height: auto;
}
</style>
<style lang="scss" scoped>

.atnight {
  background: #fff;
}

.main {
  margin: 0.1rem 1.173333rem;

  .list {
    height: 2.4rem;
    line-height: 2.4rem;
    justify-content: space-between;
    font-size: 0.746666rem;
    border-bottom: 1px solid #EBEBEB;
  }
}

.popup-wrap {
  min-height: 100vh;
}

.login-popup {
  background: transparent url("../assets/img/login-bg.png") no-repeat left bottom;
  background-size: 100% 98%;
  width: 720px;
  height: 1170px;
  padding-top: 105px;
  box-sizing: border-box;

  .img-1 {
    width: 479px;
    height: 124px;
  }

  .img-2 {
    width: 327px;
    height: 49px;
  }

  .prize-wrap {
    width: 290px;
    height: 290px;
    border-radius: 10px;
    //background-color: #d8b98b;
    margin: 38px auto 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .new-user-text {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-top: 20px;

    .text {
      font-size: 40px;
      color: #00a10b;
      font-weight: bold;
      line-height: 42px;
    }

    .price {
      font-size: 42px;
      color: #f90609;
      margin: 0 20px;
      line-height: 42px;
    }

    .line-price {
      font-size: 30px;
      color: #8f7c61;
      text-decoration: line-through;
      line-height: 1;
    }
  }

  .time-text {
    display: flex;
    justify-content: center;
    font-size: 28px;
    color: #a15f00;
    margin: 15px 0;

    .time {
      font-size: 28px;
      color: #a15f00;
    }
  }

  .form {
    .content{
      display: flex;
      align-items: center;
      margin: 0 auto 20px;
      width: 480px;
    }
    .area {
      width: 80px;
      background: #d8b98b;
      .van-field {
        background: #d8b98b;
        border-right: 5px;
        padding: 20px;
        font-size: 14px;
      }
    }
    .phone {
      width: 390px;
      margin-left: 10px;
      background: #d8b98b;
      .van-field {
        background: #d8b98b;
        border-right: 5px;
        padding: 20px;
        font-size: 14px;
      }
    }

    .sms {
      margin: 0 auto 10px;
      width: 480px;

      .van-field {
        background: #d8b98b;
        border-right: 5px;
        padding: 20px;
      }

      .sms-text {
        font-size: 28px;
        padding-left: 20px;
        box-sizing: border-box;
        color: #435bd1;
        position: relative;
        min-width: 166px;
        text-align: center;

        .time {
          font-size: 24px;
        }

        &::before {
          content: '';
          position: absolute;
          left: -5px;
          top: 50%;
          height: 40px;
          width: 2px;
          border-left: 2px solid #435bd1;
          transform: translateY(-50%);
        }
      }
    }
  }

  .agree {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 480px;
    margin: 0 auto;
    font-size: 20px;
    color: #8f7b61;

    .van-checkbox {
      margin-right: 10px;
    }

    .img-icon {
      width: 25px;
      height: 25px;
      background: url("../assets/img/unCheck.png") no-repeat center;
      background-size: 98%;
      position: relative;

      img {
        position: absolute;
        left: 0;
        top: 2px;
        width: 26px;
        height: 20px;
      }
    }

    .color-text {
      color: #435cd2;
    }
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
  margin-top: 30px;
  text-align: center;

  img {
    width: 58px;
    height: 58px;
  }
}

</style>
