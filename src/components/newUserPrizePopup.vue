<template>
  <Popup v-model:show="show" :style="{ background: 'transparent', margin: '0', maxWidth: '750px', left: '50%', transform: 'translate(-50%, -50%)' }">
    <div class="popup-wrap">
      <div class="login-popup">
        <img class="img-1" src="../assets/img/new-user-top-1.png" alt="">
        <div class="time-text">
          100%必中价值{{ boxSimInfo?.minPrice }}-{{ boxSimInfo?.maxPrice }}元超值商品
        </div>
        <div class="ssr-wrap">
          <div class="srr-list">
            <div :class="['ssr-item', index === active ? ' ssr-item-ssr' : '']"
                 :style="{}"
                 v-for="(item,index) in ssrList" :key="item.title"
                 @click="changData(item, index)"
            >
              <div class="wrap">
                <div class="ssr-item-title" :style="{color: item?.color }">{{item.label}}</div>
                <div class="ssr-item-value">{{item.percentage}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-wrap">
          <div class="goods-list">
            <div class="goods-item" v-for="item in goodsList" :key="item.code">
              <div class="wrap">
                <img class="goods-item-label" :src="imgUrl[item.label]" alt="">
                <img class="goods-item-img" v-if="item?.picUrl" :src="item.picUrl" alt="">
                <div class="goods-item-title van-ellipsis">{{item.title}}</div>
                <div class="goods-item-value">{{item?.symbol + item?.price}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="sub-btn" @click="sub">
          {{userType === 2 ? '下载APP享0元购':('立即抽奖 首抽0元')}}<Icon name="arrow" />
        </div>
      </div>
      <div class="close" @click="show=false">
        <img src="../assets/img/close.png" alt="">
      </div>
    </div>
  </Popup>
</template>
<script>
import {Popup, Button, Icon} from 'vant';
import API from "../utils/api";
import N from '../assets/img/N.png';
import S from '../assets/img/S.png';
import SR from '../assets/img/SR.png';
import SSR from '../assets/img/SSR.png';
import R from '../assets/img/R.png';
export default {
  components: {Icon, Popup, Button,},
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    boxSimInfo: {
      type: Object,
      default: ()=> {
        return {}
      }
    },
    userType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      imgUrl: {
        N,
        R,
        S,
        SR,
        SSR,
      },
      show: false,
      ssrList: [],
      active: 0,
      ssrColorList: [
        {
          label: 'SSR',
          code: '50',
          color: '#e46d17'
        },
        {
          label: 'SR',
          code: '40',
          color: '#7927D3'
        },
        {
          label: 'S',
          code: '30',
          color: '#2D9BD2'
        },
        {
          label: 'R',
          code: '20',
          color: '#2D9BD2'
        },
        {
          label: 'N',
          code: '10',
          color: '#BF9A30'
        }
      ],
      goodsList: []
    }
  },
  watch: {
    showPopup: {
      handler(newValue) {
        this.show = newValue
        const { gradeDTOS } = this.boxSimInfo
        this.ssrList = (gradeDTOS ||[]).map(item => {
          const { gradeCode } = item
          const itemInfo = this.ssrColorList.find(item => item.code === gradeCode)
          return {
            ...item,
            ...itemInfo
          }
        }).reverse()
        this.changData(this.ssrList[0], 0)
      },
      immediate: true
    },
    show(newVal) {
      this.$emit('update:showPopup', newVal)
    }
  },
  methods: {
    async changData(typeItem, index) {
      try {
        this.active = index
        const { code, data } = await this.$request({
          url: API.getBoxGoodsList,
          method: 'post',
          data: {
            pageSize: 12,
            pageNum: 1,
            gradeCode: typeItem.gradeCode
          }
        })
        if (code === 0) {
          this.goodsList = (data || []).map(item => {
            return {
              ...item,
              label: typeItem.label
            }
          })
          // console.log(this.goodsList)
        }
      } catch (e) {
      }
    },
    async sub() {
      if (this.userType === 2) {
        const {code, data} = await this.$request({
          url: API.downloadInfo,
          method: 'post',
          data: {
            type: 3
          }
        })
        if (code === 0) {
          this.$downLoadApp()
        }
      } else {
        this.show = false
        this.$emit('handlePrize')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.popup-wrap {
  min-height: 95vh;
}
.login-popup {
  background: transparent url("../assets/img/new-user-bg.png") no-repeat left bottom;
  background-size: 100% 98%;
  width: 704px;
  height: 1119px;
  padding-top: 54px;
  box-sizing: border-box;
  position: relative;

  .img-1 {
    width: 573px;
    height: 127px;
    display: block;
    margin: 0 auto;
  }

  .time-text {
    min-width: 530px;
    font-size: 36px;
    color: #dc462d;
    margin: 0 auto;
    font-weight: bold;
    text-align: center;
  }

  .ssr-wrap {

    .srr-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 640px;
      margin: 0 auto;

      .ssr-item {
        background: url("../assets/img/ssr-other-bg.png") no-repeat center;
        background-size: 100% 100%;
        width: 98px;
        height: 58px;
        .wrap {
          transform: scale(0.5);
          transform-origin: left top;
          width: 196px;
          height: 116px;
        }
        .ssr-item-title {
          font-size: 40px;
          line-height: 60px;
          font-weight: bold;
        }
        .ssr-item-value {
          font-size: 38px;
          color: #fff;
          font-weight: bold;
          line-height: 60px;
        }
      }
      .ssr-item-ssr {
        background: url("../assets/img/ssr-bg.png") no-repeat center;
        background-size: 100% 100%;
      }
    }

  }

  .goods-wrap {

    .goods-list {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 640px;
      margin: 0 auto;

      .goods-item {
        background: #d8b98b;
        width: 152px;
        height: 205px;
        margin-top: 13px;
        border-radius: 10px;
        margin-right: 10px;
        &:nth-child(4n+0) {
          margin-right: 0;
        }

        .wrap {
          position: relative;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }
        .goods-item-label {
          position: absolute;
          left: -2px;
          top: 5px;
          min-width: 22px;
          height: 28px;
        }
        .goods-item-img {
          width: 100px;
          height: 120px;
        }
        .goods-item-title {
          font-size: 24px;
          color: #fff;
          line-height: 32px;
          max-width: 140px;
        }
        .goods-item-value {
          font-size: 24px;
          color: #fff;
          line-height: 32px;
        }
      }
      .goods-item-ssr {
        //background: url("../assets/img/ssr-bg.png") no-repeat center;
        //background-size: 100% 100%;
      }
    }

  }

  .prize-wrap {
    width: 290px;
    height: 290px;
    border-radius: 10px;
    background-color: #d8b98b;
    margin: 80px auto 0;
  }





  .sub-btn {
    position: absolute;
    left: 50%;
    bottom: 40px;
    transform: translateX(-50%);
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
