// var urlPdf = "https://wxship.xzitc.com" //正式
// var url = "https://wxship.xzitc.com/app.php" //正式
var urlPdf = "https://wxshiptest.xzitc.com" //测试
var url = "https://wxshiptest.xzitc.com/app.php" //测试

// 登录
var urlLogin = url + "?c=User&a=login"

//获取公司信息
var shipInf = url + "?c=Ship&a=index"

// 新建船舶
var newShip = url + "?c=Ship&a=addship"

// 修改船舶信息
var editShip = url + "?c=Ship&a=editship"

// 修改个性化字段信息
var later_edit_result = url + "?c=Result&a=later_edit_result"

// 获取个性化信息
var get_personality_info = url + "?c=Result&a=get_personality_info"

// 查看船舱信息
var cabinIndex = url + "?c=Cabin&a=index"

// 创建船舱
var addCabin = url + "?c=Cabin&a=addcabin"

// 新建公司
var addCompany = url + "?c=Firm&a=add"

// 修改船舱
var editCabin = url + "?c=Cabin&a=editcabin"

//作业列表
var resultList = url + "?c=Result&a=resultlist"

//备注作业
var editRemark = url + "?c=Result&a=editRemark"

//获取个性化字段
var getPersonality = url + "?c=Result&a=getpersonality"

//获取船舶名字
var shipList = url + "?c=Result&a=shiplist"

// 创建作业
var addResult = url + "?c=Result&a=addresult"

//水尺录入
var fornt = url + "?c=Result&a=fornt"

//获取舱列表
var cabinList = url + "?c=Result&a=cabinlist"

//水尺查询
var forntSearch = url + "?c=Result&a=forntsearch"

//新水尺查询
var newForntSearch = url + "?c=Result&a=Newforntsearch"

//有容量数据
var reckon = url + "?c=Result&a=reckon"

//无数据
var measure = url + "?c=Result&a=measure"

//录入书本数据(第三步)
var bookData = url + "?c=Result&a=bookdata"

//获取作业详情
var resultSearch = url + "?c=Result&a=resultsearch"

//录入容量书本数据(第四步)
var capacityData = url + "?c=Result&a=capacitydata"

//打开pdf
var pdf = url + "?c=Result&a=pdf"

//获取舱测量值
var adjustCabin = url + "?c=Result&a=adjust_cabin_list"

//批量修改舱测量值
var setAdjustCabin = url + "?c=Result&a=adjust_cabins"

//批量提交有表船舱测试数据
var batchReckon = url + "?c=Result&a=batch_reckon"

//批量提交无表船舱测试数据
var batchMeasure = url + "?c=Result&a=batch_measure"

//批量获取纵倾修正表数据
var getBook = url + "?c=Result&a=get_book_datas"

//批量提交纵倾修正表数据
var bookdata = url + "?c=Result&a=batch_bookdata"

//批量获取容量表数据
var capacityDatas = url + "?c=Result&a=get_capacity_datas"

//批量提交容量表数据
var capacity = url + "?c=Result&a=batch_capacitydata"

//获取单舱纵倾修正录入
var getBookData = url + "?c=Result&a=getBookData"

//获取单舱容量表
var getCapacityData = url + "?c=Result&a=getCapacityData"

//提交作业完成签名
var electronic_visa = url + "?c=Work&a=electronic_visa"

//提交作业评价
var evaluate = url + "?c=Work&a=evaluate"

//获取验证码
var send_sms = url + "?c=User&a=send_sms"

//效验验证码
var verify_code = url + "?c=User&a=check_verify_code"

//注册
var register = url + "?c=User&a=register"

//检查公司名称
var check_name = url + "?c=firm&a=check_name"

//完善公司信息
var perfect = url + "?c=firm&a=perfect"

//公司认领
var claimed_firm = url + "?c=firm&a=claimed_firm"

//上传舱容表文件
var claimed_file = url + "?c=upload&a=claimed_file"

var reset_status = url + "?c=User&a=reset_status"

module.exports = {
  url: url,
  batchReckon: batchReckon,
  batchMeasure: batchMeasure,
  urlPdf: urlPdf,
  urlLogin: urlLogin,
  shipInf: shipInf,
  newShip: newShip,
  editShip: editShip,
  cabinIndex: cabinIndex,
  addCabin: addCabin,
  addCompany: addCompany,
  editCabin: editCabin,
  resultList: resultList,
  editRemark: editRemark,
  getPersonality: getPersonality,
  shipList: shipList,
  addResult: addResult,
  fornt: fornt,
  cabinList: cabinList,
  forntSearch: forntSearch,
  reckon: reckon,
  measure: measure,
  bookData: bookData,
  resultSearch: resultSearch,
  capacityData: capacityData,
  pdf: pdf,
  newForntSearch: newForntSearch,
  adjustCabin: adjustCabin,
  setAdjustCabin: setAdjustCabin,
  getBook: getBook,
  bookdata: bookdata,
  capacityDatas: capacityDatas,
  capacity: capacity,
  getBookData: getBookData,
  getCapacityData: getCapacityData,
  get_personality_info: get_personality_info,
  later_edit_result: later_edit_result,
  electronic_visa: electronic_visa,
  evaluate: evaluate,
  send_sms: send_sms,
  verify_code: verify_code,
  register: register,
  check_name: check_name,
  perfect: perfect,
  claimed_firm: claimed_firm,
  claimed_file: claimed_file,
  reset_status: reset_status
}