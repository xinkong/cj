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
          <div class="text">Newcomer price:</div>
          <div class="price">{{boxSimInfo?.symbol}}0.00</div>
          <div class="line-price">{{boxSimInfo?.symbol+ boxSimInfo?.price }}</div>
        </div>
        <div class="time-text">
          <span>commodity Locked, register in&nbsp</span>
          <count-down :time="time"  @finish="onFinish">
            <template #default="timeData">
              <span class="time">{{ timeData.minutes }}</span>
              <span class="time"> min </span>
              <span class="time">{{ timeData.seconds }}</span>
              <span class="time"> s </span>
            </template>
          </count-down>
          <!--          <span> 内完成注册</span>-->
        </div>

        <div class="sub-btn" @click="googleAccount">
          Google Account Register
        </div>

        <!--        <div class="form">-->
        <!--          <div class="content">-->
        <!--            <Field-->
        <!--                class="area"-->
        <!--                v-model="area"-->
        <!--                maxlength="3"-->
        <!--                placeholder="area"-->
        <!--            ></Field>-->
        <!--            <Field-->
        <!--                class="phone"-->
        <!--                v-model="phone"-->
        <!--                type="number"-->
        <!--                placeholder="phone number"-->
        <!--            />-->

        <!--          </div>-->
        <!--          <div id="sign-in-button"></div>-->
        <!--          <div class="sms">-->
        <!--            <Field-->
        <!--                v-model="sms"-->
        <!--                type="number"-->
        <!--                maxlength="8"-->
        <!--                placeholder="SMS number"-->
        <!--            >-->
        <!--              <template #button>-->
        <!--                <div class="sms-text" @click="getSms">-->
        <!--                  <span v-if="!showTime">Get SMS</span>-->
        <!--                  <span v-else class="time">{{ time2 }}Reacquire after</span>-->
        <!--                </div>-->
        <!--              </template>-->
        <!--            </Field>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="agree">
          <Checkbox v-model="agree">
            <template #icon="props">
              <div class="img-icon">
                <img v-if="props.checked" src="../assets/img/check.png" alt="">
              </div>
            </template>
          </Checkbox>
          <span>Agree</span>
          <span class="color-text" @click="goRules(1)">《User Agreement》</span>,<span class="color-text"
                                                                                     @click="goRules(2)">《Privacy Policy》</span>
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
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {GoogleAuthProvider} from "firebase/auth";

const provider = new GoogleAuthProvider();
//步骤1：全局注册 firebase app
const firebaseConfig = {
  apiKey: "AIzaSyCA9Wp_RBRDv5JQ6HKgAEiJ3j0B_zNhxSk",
  authDomain: "bingobox-78023.firebaseapp.com",
  projectId: "bingobox-78023",
  storageBucket: "bingobox-78023.appspot.com",
  messagingSenderId: "1021603499202",
  appId: "1:1021603499202:web:78fa8db5a5444cd2e5ff5b",
  measurementId: "G-D72LJV1MVM"
};

const firebase = initializeApp(firebaseConfig);
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
      googleAccountToken: '',
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
    init() {
      this.phone = ''
      this.sms = ''
      this.area = '+86'
      this.time = 15 * 60 * 1000
      this.agree = false
      this.showTime = false
      this.timer = null
      this.time2 = 60
    },
    onFinish() {
      showToast('expired')
      this.show = false
    },
    async getSms() {
      const {showTime, isPhoneNum, phone, area} = this
      if (showTime) return
      if (!phone) return showToast('enter phone number')
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
        // window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        //   'size': 'invisible',
        //   'callback': (response) => {
        //     // reCAPTCHA solved, allow signInWithPhoneNumber.
        //     console.log('recaptchaVerifier：', response)
        //   }
        // }, auth);
        // const appVerifier = window.recaptchaVerifier;
        // //步骤3：验证通过后，将参数进行发送
        // const phoneNumber = area + phone; //拼接 区号+手机号
        // this.sendCode(auth, phoneNumber,appVerifier)
        //
        // const {code} = await this.$request({
        //   url: API.sendMsg,
        //   method: 'post',
        //   data: {
        //     phone
        //   }
        // })
        if (code === 0) {
          showToast('短信已发送,请注意查收')
        }
      } catch (e) {
        clearInterval(this.timer)
        this.time2 = 60
        this.showTime = false
      }
    },
    //firebase 发送短信验证码
    sendCode(auth, phoneNumber, appVerifier) {
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("confirmationResult:" + JSON.stringify(confirmationResult))
            // ...
          }).catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("error:" + error)
      });
    },
    googleAccount: function () {
      const {agree} = this
      if (!agree) return showToast('agree user agreement')
      const auth = getAuth(firebase);
      auth.languageCode = 'it';

      signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            user.getIdToken().then(token => {
              this.phone = user.uid
              this.googleAccountToken = token
              this.login()
            })

          }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("===>" + error.message)
      });
    }
    ,
    async login() {
      try {
        const {code, data} = await this.$request({
          url: API.googleLogin,
          method: 'post',
          data: {
            code: this.phone,
            token: this.googleAccountToken
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
            showToast('login was successful，draw on')
            this.show = false
            this.$emit('loginSuccess')
          }
        }
      } catch (e) {

      }
    },
    async createNewUser() {
      try {

        let bxmId = ''

        // 获取由全部参数组成的字符串。
        let query = window.location.search.substring(1);
        // 分割参数，得到每一个参数字符串组成的数组。
        let vars = query.split('&');
        // 遍历数组，得到每一个参数字符串。
        for (let i = 0; i < vars.length; i++) {
          // 分割每一个参数字符串，得到参数名和参数值组成的数组。
          var pair = vars[i].split('=');
          // 如果参数名等于传入的param，则返回该值。
          if (pair[0] == 'bxm_id') {
            bxmId = decodeURI(pair[1])
          }
        }

        const {code} = await this.$request({
          url: API.createNewUser,
          method: 'post',
          data: {
            bxm_id: bxmId
          }
        })
        if (code === 0) {
          window.localStorage.setItem('userType', '1')
          showToast('login was successful，draw on')
          this.show = false
          this.$emit('loginSuccess')
        }
      } catch (e) {

      }
    },

    goRules(type) {
      window.location.href = type === 1 ? 'https://www.manghehe.com/agreement/UserAgreement.html' : 'https://www.manghehe.com/agreement/PrivacyAgreement.html'
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
  height: 900px;
  padding-top: 50px;
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
    font-size: 22px;
    color: #a15f00;
    margin: 10px 0;

    .time {
      font-size: 22px;
      color: #a15f00;
    }
  }

  .form {
    .content {
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
        padding: 10px;
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
    margin-top: 10px;
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
    font-size: 30px;
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
