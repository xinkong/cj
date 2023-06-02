<template>
    <div class="van-mech">
      <div class="van-slots-box">
        <div class="van-slot-box" v-for="item in slots" :key="item.title">
          <div class="van-slot-box-inner">
            <div class="van-slot-items" :style="{transform: 'translateY('+item.trans+'px)'}">
              <!--开头补一个-->
              <div class="van-slot-item-wrap">
                <div class="van-slot-item">
                  <img :src="item.items[item.items.length-1].picUrl" alt="">
                </div>
              </div>
              <div v-for="(sitem, index) in item.items" :key="index" class="van-slot-item-wrap">
                <div class="van-slot-item">
                  <img :src="sitem.picUrl" alt="">
                </div>
              </div>
              <div v-for="(sitem, index) in item.items" :key="index" class="van-slot-item-wrap">
                <div class="van-slot-item">
                  <img :src="sitem.picUrl" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {closeToast, showLoadingToast} from 'vant'
import API from "../utils/api";

(function() {
  var lastTime = 0;
  var vendors = ["webkit", "moz"];
  for (var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
    requestAnimationFrame = vendors[x] + "RequestAnimationFrame";
    cancelAnimationFrame =
        vendors[x] + "CancelAnimationFrame" ||
        vendors[x] + "CancelRequestAnimationFrame";
  }
  if (!requestAnimationFrame)
    requestAnimationFrame = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  if (!cancelAnimationFrame)
    cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
})();
const nextRound =
    typeof window === "object" && window.requestAnimationFrame
        ? window.requestAnimationFrame
        : requestAnimationFrame;

