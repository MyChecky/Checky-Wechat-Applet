const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 重复日期转化S2B
const formatRepeatDate = function(chooseDate){
  if (chooseDate.length==0){
    console.error("未选择重复日期")
    return chooseDate
  }
  var result = [0,0,0,0,0,0,0]
  for(var i = 0;i<chooseDate.length;i++){
    result[chooseDate[i]]=1
  }
  result = result.join('')
  return result
}
// 重复日期转化B2S
const formatBiDate = function(biString){
  var result = biString.split('')

  if (result.length != 7) {
    console.error("错误数据")
    return biString
  }

  var date = []
  for (var i = 0; i < 7; i++){
    if(result[i]=="1"){
      switch (i){
        case 0:
          date.push("日")
          break
        case 1:
          date.push("一")
          break
        case 2:
          date.push("二")
          break
        case 3:
          date.push("三")
          break
        case 4:
          date.push("四")
          break
        case 5:
          date.push("五")
          break
        case 6:
          date.push("六")
          break
      }
    }
    // result[i] = parseInt(result[i])
  }
  if(date.length==7){
    return ["每天"]
  }
  date = date.join('  ')
  return date
}
const dictionary = {
  pass: "通过",
  deny: "失败",
  unknown: "待认证",
  during: "进行中",
  nomatch: "未匹配",
  toProcess: "待处理",
  "0": "动态",
  "1": "打卡",
  "2": "任务",
  "3": "监督人",
}
const dataEN2CN = function(string){
  var result = dictionary[string] 
  console.log(result)
  return result
}
module.exports = {
  formatRepeatDate: formatRepeatDate,
  formatBiDate: formatBiDate,
  formatTime: formatTime,
  formatNumber: formatNumber,
  dataEN2CN: dataEN2CN
}