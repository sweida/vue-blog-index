import request from "utils/httpIndex";
import baseURL from "./baseUrlConfig";


export function getWebInfo (data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/webinfo/read',
    method: 'get',
    data
  })
}

export function getAd (data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/ad',
    method: 'post',
    data
  })
}

// 友链
export function LinkList (data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/link/list',
    method: 'post',
    data
  })
}
