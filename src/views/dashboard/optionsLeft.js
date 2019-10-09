import rem from '../../utils/bigData/rem'

const oneOption = {
  grid: {
    left: 0,
    right: 8,
    top: 15,
    bottom: 0,
    containLabel: true
  },
  tooltip: {
    trigger: 'item',
    textStyle: {
      fontSize: rem.getDynamicSize(18)
    }
  },
  xAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#00C0FF'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      margin: 23,
      interval: 0,
      color: '#fff',
      fontSize: rem.getDynamicSize(16)
    }
  },
  yAxis: {
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
      color: '#fff'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#00C0FF'
      }
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#00C0FF'
      }
    }
  },
  series: [
    {
      name: '',
      type: 'pictorialBar',
      symbolSize: [20, 10],
      symbolOffset: [0, -5],
      symbolPosition: 'end',
      z: 12,
      itemStyle: {
        normal: {
          color: '#14b1eb'
        }
      },
      label: {
        normal: {
          show: true,
          position: 'top',
          color: '#fff',
          fontSize: rem.getDynamicSize(15)
        }
      }
    },
    {
      name: '',
      type: 'pictorialBar',
      symbolSize: [20, 10],
      symbolOffset: [0, 5],
      z: 12,
      itemStyle: {
        normal: {
          color: '#14b1eb'
        }
      }
    },
    {
      name: '',
      type: 'pictorialBar',
      symbolSize: [45, 25],
      symbolOffset: [0, 20],
      z: 10,
      itemStyle: {
        normal: {
          color: 'transparent',
          borderColor: '#14b1eb',
          borderType: 'dashed',
          borderWidth: 5
        }
      }
    },
    {
      name: '贷款区域',
      type: 'bar',
      itemStyle: {
        normal: {
          color: '#00C0FF',
          opacity: 0.7
        }
      },
      barWidth: 20
    }
  ]
}

const setOneOption = (data) => {
  const x = []
  data.map((item) => x.push(item.name))
  const series = []

  for (let i = 0; i < oneOption.series.length; i += 1) {
    const item = oneOption.series[i]
    series.push({
      ...item,
      data
    })
  }

  const ret = {
    ...oneOption,
    xAxis: {
      ...oneOption.xAxis,
      data: x
    },
    series
  }
  return ret
}

