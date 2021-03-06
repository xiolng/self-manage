const pie = (ecData) => {
  return {
    // title: {
    //   text: `${ecData.title}`,
    //   subtext: ecData.subTitle || '',
    //   x: 'center',
    //   textStyle: {
    //     fontSize: 20,
    //     color: '#666',
    //     fontWeight: 'normal'
    //   }
    // },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      type: 'scroll',
      // orient: 'vertical',
      right: 'auto',
      top: 10,
      bottom: 20,
      data: ecData.data.map(v => v.name)

      // selected: this.ecData
    },
    cursor: ecData.cursor || 'init',
    series: [
      {
        name: ecData.toolTitle,
        type: 'pie',
        radius: '66%',
        center: ['50%', '60%'],
        data: ecData.data,
        label: {
          normal: {
            show: true,
            formatter: `{b}\n{c}${ecData.tipTxt || ''}`
          }
        },
        labelLine: {
          show: true
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}

const bar = (ecData) => {
  return {
    // title: {
    //   text: `${ecData.mmdd[0]}--${ecData.mmdd[ecData.mmdd.length - 1]}${ecData.title}`,
    //   // subtext: '纯属虚构',
    //   x: 'center',
    //   textStyle: {
    //     fontSize: 20,
    //     color: '#666',
    //     fontWeight: 'normal'
    //   }
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      type: 'scroll',
      // orient: 'vertical',
      right: 10,
      top: 30,
      data: ecData.itemName

      // selected: this.ecData
    },
    calculable: true,
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,
          rotate: 45
        },
        minInterval: 5,
        data: ecData.mmdd
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [{
      data: ecData.data.map(v => v.value),
      type: 'bar'
    }]
  }
}
const line = (ecData) => {
  return {
    // title: {
    //   text: `${ecData.mmdd[0]}--${ecData.mmdd[ecData.mmdd.length - 1]}${ecData.title}`,
    //   // subtext: '纯属虚构',
    //   x: 'center',
    //   textStyle: {
    //     fontSize: 20,
    //     color: '#666',
    //     fontWeight: 'normal'
    //   }
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      type: 'scroll',
      // orient: 'vertical',
      top: 30,
      data: ecData.data.map(v => v.name)

      // selected: this.ecData
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ecData.mmdd
      }
    ],
    yAxis: {
      type: 'value'
    },
    series: [{
      data: ecData.data.map(v => v.value),
      type: 'line'
    }]
  }
}
export { pie, bar, line }
