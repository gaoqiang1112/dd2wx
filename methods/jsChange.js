var fs = require('fs');
var path = require('path');
var readline = require('readline');
var os = require('os');

function changeJs(filedir,projectName,fileNamePre) {
    return new Promise(function (resolve,reject) {
        var fRead = fs.createReadStream(filedir); // 创建可读流
        var reg =new RegExp(projectName);
        var fWrite = fs.createWriteStream(filedir.split(".")[0].replace(reg,projectName+'WX')+'.js');

        var objReadline = readline.createInterface({
            input: fRead,
        });

        if(fileNamePre == 'app'){
            var pathCount = filedir.split(projectName)[1].split("\\").length-2
            var fillPath = ""
            for(var i=0;i<pathCount;i++){
                fillPath = fillPath+'../'
            }
            fWrite.write(`require("${fillPath}planB");`+os.EOL)
        }
        objReadline.on('line', function(line){
            // var tmp = 'line' + index.toString() + ':' + line;

            var rule = [
                {reg:/dd\./g,target:"wx."},
                // {reg:/.getStorageSync.*?.data/,target:function (item) {
                //     return item.slice(0,item.length-5).replace(/\{|\:|key|\}/g,'')
                // }},
                {reg:/\.getStorageSync/g,target:function (item) {
                    return '.$getStorageSync'
                }},
                {reg:/\.getStorage/g,target:function (item) {
                    return '.$getStorage'
                }},
                {reg:/\.chooseImage/g,target:function (item) {
                    return '.$chooseImage'
                }},
                {reg:/\.uploadFile/g,target:function (item) {
                    return '.$uploadFile'
                }},
                {reg:/\.(currentTarget|target)\.dataset\.[\w]{1,}/g,target:function (item) {
                    return item.split("dataset.")[0]+'dataset.'+item.split("dataset.")[1].toLowerCase()
                }},
                // {reg:/onTap/,target:"bindtap"},
                // {reg:/onBlur/,target:"bindblur"},
                // {reg:/a:/,target:'wx:'},
            ]
            for(var i=0;i<rule.length;i++){
                line = line.replace(rule[i].reg,rule[i].target)
            }
            fWrite.write(line + os.EOL); // 下一行
        });
        objReadline.on('close',function () {
            resolve(true)
        });
    })

}
exports._j = changeJs
