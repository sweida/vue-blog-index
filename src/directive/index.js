import Vue from 'vue'

const defaultErrorImg = require("@/assets/errorImg.jpg");

//全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
Vue.directive("imgUrl", async function(el, binding) {
  let imgURL = binding.value; //获取图片地址
  let errorImg = el.getAttribute("error-img"); //获取错误图片地址，如果没有则获取默认的
  if (imgURL) {
		// 是否http开头
		let isHttp = imgURL.indexOf('http')
		if (isHttp > -1) {
      let exist = await imageIsExist(imgURL);
      if (exist) {
        el.setAttribute("src", imgURL);
      } else {
        el.setAttribute("src", errorImg || defaultErrorImg);
      }
		} else {
      let exist = await imageIsExist(imgURL);
      if (exist) {
        el.setAttribute("src", process.env.VUE_APP_STATIC_URL + imgURL);
      } else {
        el.setAttribute("src", errorImg || defaultErrorImg);
      }
		}
	} else {
		el.setAttribute("src", errorImg || defaultErrorImg);
	}
});

// exist 判断有问题
Vue.directive("real-img", async function(el, binding) {
  let imgURL = binding.value; //获取图片地址
  let errorImg = el.getAttribute("error-img"); //获取默认图片地址
  if (imgURL) {
    let exist = await imageIsExist(imgURL);
    if (exist) {
      el.setAttribute("src", imgURL);
    } else {
      el.setAttribute("src", errorImg || defaultErrorImg);
    }
  }
});

/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function(url) {
  return new Promise(resolve => {
    var img = new Image();
    img.onload = function() {
      if (this.complete == true) {
        resolve(true);
        img = null;
      }
    };
    img.onerror = function() {
      resolve(false);
      img = null;
    };
    img.src = url;
  });
};
