import citys from '../chartconfig/citycode'

/**
 * @description 多个数组对应位置相加得出新的数组
 * @param {Array} rest 任意多个数组
 * @return {Array} 对应数组位置求和新的数组
 */
function sumAarrays(...rest) {
  const arrays = rest
  if (arrays.length <= 1) {
    return arrays
  }
  let sum = []
  for (let i = 0; i < arrays.length; i++) {
    const element = arrays[i]
    if (i === 0) {
      sum = element
    } else {
      sum = sumArray(sum, element)
    }
  }
  return sum
}
function sumArray(arr1, arr2) {
  return arr1.map((val, index) => Number(val) + Number(arr2[index]))
}
/**
 * @description 获取对应年月之前n个月的月份数组
 * @param {Number,String} c_year 年份
 * @param {Number,String} c_month 月份
 * @param {Number} n 数组月份数量
 * @param {String} split 分隔符
 * @param {Boolean} short_year 年份是否两位简写
 * @return {Array} 年月的数组
 */
function getMonthsArr(c_year, c_month, n = 12, c_split = '', short_year = false) {
  const dataArr = []
  const x = n
  const split = c_split
  const data = new Date(c_year, c_month - 1)
  const year = data.getFullYear()
  data.setMonth(data.getMonth() + 1, 1) //获取到当前月份,设置月份
  for (let i = 0; i < x; i++) {
    data.setMonth(data.getMonth() - 1) //每次循环一次 月份值减1
    let m = data.getMonth() + 1
    m = m < 10 ? split + '0' + m : split + m
    const y = short_year ? (data.getFullYear() + '').slice(-2) : data.getFullYear()
    dataArr.unshift(y + '' + m)
  }
  return dataArr
}
//获取参数
function getDatesParams(dates, cityCodeArr, encodeArray, chartCode, type) {
  let paramStr = '['
  for (let k = 0; k < dates.length; k++) {
    const date = dates[k]
    for (let index = 0, len = cityCodeArr.length; index < len; index++) {
      const element = cityCodeArr[index]
      for (let i = 0, len2 = encodeArray.length; i < len2; i++) {
        const ele = encodeArray[i]
        paramStr += '{"chartCode":"' + chartCode + '","idxCde":"' + ele + '","chnlType":"' + type + '","accountCode":"' + element + '","periodDate":"' + date + '","rptType":"1' + '"},'
      }
    }
  }
  paramStr = paramStr.substring(0, paramStr.length - 1)
  return paramStr + ']'
}

// 千分号显示的数据
function formatNumberRgx(num) {
  var parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
//处理返回指标值的数组数据
function handleArrdata(arr, fix = 0, isFormat = false) {
  return arr.map((ele) => {
    const val = isFormat ? formatNumberRgx(Number(ele.idxValue).toFixed(fix)) : Number(ele.idxValue).toFixed(fix)
    const t = ele
    t.idxValue = val
    t.value = val
    t.name = ele.idxName
    return t
  })
}
//处理返回多指标值的数组数据对应关系map
function handleDataEncode2Arr(arr, encodeArr, fix = 0) {
  const target = {}
  for (let i = 0; i < encodeArr.length; i++) {
    const encode = encodeArr[i]
    const t_arr = []
    for (let i = 0; i < arr.length; i++) {
      const ele = arr[i]
      if (ele.idxCde == encode) {
        const val = Number(ele.idxValue).toFixed(fix)
        const t = ele
        t.idxValue = val
        t.value = val
        t.name = ele.idxName
        t_arr.push(t)
      }
    }
    target[encode] = t_arr
  }
  return target
}
//下级地图citys和指标值，处理成地图能识别的数组,两个值的
function handleMapdata(arr, cityarr, fix = 0) {
  const t = cityarr.map((ele) => {
    const val = {
      name: ele.orgDefName,
      orgCode: ele.orgCode,
    }
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index]
      if (element.accountCode == ele.orgCode) {
        if (val.value2 === undefined) {
          val.value2 = Number(element.idxValue).toFixed(fix)
        } else {
          val.value = Number(element.idxValue).toFixed(fix)
        }
      }
    }
    return val
  })
  return t
}
function findeUpCityObj(cityTree, code) {
  for (let index = 0; index < cityTree.length; index++) {
    const l1 = cityTree[index]
    if (l1.orgCode == code) {
      return {
        parent: null,
        self: l1,
      }
    } else {
      for (let index = 0; index < l1.children.length; index++) {
        const l2 = l1.children[index]
        if (l2.orgCode == code) {
          return {
            parent: l1,
            self: l2,
          }
        } else {
          for (let index = 0; index < l2.children.length; index++) {
            const l3 = l2.children[index]
            if (l3.orgCode == code) {
              return {
                parent: l2,
                self: l3,
              }
            }
          }
        }
      }
    }
  }
}
function getBeforeMothStr(str) {
  var len = str.length
  var year = str.substring(0, len - 3)
  var month = str.substring(len - 2, len)
  year = month === '01' ? ~~year - 1 : year
  if (~~month - 1 === 0) {
    month = 12
  } else if (~~month - 1 < 10) {
    month = '0' + (~~month - 1)
  } else {
    month = ~~month - 1
  }
  return year + '-' + month
}
function beforeMonth() {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 3) {
    year -= 1
    month = 10 + month
  } else {
    month = month - 2
  }
  return month < 10 ? `${year}-0${month}` : `${year}-${month}`
}
function findMapCode(array, orgCode) {
  let t = ''
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (element.orgCode == orgCode) {
      t = element.code
      break
    } else {
      const tObj = element.children.find((val) => {
        return val.orgCode == orgCode
      })
      if (tObj) {
        t = tObj.code
      }
    }
  }
  return t
}
//获取前三级地市
function getOrgLevel(array) {
  const l1 = []
  const l2 = []
  const l3 = []
  const data = array.map((val) => {
    val.value = val.orgCode
    val.label = val.orgName
    val.orgLevel == '1' && l1.push(val)
    val.orgLevel == '2' && l2.push(val)
    val.orgLevel == '3' && l3.push(val)
    return val
  })
  l2.length > 0 &&
    l2.forEach((val, index) => {
      if (l3.length > 0) {
        l2[index].children = l3.filter((ele) => {
          return ele.orgCity == val.orgCode
        })
      }
    })
  l1[0].children = l2
  return {
    level: l1,
    allArr: data,
  }
}
export { sumAarrays, getMonthsArr, getDatesParams, handleArrdata, handleDataEncode2Arr, findeUpCityObj, handleMapdata, formatNumberRgx, getOrgLevel, getBeforeMothStr, findMapCode, beforeMonth }
