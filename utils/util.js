const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
// 重复日期转化
const formatRepeatDate = function(chooseDate){
  var result = [0,0,0,0,0,0,0]
  for(var i = 0;i<chooseDate.length;i++){
    result[chooseDate[i]]=1
  }
  result = result.join('')
  return result
}
module.exports = {
  formatRepeatDate: formatRepeatDate
}