# vue-blog v2重构
**base on vue-cli3**  
博客页面：[http://www.golang365.com](http://www.golang365.com)  
后台页面：[http://www.golang365.com/manage.html#/login](http://www.golang365.com/manage.html#/login)

1.多页面配置，博客页面和后台页面分离  
2.图片上传又拍云  
3.博客页面用iview UI  
4.后台页面用element UI  


### vue-cli3
### 安装依赖
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

### 打包并提交代码到分支gh-pages，服务器就可以直接拉取gh-pages的代码
```
npm run deploy
```

### `vue.config.js`开发环境文件配置
这是多页面配置，2个入口，`index.html`指向`/`路由，`manage.html`指向`manage.html#/`路由
```js
  pages: {
    index: {
      // 应用入口配置，相当于单页面应用的main.js，必需项
      entry: 'src/modules/index/main.js',
      // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
      template: 'public/index.html',
      // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
      filename: 'index.html',
      // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
      // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'index page',
      // 包含的模块，可选项
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    manage: {
      entry: 'src/modules/manage/main.js',
      template: 'public/manage.html',
      filename: 'manage.html',
      title: 'manage page',
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
```

**配置api请求地址和serve启动端口号**
```js
  devServer: {
    port: 9000, // 端口号
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      "/apis": {
        target: "http://127.0.0.1:8080/api/v2", // 需要请求的地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/apis": "" // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'
        }
      }
      // '/foo': {
      //     target: '<other_url>'
      // }
      // 配置多个代理
    }
```

### 生产环境api接口映射
解决方法：修改宝塔里vue项目的nginx配置文件
```
server
{
    ...
    // 添加下面三行
    location /api {
        add_header 'Access-Control-Allow-Origin' '*';
        proxy_pass http://api.golang365.com/api/v2;
    }
    ...
}
```

### 未解决问题
- [ ] 友链分页问题
- [ ] 博客页面去除element UI
- [ ] 屏蔽生产环境的console.log
- [x] 多页面配置后，有时候热更新失效
- [x] 后端每篇博客自动生成一份md文档
- [x] cmd启动显示的eslint报错