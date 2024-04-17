# vue-blog v2 重构

**base on vue-cli3**  
博客页面：[http://www.golang365.top](http://www.golang365.top)  
后台页面：[http://www.golang365.top/manage.html#/login](http://www.golang365.top/manage.html#/login)

1.多页面配置，博客页面和后台页面分离  
2.图片上传又拍云  
3.博客页面用 iview UI  
4.后台页面用 element UI

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

### 打包并提交代码到分支 gh-pages，服务器就可以直接拉取 gh-pages 的代码

```bash
# 打包提交到sit分支
npm run deploy:sit
# 打包提交到prod分支
npm run deploy
```

### 环境变量

```
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略

process.env.VUE_APP_VERSION
以 VUE_APP_ 开头
```

### `vue.config.js`开发环境文件配置

这是多页面配置，2 个入口，`index.html`指向`/`路由，`manage.html`指向`manage.html#/`路由

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

**配置 api 请求地址和 serve 启动端口号**

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

### 生产环境 api 接口映射

解决方法：修改宝塔里 vue 项目的 nginx 配置文件

```
server
{
    ...
    // 添加下面三行
    location /api {
        add_header 'Access-Control-Allow-Origin' '*';
        proxy_pass http://api.golang365.top/api/v2;
    }
    ...
}
```

### 修改服务器 nginx 配置文件，开启 gzip

```
server
{
    listen 80;

    // 添加下面
    gzip on;

    # 不压缩临界值，大于1K的才压缩，一般不用改
    gzip_min_length 1k;


    gzip_buffers 4 16k;

    # 压缩级别，1-10，数字越大压缩的越好，时间也越长，看心情随便改吧
    gzip_comp_level 9;

    # 进行压缩的文件类型，缺啥补啥就行了，JavaScript有两种写法，最好都写上吧，总有人抱怨js文件没有压缩，其实多写一种格式就行了
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

    # 跟Squid等缓存服务有关，on的话会在Header里增加"Vary: Accept-Encoding"，我不需要这玩意，自己对照情况看着办吧
    gzip_vary off;

    # IE6对Gzip不怎么友好，不给它Gzip了
    gzip_disable "MSIE [1-6]\.";

    ...
}
```

### 自己写的自动打包提交编译文件到 gh-pages

```
新建gh-pages目录
gh-pages目录创建gh-pages分支的git，并把gh-pages添加到.gitignore文件

gh-pages.sh文件

开启权限才能运行sh文件
chmod 777 gh-pages.sh

运行文件
./gh-pages.sh

将自动打包文件，把打包后的文件复制到gh-pages文件，并提交gh-pages文件到gh-pages分支
```

### 未解决问题

- [ ] 目前已经是配置多页面，但是打包后 js 还是合并在一起，有没有大佬知道怎么解决多页面 js 分开打包

### vue-cli3启动报错问题
找到/node_modules/sockjs-client/dist/sockjs.js  
2.找到代码的 1605行
```js
try {
  //  self.xhr.send(payload); 把这里注掉
} catch (e) {
  self.emit('finish', 0, '');
  self._cleanup(false);
}
```
