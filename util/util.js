var fs = require('fs');

function changeKey4Json(json,oddkey,newkey){
    var val=json[oddkey];
    delete json[oddkey];
    json[newkey]=val;
}
function delJosnKey(json,key){
    delete json[key];
}
function copyFolder(from, to) {        // 复制文件夹到指定目录
    var files = [];
    if (fs.existsSync(to)) {           // 文件是否存在 如果不存在则创建
        files = fs.readdirSync(from);
        files.forEach(function (file, index) {
            var targetPath = from + "/" + file;
            var toPath = to + '/' + file;
            if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
                copyFolder(targetPath, toPath);
            } else {                                    // 拷贝文件
                fs.copyFileSync(targetPath, toPath);
            }
        });
    } else {
        fs.mkdirSync(to);
        copyFolder(from, to);
    }
}

function delPath(path){

    var info=fs.statSync(path);
    console.info(info)
    if(info.isDirectory()){//目录
        var data=fs.readdirSync(path);
        if(data.length>0){
            for (var i = 0; i < data.length; i++) {
                delPath(`${path}/${data[i]}`); //使用递归
                if(i==data.length-1){ //删了目录里的内容就删掉这个目录
                    delPath(`${path}`);
                }
            }
        }else{
            fs.rmdirSync(path);//删除空目录
        }
    }else if(info.isFile()){
        fs.unlinkSync(path);//删除文件
    }
}

exports.changeKey4Json = changeKey4Json
exports.delJosnKey = delJosnKey
exports.copyFolder = copyFolder
exports.delPath = delPath
