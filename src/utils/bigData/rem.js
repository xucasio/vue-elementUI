const setDynamicSize = (val) => {
  localStorage.setItem('maoniu-scale', val)
}
const getDynamicSize = (size) => {
  const scale = localStorage.getItem('maoniu-scale')
  if (!scale) {
    return size
  }
  return Math.ceil((size / 75) * localStorage.getItem('maoniu-scale'))
}

const setRemInit = () => {
  // postcss-px2rem的内容
  // 基准大小
  const baseSize = 75
  // 设置 rem 函数
  const setRem = () => {
    // 当前页面宽度相对于 1920 宽的缩放比例，可根据自己需要修改。
    const clientWidth = document.documentElement.clientWidth
    if (clientWidth > 1000) {
      const scale = clientWidth / 1920
      // 设置页面根节点字体大小
      document.documentElement.style.fontSize = `${baseSize * scale}px`
      // 这个if语句代码，是用来控制屏幕的最小宽度，不需要可以可以不写
      // if (Number(document.documentElement.style.fontSize.slice(0, -2)) <= 130) {
      //   document.documentElement.style.fontSize = '130px';
      // }
      setDynamicSize(baseSize * scale)
    }
  }
  // 初始化
  setRem()
  // 改变窗口大小时重新设置 rem
  window.addEventListener('resize', setRem)
}

export default { setRemInit, getDynamicSize }
