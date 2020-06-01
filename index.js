var fs = require('fs');
var path = require('path');
var readline = require('readline');
var os = require('os');
var {_h} = require("./methods/htmlChange")
var {_j} = require("./methods/jsChange")
var {_c} = require("./methods/cssChange")
var {_json} = require("./methods/jsonChange")
var {_copy} = require("./methods/copyChange")
var {copyFolder,delPath} = require("./util/util")
var {config} = require("./config")

var NEWPROJECTENDSTR = config.NEWPROJECTENDSTR
//解析需要遍历的文件夹

var inputPath = process.argv[2].split("=")[1]
var projectName = inputPath.split("/")[inputPath.split("/").length-1]

var readFilePath = path.resolve(inputPath);

var reg =new RegExp(projectName);
var writeFilePath = readFilePath.replace(reg,projectName+NEWPROJECTENDSTR)

if (fs.existsSync(writeFilePath)) {
    delPath(writeFilePath)
}
fs.mkdirSync(writeFilePath)
// copy planB 到 util里
fs.copyFileSync(path.join(process.cwd(),'./node_modules/dd2wx/',"./util/planB.js"),path.join(writeFilePath,'./planB.js'));

fileDisplay(readFilePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, async function(err, files) {
        if (err) {
            console.warn(err);
        } else {
            //遍历读取到的文件列表
            await files.forEach(function(filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,async function(eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {

                        var isFile = stats.isFile();
                        var isDir = stats.isDirectory();
                        // filedir 是文件路径  thisFilename 是文件名
                        var thisFilename = path.basename(filedir);

                        var whiteNames = config.whiteNames
                        var jumpNames = config.jumpNames
                        var reg =new RegExp(projectName);
                        var newPath = filedir.split(".")[0].replace(reg,projectName+NEWPROJECTENDSTR);
                        if(jumpNames.indexOf(thisFilename)>-1){
                            // fs.copyFileSync(filedir,newPath)
                            // copyFolder(filedir,newPath)
                            console.info('忽略')
                        }else if(whiteNames.indexOf(thisFilename)>-1){
                            // fs.copyFileSync(filedir,newPath)
                            copyFolder(filedir,newPath)
                        }else{
                            if (isFile) {
                                var fileNamePre = thisFilename.split('.')[0];
                                var fileNameSuf = thisFilename.split('.')[1];
                                switch (fileNameSuf) {
                                    case 'acss':
                                        await _c(filedir,projectName,fileNamePre)
                                        break;
                                    case 'axml':
                                        // console.info(thisFilename+222)
                                        await _h(filedir,projectName,fileNamePre)
                                        break;
                                    case 'js':
                                        await _j(filedir,projectName,fileNamePre)
                                        // console.info(thisFilename+333)
                                        break;
                                    case 'json':
                                        // console.info(thisFilename+444)
                                        await _json(filedir,projectName,fileNamePre)
                                        break;
                                    default:
                                        _copy(filedir,projectName,fileNamePre)
                                        break;
                                }
                            }
                            if (isDir) {
                                var reg =new RegExp(projectName);
                                var newPath = filedir.split(".")[0].replace(reg,projectName+NEWPROJECTENDSTR);
                                if (!fs.existsSync(newPath)) {
                                    fs.mkdirSync(newPath);
                                }
                                fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                            }
                        }
                    }
                });
            })
        }
    });
}