export default {
  name: "cj",
  data: function() {
    return {
      slots: [
        // 抽奖数据分组
        {
          trans: 0,
          title: '1',
          items: [
            { name: "1", bg: "red" },
            { name: "2", bg: "orange" },
            { name: "3", bg: "blue" },
            { name: "4", bg: "orange" }
          ]
        },
        {
          trans: 0,
          title: '2',
          items: [
            { name: "1", bg: "red" },
            { name: "2", bg: "orange" },
            { name: "3", bg: "blue" },
            { name: "4", bg: "orange" }
          ]
        },
        {
          trans: 0,
          title: '3',
          items: [
            { name: "1", bg: "red" },
            { name: "2", bg: "orange" },
            { name: "3", bg: "blue" },
            { name: "4", bg: "orange" }
          ]
        }
      ],
      slotsIndex: [0, 0, 0], // 中奖索引值
      slotsOpts: null, // 抽奖临时内存区
      slotsStartedAt: null, // 动画内存区
      allGoods: []
    };
  },
  watch: {
    // 指定中奖项
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  methods: {
    getRanArr() {
      const _arr = [];
      for (let i = 0; i < 3; i++) {
        const _rd = Math.random() * 3;
        _arr.push(Math.floor(_rd));
      }
      return _arr;
    },
    // 获取信息
    async getData() {
      try {
        const { code, data } = await this.$request({
          url: API.getBoxGoodsList,
          method: 'post',
          data: {
            pageSize: 50,
            pageNum: 1
          }
        })
        if (code === 0) {
          this.allGoods = data || []
          this.slots.forEach(item => {
            item.items = this.allGoods
          })
        }
      } catch (e) {
      }
    },

    /**
     * 点击抽奖
     * winInfo: 当前中奖商品信息
     */
    async start(winInfo) {
      const that = this;
      //  如果在抽奖中...不能点击
      if (that.slotsOpts) {
        return false;
      }
      const { returnObject } = winInfo
      //[{"gradeCode":20,"goodsCode":"BAH80","goodsTitle":"格卡诺网红电吹风 吹风筒（太空灰）","goodsPics":"https://boxpic.manghehe.com/product/goods/listpic/eQTIbOnVxf42TweXgvpUog==_1683686898620_2d34e187-0cb7-4e21-b93a-45b3b4af9641.png!gsv","price":79.00,"symbol":"¥","certifiedUrl":"https://item.jd.com/10038448313512.html"}]
      const winGoods = returnObject[0]
      const index = this.allGoods.findIndex(item => item.code === winGoods.goodsCode)
      if(index > -1){ //当前商品列表有
        this.slotsIndex = [index, index, index]
      } else {
        const { goodsCode, goodsPics } = winGoods
        const winItem = {...winGoods, code: goodsCode, picUrl: goodsPics }
        this.slots.forEach(item => {
          item.items = [ ...this.allGoods, winItem ]
        })
        console.log(this.allGoods, this.slots)
        this.allGoods.push(winItem) //最后一位
        const winIndex = this.allGoods.length - 1
        this.slotsIndex = [winIndex, winIndex, winIndex]
      }

      // 每一个奖品标签的高度，根据实际高度变化(注意 margin 和 padding)
      let element = this.$el.querySelector('.van-slot-item')
      let oStyle = element.currentStyle?obj.currentStyle:window.getComputedStyle(element, null);
      const itemHeight = parseFloat(oStyle.height);
      that.slotsOpts = that.slots.map((data, i) => {
        let choice = that.slotsIndex[i]; // 中奖了，根据序列返回结果
        if (that.slotsIndex[0] === -1) {
          choice = Math.floor(Math.random() * data.items.length); // 没中奖，随机返回结果
        }
        // 初始化定义动画动作结果
        return {
          finalPos: choice * itemHeight, // 最终转动位置
          startOffset: 8000 + Math.random() * 500 + i * 1600, // 影响转的圈数
          height: data.items.length * itemHeight, // 总长度
          duration: 5000 + i * 3500, // 持续时间，每一个奖品持续8秒，以此累加
          isFinished: false // 是否完成了
        };
      });

      nextRound(that.slotsAnimate); // 开启抽奖动画
    },

    /**
     * 抽奖动画
     * @param  {[number]}   timestamp 当前的方法持续的毫秒数
     */
    slotsAnimate: function(timestamp) {
      // 是否已经在转动了
      if (this.slotsStartedAt === null) {
        this.slotsStartedAt = timestamp; // 动画初始时间
      }

      const timeDiff = timestamp - this.slotsStartedAt; // 动画持续的时间

      this.slotsOpts.forEach((opt, i) => {
        // 完成后停止转动
        if (opt.isFinished) {
          return false;
        }

        const timeRemaining = Math.max(opt.duration - timeDiff, 0); // 总的持续时间 - 动画持续时间 = 剩下的时间,0表示结束
        const power = 3; // 动画转动的力度
        const offset =
            (Math.pow(timeRemaining, power) / Math.pow(opt.duration, power)) *
            opt.startOffset; // 偏移量
        const pos = -1 * Math.floor((offset + opt.finalPos) % opt.height); // 转动值

        // 如果持续时间大于总持续时间，则该项表示完成
        if (timeDiff > opt.duration) {
          opt.isFinished = true;
        }

        // 得到转动数据
        this.slots[i].trans = pos;
      });

      // 当所有项已经完成，则停止转动，回归初始状态
      if (this.slotsOpts.every(o => o.isFinished)) {
        this.slotsOpts = null;
        this.slotsStartedAt = null;
        this.$emit('prizeFinished')
      } else {
        // 否则继续转动
        nextRound(this.slotsAnimate);
      }
    }
  }
};
</script>
<style lang="scss"  scoped>
.van-mech {
  min-height: 320px;
}

.van-slots-box {
  display: flex;
  justify-content: center;
}

.van-slot-box {
  width: 180px;
  height: 320px;
  background: url("../assets/img/gundong-bg.png") no-repeat center;
  background-size: 100% 100%;
  margin-right: 6px;
  &:last-child {
    margin-right: 0;
  }
}

.van-slot-box-inner {
  height: 280px;
  margin: 20px 0;
  box-sizing: border-box;
  overflow: hidden;
}

.van-slot-items {
  margin-top: -280px;
  width: 180px;
  height: 280px;
  padding: 0;
}
.van-slot-item-wrap {
  overflow: hidden;
  height: 100%;
}
.van-slot-item {
  width: 180px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: auto;
    max-height: 100%;
  }
}
@keyframes sbg {
  0% {
    background-position: 100%;
  }
  50% {
    background-position: -100%;
  }
  100% {
    background-position: 0;
  }
}
</style>
