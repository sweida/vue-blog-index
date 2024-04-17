import request from "utils/httpIndex";
import baseURL from "./baseUrlConfig";

// 留言列表
export function MessageList (data) {
  return request({
    url: '/apis/message/list',
    method: 'post',
    data
  })
}

// 新增留言
export function MessageAdd (data) {
  return request({
    url: '/apis/message/add',
    method: 'post',
    data
  })
}

// 删除留言
export function MessageDelete (data) {
  return request({
    url: '/apis/message/delete',
    method: 'post',
    data
  })
}

// 回复留言
export function MessageReply (data) {
  return request({
    url: '/apis/message/reply',
    method: 'post',
    data
  })
}

// 删除回复
export function MessageReplyDelete (data) {
  return request({
    url: '/apis/message/reply/delete',
    method: 'post',
    data
  })
}

// 个人留言
export function MessagePerson (data) {
  return request({
    url: '/apis/message/person',
    method: 'post',
    data
  })
}