const twoOption = {
  grid: {
    containLabel: true,
    top: 15,
    left: 0,
    right: 8,
    bottom: 0
  },
  legend: {
    borderRadius: 0,
    top: -5,
    right: 8,
    textStyle: {
      color: 'white',
      fontSize: rem.getDynamicSize(14)
    }
  },
  tooltip: {
    show: true,
    // backgroundColor: '#fff',
    // borderColor: '#ddd',
    // borderWidth: 1,
    textStyle: {
      color: 'white',
      fontSize: rem.getDynamicSize(18)
    },
    formatter: (p) => `${p.name}<br>${p.seriesName}：${p.data.realVal}（${p.value}%）`
    // extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)',
  },
  xAxis: {
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    min: 0,
    max: 100
  },
  yAxis: {
    // offset: 115,
    axisLabel: {
      fontSize: rem.getDynamicSize(18),
      color: '#00FFFF'
      // align: 'left',
      // margin: 20,
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  series: {
    type: 'bar',
    stack: '2',
    label: {
      normal: {
        show: true,
        position: 'bottom',
        textStyle: {
          color: '#fff',
          fontSize: rem.getDynamicSize(16)
        }
      }
    },
    legendHoverLink: false,
    barWidth: 12,
    itemStyle: {
      normal: {},
      emphasis: {}
    },
    data: [],
    zlevel: 10
  }
}

const allBar = {
  name: '1000',
  type: 'bar',
  barGap: '-100%',
  barWidth: 12,
  itemStyle: {
    normal: {
      color: '#484D55'
    },
    emphasis: {
      color: '#484D55'
    }
  },
  tooltip: {
    show: false
  },
  xAxisIndex: 0,
  zlevel: 5
}

const setTwoOption = (datas, keyBar) => {
  const data = datas.reverse()
  const y = []
  data.map((item) => y.push(item.name))
  const series = [{ ...allBar, data: new Array(data.length).fill(100) }]
  const color = ['#F1BB4C', '#E82E2E', '#52ACFF']
  for (let i = 0; i < keyBar.length; i += 1) {
    const myarr = []
    data.map(
      (item) =>
        // eslint-disable-next-line
        myarr.push({
          ...item,
          realVal: item[keyBar[i]],
          value: ((item[keyBar[i]] / item.num) * 100).toFixed(2)
        }),
      // eslint-disable-next-line
    );
    series.push({
      ...twoOption.series,
      name: keyBar[i],
      label: {
        ...twoOption.series.label,
        normal: {
          ...twoOption.series.label.normal,
          formatter: (params) => {
            if (Number(params.value) !== 0 && params.data.realVal) {
              const val = params.data.realVal
              console.log(val)
            }
            return ''
          }
        }
      },
      itemStyle: {
        normal: {
          color: color[i]
        },
        emphasis: {
          color: color[i]
        }
      },
      data: myarr
    })
  }
  const ret = {
    ...twoOption,
    legend: {
      ...twoOption.legend,
      data: keyBar
    },
    yAxis: {
      ...twoOption.yAxis,
      axisLabel: {
        ...twoOption.yAxis.axisLabel,
        formatter: (name) => {
          const obj = data.filter((item) => item.name === name)[0]
          return `${obj.name} {b|${obj.num} (${obj.unit})}`
        },
        rich: {
          b: {
            fontSize: rem.getDynamicSize(16),
            color: '#fff'
          }
        }
      },
      data: y
    },
    series
  }
  return ret
}

const threeOption = {
  color: ['#3BAFFF', '#3FEED4', '#00D488', '#F1BB4C', '#4387FD'],
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}头 ({d}%)',
    textStyle: {
      color: 'white',
      fontSize: rem.getDynamicSize(18)
    }
  },
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    containLabel: true
  },
  series: [
    // 主要展示层的
    {
      radius: ['0%', '70%'],
      center: ['50%', '60%'],
      type: 'pie',
      itemStyle: {
        normal: {}
      },
      label: {
        normal: {
          opacity: 1,
          show: true,
          formatter: '{b|{b}}\n{hr|}\n{c|{c}}',
          rich: {
            b: {
              fontSize: rem.getDynamicSize(15),
              color: '#fff',
              align: 'left',
              padding: 2
            },
            hr: {
              backgroundColor: '#3FEED4',
              width: '100%',
              borderWidth: 1,
              height: 1,
              padding: -1
            },
            c: {
              fontSize: rem.getDynamicSize(15),
              color: '#fff',
              align: 'center',
              padding: 2
            }
          },
          textStyle: {
            color: '#fff',
            fontWeight: 'normal'
          }
        }
      },
      labelLine: {
        normal: {
          show: true,
          color: '#fff',
          length: 10,
          length2: 5,
          align: 'right'
        },
        emphasis: {
          show: true
        }
      },
      data: []
    },
    // 边框的设置
    {
      radius: ['70%', '80%'],
      center: ['50%', '60%'],
      type: 'pie',
      label: {
        normal: {
          show: false,
          color: '#fff'
        },
        emphasis: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      animation: false,
      tooltip: {
        show: false
      },
      itemStyle: {
        // normal: {
        //   color: 'rgba(250,250,250,0.8)',
        // },
        // color: 'rgba(250,250,250,0.8)',
        opacity: 0.3
      },
      data: []
    }
  ]
}

const setThreeOption = (data) => {
  const series = []

  for (let i = 0; i < threeOption.series.length; i += 1) {
    const item = threeOption.series[i]
    series.push({
      ...item,
      data
    })
  }
  const ret = {
    ...threeOption,
    series
  }
  return ret
}

export default {
  setOneOption,
  setTwoOption,
  setThreeOption
}
