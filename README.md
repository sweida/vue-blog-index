# vue-blog v2重构
**base on vue-cli3**  
博客页面：[http://www.golang365.com](http://www.golang365.com)  
后台页面：[http://www.golang365.com/manage.html#/login](http://www.golang365.com/manage.html#/login)

1.多页面配置，博客页面和后台页面分离  
2.图片上传又拍云  
3.博客页面用iview UI  
4.后台页面用element UI  

## 安装依赖
```
npm install
```

### 启动项目
```
npm run serve
```

### 打包
```
npm run build
```

### 打包并提交代码到分支gh-pages
```
npm run deploy
```

### 未解决问题
- [ ] 友链分页问题
- [ ] 博客页面去除element UI
- [ ] 屏蔽生产环境的console.log
- [x] 多页面配置后，有时候热更新失效
- [x] 后端每篇博客自动生成一份md文档
- [x] cmd启动显示的eslint报错