import request from "utils/httpIndex";
import baseURL from "./baseUrlConfig";

export function GetAd (data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/ad',
    method: 'post',
    data: data
  })
}

// 友链
export function LinkList (data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/link/list',
    method: 'post',
    data: data
  })
}

// 留言列表
export function MessageList (data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/message/list',
    method: 'post',
    data: data
  })
}

// 新增留言
export function MessageAdd (data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/message/add',
    method: 'post',
    data: data
  })
}

// 删除留言
export function MessageDelete (data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/message/delete',
    method: 'post',
    data: data
  })
}

// 回复留言
export function MessageReply (data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/message/reply',
    method: 'post',
    data: data
  })
}

// 删除回复
export function MessageReplyDelete (data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/message/reply/delete',
    method: 'post',
    data: data
  })
}

