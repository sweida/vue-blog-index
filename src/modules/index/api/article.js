import request from "utils/httpIndex";
import baseURL from "./baseUrlConfig";

// 文章详情
export function articleDetial(data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/article',
    method: 'post',
    data: data
  })
}

// 文章列表
export function articleList(data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/article/list',
    method: 'post',
    data: data
  })
}

// 点赞
export function articleLike(data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/article/like',
    method: 'post',
    data: data
  })
}

// 标签
export function tagList(data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/tag/list',
    method: 'post',
    data: data
  })
}
