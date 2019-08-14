<template>
  <div class="Left">
    <div class="list-1">
      <div class="title">
        <span>贷款区域</span>
        <!-- <ul class="skewX">
          <li v-for="item in 9" :key="item"></li>
        </ul> -->
      </div>
      <div class="summary">
        贷款总额
        <span class="num">12121</span>
        <span class="tip">（万元）</span>
      </div>
      <div ref="chartone" class="chart chartone" />
    </div>
    <div class="list-2">
      <div class="title">企业贷</div>
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
            <span>0</span>
          </p>
          <p class="flex-1">
            <span>0</span>
          </p>
          <p class="flex-1">
            <span>0</span>
          </p>
        </div>
      </div>

      <div ref="charttwo" class="chart charttwo" />
    </div>
    <div class="list-3">
      <div class="title">牦牛数量统计</div>
      <div class="summary">
        采购总数
        <span class="num">13968</span>
        <span class="tip">（头）</span>
      </div>
      <div ref="chartthree" class="chart chartthree" />
    </div>
  </div>
</template>

<script>
import echarts from '../../utils/bigData/echartsImport' //  按需引入echarts，降低打包体积
import optionsLeft from './optionsLeft'

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
      chartone: null,
      charttwo: null,
      chartthree: null
    }
  },
  watch: {
    resizeIndex() {
      this.chartResize()
    }
  },
  mounted() {
    this.chartone = echarts.init(this.$refs.chartone) //    柱形
    this.charttwo = echarts.init(this.$refs.charttwo) //    柱形
    this.chartthree = echarts.init(this.$refs.chartthree) //    柱形
    this.getChart()
  },
  created() {},
  methods: {
    getChart() {
      const one = [
        { name: '果洛州', value: 1608 },
        { name: '玉树州', value: 1387 },
        { name: '海西州', value: 1349 },
        { name: '海北州', value: 1025 },
        { name: '黄南州', value: 932 },
        { name: '海南州', value: 683 }
      ]
      this.chartone.setOption(optionsLeft.setOneOption(one))
      const two = [
        {
          name: '还款期数',
          num: 0,
          逾期: 0,
          坏账: 0,
          正常: 0,
          unit: '期'
        },
        {
          name: '应还本息',
          num: 0,
          逾期: 0,
          坏账: 0,
          正常: 0,
          unit: '万元'
        },
        {
          name: '贷款企业',
          num: 0,
          逾期: 0,
          坏账: 0,
          正常: 0,
          unit: '家'
        }
      ]
      const keyBar = ['逾期', '坏账', '正常']
      this.charttwo.setOption(optionsLeft.setTwoOption(two, keyBar))
      const three = [
        { name: '0~0.5年牛龄', value: 9051 },
        { name: '0.5~1年牛龄', value: 3112 },
        { name: '1年以上', value: 837 },
        { name: '已售', value: 820 },
        { name: '病亡或丢失', value: 92 }
      ]
      this.chartthree.setOption(optionsLeft.setThreeOption(three))
    },
    chartResize() {
      try {
        const arrEcharts = ['chartone', 'charttwo', 'chartthree']
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
.skewX {
  flex: 1;
  height: 100%;
  li {
    margin-left: 10px;
    width: 6px;
    background: green;
    -webkit-transform: skewX(42deg);
    transform: skewX(42deg);
    height: 100%;
  }
}
.Left {
  display: flex;
  flex-direction: column;
  > div {
    background-color: rgba(9, 9, 41, 0.44);
    border: 1px solid rgba(0, 255, 255, 1);
    border-radius: 6px;
    flex: 1;
    padding: 8px;
    position: relative;
    > .chart {
      position: absolute;
      top: 100px;
      left: 8px;
      bottom: 8px;
      right: 8px;
    }
    .chartone {
    }
    .charttwo {
      top: 120px;
    }
    .chartthree {
    }
  }
  .list-2 {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .list-3 {
    flex: 1.3;
  }
}
</style>
