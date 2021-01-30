/**
 *  定义各个API的 baseURL
 */
const common = {}

const baseURL = {
  /** 生产 */ 
  production: {
    ...common,
    host: 'https://cs.creditcard.ecitic.com',
    auth: "https://creditcard.ecitic.com/citiccard",
    prefix: "https://cs.creditcard.ecitic.com/citiccard/mgm-platform-ocp/api/partner",
    channel: 'https://cs.creditcard.ecitic.com/citiccard/mgm-platform-ocp/api/channel'
  },
  /** 开发 */
  development: {
    ...common,
    host: 'https://e.test.bank.ecitic.com',
    auth: "http://e.test.bank.ecitic.com/citiccard",
    prefix: "http://localhost:3721/citiccard/mgm-platform-ocp/api/partner",
    prefix: "https://e.test.bank.ecitic.com/citiccard/mgm-platform-ocp/api/partner",
    channel: 'https://e.test.bank.ecitic.com/citiccard/mgm-platform-ocp/api/channel',
  }
}[process.env.NODE_ENV || 'production']

export default baseURL;
