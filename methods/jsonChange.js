var fs = require('fs');
var path = require('path');
var readline = require('readline');
var os = require('os');
var {changeKey4Json,delJosnKey} = require("../util/util.js")

function changeJson(filedir,projectName,fileNamePre,NEWPROJECTENDSTR) {
    return new Promise(function (resolve,reject) {
        var reg =new RegExp(projectName);
        var newPath = filedir.split(".")[0].replace(reg,projectName+NEWPROJECTENDSTR)+'.json';
        switch(fileNamePre) {
            case "app":
                // var fRead = fs.createReadStream(filedir); // 创建可读流
                // var fWrite = fs.createWriteStream(newPath);
                // var objReadline = readline.createInterface({input: fRead});
                // objReadline.on('line', function(line){
                //     var rule = [
                //         {reg:/item/,target:"wx"},
                //     ]
                //     for(var i=0;i<rule.length;i++){
                //         line = line.replace(rule[i].reg,rule[i].target)
                //     }
                //     fWrite.write(line + os.EOL); // 下一行
                // });
                // objReadline.on('close',function () {
                //     resolve(true)
                // });
                var content = JSON.parse(fs.readFileSync(filedir))
                changeKey4Json(content['tabBar'],'items','list')
                changeKey4Json(content['tabBar'],'textColor','color')
                content['tabBar']['list'].forEach((item,index)=>{
                    changeKey4Json(item,'icon','iconPath')
                    changeKey4Json(item,'activeIcon','selectedIconPath')
                    changeKey4Json(item,'name','text')
                })
                changeKey4Json(content['window'],'titleBarColor','navigationBarBackgroundColor')
                changeKey4Json(content['window'],'defaultTitle','navigationBarTitleText')
                changeKey4Json(content['window'],'pullRefresh','enablePullDownRefresh')
                delJosnKey(content['window'],'allowsBounceVertical')
                fs.writeFileSync(newPath,JSON.stringify(content))
                break;
            default:
                var content = JSON.parse(fs.readFileSync(filedir))
                changeKey4Json(content,'defaultTitle','navigationBarTitleText')
                fs.writeFileSync(newPath,JSON.stringify(content))
                // fs.copyFileSync(filedir,newPath)
                break;
        }
    })
}
exports._json = changeJson