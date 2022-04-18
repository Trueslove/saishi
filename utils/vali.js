//验证
var wxapi = require('./wxapi')

var vail = function(fn){
  return {
    empty : function(d,msg,b,status){
      if (!d) {
        wxapi.dialog("", (status ? '' : (b ? "请" + b : "请输入")) + msg)
        return false
      }
      return true
    },
    //
    card : function(d,msg){
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(!d){
        wxapi.dialog("", "请输入" + msg)
        return false
      } else if (!reg.test(d)){
        wxapi.dialog("", msg + "格式错误")
        return false
      }
      return true
    },
    //
    compare : function(a,b){
      if (a && b && parseInt(a.indexOf("-") > -1 ? a.split("-").join("") : a.split(".").join("")) > parseInt(b.indexOf("-") > -1 ? b.split("-").join("") : b.split(".").join(""))){
        wxapi.dialog("", "时间选择范围错误")
        return false
      }
      return true
    },
    noWord: function(str,msg){
      var reg = /[\u4e00-\u9fa5]/
      if (!str) {
        wxapi.dialog("", "请输入" + msg)
        return false
      } else if (reg.test(str)){
        wxapi.dialog("", msg + "格式错误")
        return false
      }
      return true
    },
    tel: function(str,msg){
      var reg = /\d{11}/
      if (!str) {
        wxapi.dialog("", "请输入" + msg)
        return false
      } else if (!reg.test(str)) {
        wxapi.dialog("", msg+"格式错误")
        return false
      }
      return true
    },
  }
}()
module.exports = vail