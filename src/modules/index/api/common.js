import request from "utils/httpIndex";
import baseURL from "./baseUrlConfig";

export function getAd(data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/ad',
    method: 'post',
    data: data
  })
}

// 友链
export function linkList(data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/link/list',
    method: 'post',
    data: data
  })
}

// 留言列表
export function messageList(data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/message/list',
    method: 'post',
    data: data
  })
}

