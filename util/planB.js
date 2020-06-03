function changeKey4Json(json,oddkey,newkey){
    if(json.hasOwnProperty(oddkey)){
        var val=json[oddkey];
        delete json[oddkey];
        json[newkey]=val;
    }
}
// 重写ajax请求
wx['httpRequest'] = function(params){
    changeKey4Json(params,'headers','header')
    // 修正ajax返回res的status 变成statusCode
    var successFun = params.success
    delete params['success']
    params['success'] = function (res) {
        res['status'] = res['statusCode']
        successFun(res)
    }

    var failFun = params.fail
    delete params['fail']
    params['fail'] = function (res) {
        res['status'] = res['statusCode']
        failFun(res)
    }
    wx.request(params)
}
// 重写登录获取用户唯一标识
wx['getAuthCode'] = function(params){
    wx.login(params)
}
// 重写alert事件  用wx的showModal
wx['alert'] = function(params){
    params['showCancel'] = false;
    changeKey4Json(params,'buttonText','confirmText')
    wx.showModal(params)
}
// 重写 getStorageSync 去掉key 后 包裹data层
wx['$getStorageSync'] = function(params){
    const p = params['key']
    return {data:wx.getStorageSync(p)}
}

// 重写 getStorageSync 去掉key 后 包裹data层
wx['$getStorage'] = function(params){
    // const key = params['key']   //userInfo
    params['fail'] = function (err) {
        setTimeout(function(){
            wx.$getStorage(params)
        },2000);
    }
    wx.getStorage(params)
}

// 重写 chooseImage  替换 内部的 filePaths => tempFilePaths
wx['$chooseImage'] =  function (params) {
    var successFun = params.success
    delete params['success']
    params['success'] = function (res) {
        res['filePaths'] = res['tempFilePaths']
        successFun(res)
    }
    wx.chooseImage(params)
}

// 重写 uploadFile  替换 内部的 filePaths => tempFilePaths
wx['$uploadFile'] =  function (params) {
    changeKey4Json(params,'fileName','name')
    wx.uploadFile(params)
}

// 重写 uploadFile  替换 内部的 filePaths => tempFilePaths
wx['$showToast'] =  function (params) {
    changeKey4Json(params,'content','title')
    if(params['type']){
        changeKey4Json(params,'type','icon')
    }
    wx.showToast(params)
}

// 重写扫一扫代码
wx['scan'] = function (params) {
    var type = params['type']
    var scanType = 'qrCode'
    if(type == 'bar'){
        scanType = "barCode"
    }
    params['type'] = scanType
    changeKey4Json(params,'type','scanType')
    wx.scanCode(params)
}