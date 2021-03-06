var fs = require('fs');
var path = require('path');
var readline = require('readline');
var os = require('os');

function changeCss(filedir,projectName,fileNamePre,NEWPROJECTENDSTR) {
    return new Promise(function (resolve,reject) {
        var fRead = fs.createReadStream(filedir); // 创建可读流
        var reg =new RegExp(projectName);
        var fWrite = fs.createWriteStream(filedir.split(".")[0].replace(reg,projectName+NEWPROJECTENDSTR)+'.wxss');

        var objReadline = readline.createInterface({
            input: fRead,
        });
        objReadline.on('line', function(line){
            // var tmp = 'line' + index.toString() + ':' + line;

            var rule = [
                {reg:/.acss/g,target:".wxss"},
                {reg:/(\-|\+)?\d+(\.\d+)?rem/g,target:function (item) {
                    return item.split("rem")[0]*100+'rpx'
                }},
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
exports._c = changeCss