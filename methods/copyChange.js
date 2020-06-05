var fs = require('fs');
var path = require('path');
var readline = require('readline');
var os = require('os');

function copyChange(filedir,projectName,NEWPROJECTENDSTR) {
    var reg =new RegExp(projectName);
    var newPath = filedir.split(".")[0].replace(reg,projectName+NEWPROJECTENDSTR)+'.'+filedir.split(".")[1];
    fs.copyFileSync(filedir,newPath)
}
exports._copy = copyChange