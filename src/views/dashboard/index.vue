<template>
  <div id="screen">
    <div id="screen-bg">
      <div class="screen-top">
        <div class="top-bg top-bg-left" />
        <div class="top-center">青海省牦牛供应链金融专题展示</div>
        <div class="top-bg top-bg-right" />
      </div>
      <div class="screen-content">
        <Left :resize-index="resizeIndex" class="flex-1" />
        <Middle :resize-index="resizeIndex" class="flex-2" />
        <Right :resize-index="resizeIndex" class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script>
import '@/utils/bigData/convert' // 引入js公共方法
import Left from './Left'
import Middle from './Middle'
import Right from './Right'
import '@/assets/bigData/reset.css'

export default {
  components: {
    Left,
    Middle,
    Right
  },
  data() {
    return {
      resizeIndex: 0
    }
  },
  mounted() {
    const fun = window.onresize
    window.onresize = () => {
      if (typeof fun === 'function') {
        fun()
      }
      this.resizeIndex += 1
    }
  },
  methods: {
    getChart() {}
  }
}
</script>

<style scoped lang="scss">
#screen{
  position: relative;
  min-height: calc(100vh - 84px);
  #screen-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // width: 1920px;
    // height: 1080px;
    // overflow: auto;
    // position: absolute;
    // background-image: url('../../assets/bg.jpg');
    background-image: url('../../assets/bigData/01.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .screen-top {
      width: 100%;
      height: 70px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .top-bg {
        height: 5px;
        width: 50%;
        flex: 1;
        background: linear-gradient(-90deg, rgba(38, 152, 212, 0.01) 0%,rgba(38, 152, 212, 0.4) 50%, rgba(0, 255, 240, 0.8) 100%);
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: -1px;
          top: 0;
          width: 5px;
          height: 35px;
          top: -14px;
          background: rgba(0, 255, 240, 0.9);
        }
      }
      .top-bg-left {
        transform: rotate(180deg);
      }
      .top-center {
        font-size: 34px;
        background: linear-gradient(-90deg, rgba(38, 152, 212, 1) 0%, rgba(0, 255, 240, 1) 100%);
        background-clip: text;
        color: transparent;
        margin: 0 20px;
      }
    }
    .screen-content {
      display: flex;
      flex-direction: row;
      position: absolute;
      top: 70px;
      bottom: 15px;
      left: 15px;
      right: 15px;
      z-index: 0;
      /deep/ .title {
        display: flex;
        align-items: center;
        padding-bottom: 5px;
        font-size: 26px;
        height: 28px;
        background-position: right center;
        background-repeat: no-repeat;
        background-size: inherit;
        background-image: url('../../assets/bigData/2_06.png');
        color: #fff;
      }
      /deep/ .summary,
      /deep/ .money {
        padding: 5px 0;
        font-size: 16px;
        color: #00ffff;
        .num {
          color: white;
          font-size: 24px;
        }
        .tip {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.75);
        }
      }
      /deep/ .money {
        text-align: center;
        .money-name {
          border-bottom: 1px solid #00ffff;
          padding-bottom: 5px;
        }
        .money-value {
          color: white;
          padding-top: 5px;
        }
      }
    }
  }
}

</style>
