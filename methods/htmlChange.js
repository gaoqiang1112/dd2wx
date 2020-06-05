var fs = require('fs');
var path = require('path');
var readline = require('readline');
var os = require('os');

function changeHtml(filedir,projectName,NEWPROJECTENDSTR) {
    return new Promise(function (resolve,reject) {
        var fRead = fs.createReadStream(filedir); // 创建可读流
        var reg =new RegExp(projectName);
        var fWrite = fs.createWriteStream(filedir.split(".")[0].replace(reg,projectName+NEWPROJECTENDSTR)+'.wxml');

        var objReadline = readline.createInterface({
            input: fRead,
        });

        objReadline.on('line', function(line){
            var rule = [
                // {reg:/dd/,target:"wx"},
                {reg:/onTap/g,target:"bindtap"},
                {reg:/.axml/g,target:".wxml"},
                {reg:/onBlur/g,target:"bindblur"},
                {reg:/ a:/g,target:' wx:'},
                {reg:/`.*?`/g,target:function(item){
                    return "'"+item.slice(1,item.length-1).replace(/\$\{/g,'\'+').replace(/\}/g,'+\'')+'\''
                }},
                {reg:/formType/g,target:"form-type"},
                {reg:/onSubmit/g,target:"bindsubmit"},
                {reg:/onReset/g,target:"bindreset"},
                {reg:/onChange/g,target:"bindchange"},
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
exports._h = changeHtml