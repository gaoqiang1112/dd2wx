var str = '<template is="aParse" data="{{aParseData:article.nodes}}"/>'
str = str.replace(/ a:/,function(item){
    console.info(item)
   // return item.split("rem")[0]*96+'rpx'
})
console.info(str)