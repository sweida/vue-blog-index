/**
 *  定义各个API的 baseURL
 */
const common = {
  static_url: 'http://static.golang365.top/',
}

const baseURL = {
  /** 生产 */
  production: {
    ...common,
    api_url: 'https://api.golang365.top/api/v2',
    dist_name: 'prod',
  },
  /** 开发 */
  development: {
    ...common,
    api_url: "https://api.golang365.top/api/v2",
    dist_name: 'dev',
  },
  /** 测试 */
  test: {
    ...common,
    api_url: "http://blog-test.golang365.top/api/v2",
    dist_name: 'test',
  },
  /** sit */
  sit: {
    ...common,
    api_url: "http://blog-sit.golang365.top/api/v2",
    dist_name: 'sit',
  }
}[process.env.NODE_ENV || 'production']

export default baseURL;

