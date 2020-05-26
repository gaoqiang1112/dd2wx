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

exports.changeKey4Json = changeKey4Json
exports.delJosnKey = delJosnKey
exports.copyFolder = copyFolder
