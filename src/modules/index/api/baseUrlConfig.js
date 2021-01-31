/**
 *  定义各个API的 baseURL
 */
const common = {}

const baseURL = {
  /** 生产 */ 
  production: {
    ...common,
    host: '',
    auth: "",
    prefix: "",
    channel: ''
  },
  /** 开发 */
  development: {
    ...common,
    host: '',
    auth: "",
    prefix: "",
    prefix: "",
    channel: '',
  }
}[process.env.NODE_ENV || 'production']

export default baseURL;
