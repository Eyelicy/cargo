const formatTime = (date, addDayCount) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() + addDayCount
  return [year, month, day].map(formatNumber).join('-')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  title: title,
  formatTime: formatTime,
  tips: tips,
}



function isNull(name, pwd) {
  if (name == '' && pwd == '') {
    return 0;
  } else if (name == '') {
    return 1;
  } else if (pwd == '') {
    return 2;
  }
}

function title(name, pwd) {
  switch (isNull(name, pwd)) {
    case 0:
      wx.showToast({
        title: '用户名和密码不得为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      break;
    case 1:
      wx.showToast({
        title: '用户名不得为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      break;
    case 2:
      wx.showToast({
        title: '密码不得为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      break;
    default:
      return true;
  }
}

function tips(code, cabinname, sign) {
  let tipsTitle = {
    '2': '其它错误',
    '3': '数据库错误',
    '4': '参数不正确，参数缺失',
    '5': '不能含有特殊字符',
    '7': '数据格式有误',
    '1001': '用户名或密码错误',
    '1007': '此用户已在其他设备登录，请重新登录',
    '1017': '手机号格式错误',
    '1018': '短信发送失败',
    '1019': '短信发送过于频繁',
    '1020': '验证码错误',
    '2003': '重复数据，请不要重复新建作业',
    '2008': '没有作业前数据',
    '2009': '空高有误',
    '2015': '该船已过期，请更新后再作业',
    '2020': '船舱已存在',
    '2028': '不可以更改不作业的数据',
    '2034': '该作业已结束不可以操作',
    '2035': '未结束上一个作业',
    '2038': '公司正在被认领或已被认领，无法继续认领',
    '2042': '用户不可以创建多个审核'
  }
  let imei = wx.getStorageSync('imei');
  let uid = wx.getStorageSync('uid');
  if (code != 1) {
    if (cabinname) {
      console.log(tipsTitle[code])
      wx.showToast({
        title: cabinname + ":" + tipsTitle[code],
        icon: 'none',
        duration: 1000
      });
    } else {
      switch (code) {
        case 2:
          if (sign == 4) {
            // wx.showToast({
            //   title: '该船舱已被作业',
            //   icon: 'none',
            //   duration: 1000
            // })
          } else {
            wx.showToast({
              title: tipsTitle[code],
              icon: 'none',
              duration: 1000
            })
          }
          break;
        case 3:
          wx.showToast({
            title: tipsTitle[code],
            icon: 'none',
            duration: 1000
          })
          break;
        case 4:
          console.log("code:" + code)
          if (uid && imei) {
            wx.showToast({
              title: tipsTitle[code],
              icon: 'none',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: '此用户已在其他设备登录，请重新登录',
              icon: 'none',
              duration: 1000
            })
            wx.clearStorageSync();
            setTimeout(function() {
              wx.reLaunch({
                url: '../login/login'
              })
            }, 1000);
          }
          break;
        case 5:
          wx.showToast({
            title: tipsTitle[code],
            icon: 'none',
            duration: 1000
          })
          break;
        case 7:
          wx.showToast({
            title: tipsTitle[code],
            icon: 'none',
            duration: 1000
          })
          break;
        case 1001:
          wx.showToast({
            title: tipsTitle[code],
            icon: 'none',
            duration: 1000
          })
          break;
        case 1007:
          console.log("code:" + code)
          wx.showToast({
            title: tipsTitle[code],
            icon: 'none',
            duration: 1000
          })
          setTimeout(function() {
            wx.reLaunch({
              url: '../login/login'
            })
            wx.clearStorageSync();
          }, 1000);
          break;
        case 2003:
          wx.showToast({
            title: tipsTitle[code],
            icon: 'none',
            duration: 1000
          })
          break;
        case 2008:
          wx.showToast({
            title: tipsTitle[code],
            icon: 'none',
            duration: 1000
          })
          break;
        case 2009:
          wx.showToast({
            title: tipsTitle[code],
            icon: 'none',
            duration: 1000
          })
          break;
        case 2015:
          wx.showToast({
            title: tipsTitle[code],
            icon: 'none',
            duration: 1000
          })
          break;
        case 2020:
          wx.showToast({
            title: tipsTitle[code],
            icon: 'none',
            duration: 1000
          })
          break;
        case 1017:
        case 1018:
        case 1019:
        case 1020:
        case 2028:
        case 2034:
        case 2035:
        case 2038:
        case 2042:
          wx.showToast({
            title: tipsTitle[code],
            icon: 'none',
            duration: 1000
          })
          break;
      }
    }

  }
}