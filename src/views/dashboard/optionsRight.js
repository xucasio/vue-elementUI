import echarts from '../../utils/bigData/echartsImport' //  按需引入echarts，降低打包体积
import rem from '../../utils/bigData/rem'

const fiveOption = {
  grid: {
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: true
  },
  tooltip: {
    textStyle: {
      color: 'white',
      fontSize: rem.getDynamicSize(18)
    },
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisLine: {
      // 坐标轴轴线相关设置。数学上的x轴
      show: true,
      lineStyle: {
        color: '#f9f9f9'
      }
    },
    axisLabel: {
      // 坐标轴刻度标签的相关设置
      textStyle: {
        color: '#d1e6eb',
        margin: 15
      },
      rotate: 40,
      fontSize: rem.getDynamicSize(14)
    },
    axisTick: {
      show: false
    }
  },

  yAxis: {
    name: '（人）',
    nameTextStyle: {
      color: '#fff',
      fontSize: rem.getDynamicSize(13)
    },
    type: 'value',
    min: 0,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#0a3256'
      }
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      margin: 20,
      fontSize: rem.getDynamicSize(15),
      textStyle: {
        color: '#d1e6eb'
      }
    },
    axisTick: {
      show: false
    }
  },

  series: {
    name: '牦牛贷贷款人数',
    type: 'line',
    showAllSymbol: true,
    symbol: 'emptyCircle',
    symbolSize: 6,
    lineStyle: {
      normal: {
        color: '#28ffb3' // 线条颜色
      },
      borderColor: '#f0f'
    },
    label: {
      show: true,
      position: 'top',
      fontSize: rem.getDynamicSize(15),
      textStyle: {
        color: '#fff'
      }
    },
    itemStyle: {
      normal: {
        color: '#28ffb3'
      }
    },
    areaStyle: {
      // 区域填充样式
      normal: {
        // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(0,154,120,1)'
            },
            {
              offset: 1,
              color: 'rgba(0,0,0, 0)'
            }
          ],
          false,
        ),
        shadowColor: 'rgba(53,142,215, 0.9)', // 阴影颜色
        shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
      }
    }
  }
}

const setFiveOption = (data, xData) => {
  const ret = {
    ...fiveOption,
    xAxis: {
      ...fiveOption.xAxis,
      data: xData
    },
    series: {
      ...fiveOption.series,
      data
    }
  }
  return ret
}

const sixOption = {
  grid: {
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: true
  },
  tooltip: {
    textStyle: {
      color: 'white',
      fontSize: rem.getDynamicSize(18)
    },
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    axisLine: {
      lineStyle: {
        color: '#0177d4'
      }
    },
    axisLabel: {
      color: '#fff',
      rotate: 40,
      fontSize: rem.getDynamicSize(14)
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    name: '（万元）',
    nameTextStyle: {
      color: '#fff',
      fontSize: rem.getDynamicSize(15)
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#0177d4'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: rem.getDynamicSize(15)
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#0a3256'
      }
    }
  },
  series: {
    type: 'bar',
    barWidth: 12,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: '#3FEED4'
            },
            {
              offset: 0.8,
              color: '#3BAFFF'
            }
          ],
          false,
        ),
        label: {
          show: true,
          textStyle: {
            fontSize: rem.getDynamicSize(15),
            color: '#fff'
          },
          position: 'top'
        }
      }
    }
  }
}

const setSixOption = (data, xData) => {
  const ret = {
    ...sixOption,
    xAxis: {
      ...sixOption.xAxis,
      data: xData
    },
    series: {
      ...sixOption.series,
      data
    }
  }
  return ret
}

export default {
  setFiveOption,
  setSixOption
}
