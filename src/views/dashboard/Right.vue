<template>
  <div class="Right">
    <div class="list-1">
      <div class="header">
        <div class="title">牦牛贷</div>
        <div class="money">
          <div class="flex money-name">
            <p class="flex-1">
              <span>贷款总额（万元）</span>
            </p>
            <p class="flex-1">
              <span>已还本息（万元）</span>
            </p>
            <p class="flex-1">
              <span>待还本息（万元）</span>
            </p>
          </div>
          <div class="flex money-value">
            <p class="flex-1">
              <span>6984</span>
            </p>
            <p class="flex-1">
              <span>820</span>
            </p>
            <p class="flex-1">
              <span>6472</span>
            </p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-1 flex-1">
          <div class="content-title">还款统计</div>
          <div ref="chartfour" class="chart chartfour" />
        </div>
        <div class="content-2 flex-1">
          <div class="content-title">贷款牧民</div>
          <div ref="chartfive" class="chart chartfive" />
        </div>
        <div class="content-3 flex-1">
          <div class="content-title">牧民分红预测</div>
          <div ref="chartsix" class="chart chartsix" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from '../../utils/bigData/echartsImport' //  按需引入echarts，降低打包体积
import optionsLeft from './optionsLeft'
import optionsRight from './optionsRight'

export default {
  components: {},
  props: {
    resizeIndex: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      chartfour: null,
      chartfive: null,
      chartsix: null
    }
  },
  watch: {
    resizeIndex() {
      this.chartResize()
    }
  },
  mounted() {
    this.chartfour = echarts.init(this.$refs.chartfour)
    this.chartfive = echarts.init(this.$refs.chartfive)
    this.chartsix = echarts.init(this.$refs.chartsix)
    this.getChart()
  },
  created() {},
  methods: {
    getMonth(month, length) {
      const mouthArr = []
      const time = new Date()
      for (let index = 0; index < length; index += 1) {
        let y = time.getFullYear()
        let m = ''
        if (month + index > 12) {
          y += 1
          m = month + index - 12 // 获取当前月份的日期 d
        } else {
          m = month + index // 获取当前月份的日期 d
        }
        mouthArr.push(`${y}-${m < 10 ? `0${m}` : m}`)
      }

      return mouthArr
    },
    getChart() {
      const four = [
        {
          name: '还款期数',
          num: 505,
          逾期: 54,
          坏账: 10,
          正常: 441,
          unit: '期'
        },
        {
          name: '应还本息',
          num: 565,
          逾期: 30,
          坏账: 15,
          正常: 520,
          unit: '万元'
        },
        {
          name: '贷款企业',
          num: 3338,
          逾期: 203,
          坏账: 135,
          正常: 3000,
          unit: '家'
        }
      ]
      const keyBar = ['逾期', '坏账', '正常']
      const optionRet = optionsLeft.setTwoOption(four, keyBar)
      optionRet.legend.top = 5
      this.chartfour.setOption(optionRet)
      const five = [
        { name: '6月', value: 2536 },
        { name: '7月', value: 3675 },
        { name: '8月', value: 4805 },
        { name: '9月', value: 6530 },
        { name: '10月', value: 7001 },
        { name: '11月', value: 9532 },
        { name: '12月', value: 10856 }
      ]
      this.chartfive.setOption(optionsRight.setFiveOption(five, this.getMonth(6, 7)))

      const six = [
        { name: '6月', value: 126 },
        { name: '7月', value: 183 },
        { name: '8月', value: 240 },
        { name: '9月', value: 326 },
        { name: '10月', value: 350 },
        { name: '11月', value: 476 },
        { name: '12月', value: 542 }
      ]
      this.chartsix.setOption(optionsRight.setSixOption(six, this.getMonth(12, 7)))
    },
    chartResize() {
      try {
        const arrEcharts = ['chartfour', 'chartfive', 'chartsix']
        for (let i = 0; i < arrEcharts.length; i += 1) {
          this[arrEcharts[i]].resize()
        }
      } catch (error) {
        console.log('chartResize error', error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Right {
  display: flex;
  flex-direction: column;
  > div {
    background-color: rgba(9, 9, 41, 0.44);
    border: 1px solid rgba(0, 255, 255, 1);
    border-radius: 6px;
    flex: 1;
    padding: 8px;
    position: relative;
  }
  .content {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 120px;
    left: 8px;
    bottom: 8px;
    right: 8px;
    .content-title {
      background: rgba(20, 73, 161, 0.5);
      padding: 5px 8px;
      color: #00ffff;
      font-size: 22px;
    }
    > div {
      position: relative;
      > .chart {
        position: absolute;
        top: 40px;
        left: 8px;
        bottom: 8px;
        right: 8px;
      }
    }
  }
}
</style>
