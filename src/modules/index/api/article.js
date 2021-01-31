import request from "utils/httpIndex";
import baseURL from "./baseUrlConfig";

// 文章详情
export function ArticleDetial(data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/article',
    method: 'post',
    data: data
  })
}

// 文章列表
export function ArticleList(data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/article/list',
    method: 'post',
    data: data
  })
}

// 点赞
export function ArticleLike(data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/article/like',
    method: 'post',
    data: data
  })
}

// 标签
export function TagList(data) {
  return request({
    // baseURL: baseURL.host,
    url: '/apis/tag/list',
    method: 'post',
    data: data
  })
}
