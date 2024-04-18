import request from "utils/httpIndex";

export function Login (data) {
  return request({
    url: '/apis/login',
    method: 'post',
    data
  })
}

export function Signup (data) {
  return request({
    url: '/apis/signup',
    method: 'post',
    data
  })
}

export function getUserInfo (data) {
  return request({
    url: '/apis/user/info',
    method: 'get',
    data
  })
}

// 修改密码
export function ResetPassword (data) {
  return request({
    url: '/apis/user/resetpassword',
    method: 'post',
    data
  })
}

export function SendEmail (data) {
  return request({
    url: '/apis/user/send_email',
    method: 'post',
    data
  })
}

export function CheckCaptcha (data) {
  return request({
    url: '/apis/user/check_captcha',
    method: 'post',
    data
  })
}

