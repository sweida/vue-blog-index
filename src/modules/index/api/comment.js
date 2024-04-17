import request from "utils/httpIndex";

// 获取评论
export function CommentList (data) {
  return request({
    url: '/apis/comment/read',
    method: 'post',
    data
  })
}

// 提交评论
export function CommentAdd (data) {
  return request({
    url: '/apis/comment/add',
    method: 'post',
    data
  })
}

// 删除评论
export function CommentDelete (data) {
  return request({
    url: '/apis/comment/delete',
    method: 'post',
    data
  })
}

// 个人留言
export function CommentPerson (data) {
  return request({
    url: '/apis/comment/person',
    method: 'post',
    data
  })
}
