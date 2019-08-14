
import rem from '../../utils/bigData/rem'
// const geoCoordMap = {
//   海南藏族自治州: [100.619542, 36.280353],
//   海东市: [102.10327, 36.502916],
//   黄南藏族自治州: [102.019988, 35.517744],
//   西宁市: [101.778916, 36.623178],
//   果洛藏族自治州: [100.242143, 34.4736],
//   海北藏族自治州: [100.901059, 36.959435],
//   玉树藏族自治州: [97.008522, 33.004049],
//   海西蒙古族藏族自治州: [97.370785, 37.374663],
// };

// const convertData = (data) => {
//   const ret = [];
//   for (let i = 0; i < data.length; i += 1) {
//     const item = data[i];
//     if (item.value) {
//       ret.push({
//         ...item,
//         value: [...geoCoordMap[item.name], item.value],
//       });
//     }
//   }
//   return ret;
// };

const mapOption = {
  title: {
    text: '牦牛养殖分布',
    left: 10,
    top: 10,
    textStyle: {
      color: '#fff',
      fontSize: rem.getDynamicSize(27),
      fontWeight: 'normal'
    }
  },
  tooltip: {
    show: true,
    trigger: 'item',
    textStyle: {
      color: 'white',
      fontSize: rem.getDynamicSize(18)
    },
    formatter: (params) => {
      console.log()
      // return `${params.seriesName}${params.value[3]}<br>牦牛：${params.value[2]}头`;
      return `牦牛：${params.value[2]}头`
    }
  },
  geo: {
    map: '青海市',
    selectedMode: 'single',
    label: {
      show: true,
      color: 'white',
      fontSize: rem.getDynamicSize(16)
    },
    scaleLimit: { min: 0.8 },
    itemStyle: {
      normal: {
        areaColor: '#1d3969',
        borderColor: '#3fdaff',
        borderWidth: 2,
        shadowColor: 'rgba(63, 218, 255, 0.5)',
        shadowBlur: 30
      },
      emphasis: {
        areaColor: '#1d3969'
      }
    },
    emphasis: {
      label: {
        show: true,
        color: '#fff'
      },
      itemStyle: {
        areaColor: '#1d3969'
      }
    },
    roam: true,
    zoom: 1.2
  },
  series: [
    {
      name: '社区点',
      type: 'scatter',
      coordinateSystem: 'geo',
      color: 'yellow',
      symbolSize: (value) => value[2] / 8,
      tooltip: {
        show: true
      },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          color: (params) => {
            let ret = 'rgba(209,250,12,0.8)'
            if (params.value[2] > 180) {
              ret = 'rgba(209,250,12,0.8)'
            }
            console.log()
            return ret
          }
        }
      },
      zlevel: 1
    },
    {
      name: '社区点',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      symbolSize: (val) => val[2] / 10,
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    }
  ]
}
const sum = (m, n) => {
  const num = Math.floor(Math.random() * (m - n) + n)
  return num
}
const setMapOption = (data) => {
  const scatterArr = []
  const mapArr = []
  for (let j = 0; j < data.length; j += 1) {
    mapArr.push({ ...data[j], value: data[j].value.length })
    console.log(mapArr)
    for (let m = 0; m < data[j].value.length; m += 1) {
      const item = data[j].value[m]
      scatterArr.push([...item, sum(20, 200), scatterArr.length])
    }
  }
  // 取最大值
  // const max = Math.max.apply(null, data.map((item) => item.value.length))
  // const min = Math.min.apply(null, data.map((item) => item.value.length))
  const series = []

  for (let i = 0; i < mapOption.series.length; i += 1) {
    const item = mapOption.series[i]

    series.push({
      ...item,
      data:
        item.type === 'scatter' ? scatterArr : scatterArr.sort((a, b) => b[2] - a[2]).slice(0, 5)
    })
  }

  const ret = {
    ...mapOption,
    series
  }
  console.log(ret)
  return ret
}

export default {
  setMapOption
}
