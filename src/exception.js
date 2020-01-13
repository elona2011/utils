let timeout = true,
  timer = 0;
/**
 * 获取时间戳 只作为记录页面运行时间用
 */
export const getTimeStamp = () => {
  if (window.performance&&performance.now) return performance.now()
  return +new Date()
}
/**
 * 
 * @param {function} fn 主函数
 * @param {function} sendException 发送错误函数 param: errorMessage
 * @param {object} options   选项 
 * @param {any} options.defaultReturn   出错后默认返回值
 * @param {number} options.throttle  发送错误间隔
 * @param {function} options.exCallback  错误结束回调
 * @param {function} options.recordTime  记录时间
 */
export const tc = (fn, sendException, options = {}) => {
  return function() {
    try {
      if (typeof options.recordTime !== 'function') {
        return fn && fn.apply(window, arguments)
      }
      var start = getTimeStamp()
      var ret = fn && fn.apply(window, arguments)
      var duration = getTimeStamp() - start
      options.recordTime(duration)
      return ret
    } catch (error) {
      // if (PREPRODUCTION) {
      //   var ele = document.createElement('div')
      //   ele.innerHTML = 'catch error ' + error
      //   document.body.appendChild(ele)
      // }
      let stack = ''
      if (error.stack) {
        stack = error.stack
      } else {
        stack = '/f: ' + fn.toString() + '/c: ' + arguments.callee && arguments.callee.caller
      }

      if (timeout) {
        timeout = false
        sendException(error.description || '' + '/' + error.message + '/' + error.name + '/' + stack)
      } else {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        timeout = true
      }, options.throttle || 1000)

      options.exCallback && options.exCallback()
      return options.defaultReturn || ''
    }
  }
}
