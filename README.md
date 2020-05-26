# dd2wx

> 引入介绍（Introduction）

可以把钉钉小程序转换成微信小程序 转换度达90%  

> 注
```html
1 未转换内容为 : 组建的父子调用  即 子接父属性 props  子调用父方法   (dd与wx差异度比较大,考虑到代码书写差异较大,故未做动态转换)
2 各文件之间引入务必使用相对路径
3 css文件中请不要使用hack 
4 转换中大量使用正则 故请dd小程序代码 书写务必规范
5 项目里设置了 config 里面有新生成的项目名添加的后缀 默认是WX  里面还设置了白名单(直接复制不进行转换)  还设置了jump名单(不复制不转换)
6 代码难度不大 主要是正则+2套小程序不同api的二次封装  自动化总是好的
```

> 安装方式

```javascript
npm install dd2wx -D
```
> 使用步骤（how to use）

```html
使用步骤

第一、 package.json 配置启动命令
# 例如
"scripts": {
    "dd2wx": "node node_modules/dd2wx/src/index.js inputPath=D:/a/b"
}
# inputPath 为要转换的钉钉小程序的项目路径  
# 转换后的微信小程序项目会生成在钉钉小程序的同级目录  项目名为钉钉小程序项目名称后+'WX'
# 例如   项目名   testDD   ===>    testDDWX

第二、 执行命令
# npm run dd2wx
```

