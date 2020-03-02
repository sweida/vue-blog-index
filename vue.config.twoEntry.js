const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';


let objectProject = {
  index: {
    // 应用入口配置，相当于单页面应用的main.js，必需项
    entry: "src/modules/index/main.js",
    // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
    template: "public/index.html",
    // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
    filename: "index.html",
    // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
    // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: "index page",
    // 包含的模块，可选项
    chunks: ["chunk-vendors", "chunk-common", "index"]
  },
  manage: {
    entry: "src/modules/manage/main.js",
    template: "public/manage.html",
    filename: "manage.html",
    title: "manage page",
    chunks: ["chunk-vendors", "chunk-common", "manage"]
  }
}
let page = {};
let projectname = process.argv[3]; // 获取执行哪个文件
if (process.env.NODE_ENV == "development") {
  page = objectProject;
} else {
  page[projectname] = objectProject[projectname];
}

module.exports = {
  publicPath: "./",
  outputDir: "dist" + projectname, //标识是打包哪个文件
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
  filenameHashing: true,
  pages: page,
  lintOnSave: false,
  productionSourceMap: false,
  // 文件路径缩写
  chainWebpack: config => {
    config.resolve.alias
      // key,value自行定义，比如.set('@assets', resolve('src/assets'))
      .set("style", resolve("src/style"))
      .set("utils", resolve("src/utils"))
      .set("store", resolve("src/store"))
      .set("plugins", resolve("src/plugins"))
      .set("components", resolve("src/components"))
      .set("assets", resolve("src/assets"))
      .set("modules", resolve("src/modules"));
  },
  devServer: {
    sockHost: "localhost",
    disableHostCheck: true,
    port: 9000, // 端口号
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      "/apis": {
        target: "http://127.0.0.1:8080/api/v2", // 需要请求的地址
        // target: process.env.VUE_APP_URL,   // 需要请求的地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/apis": "" // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        }
      }
    }
  },
  // 启动gzip压缩
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        // 超过10kb的压缩gzip
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
  }
};
