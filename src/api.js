import axios from 'axios'

const API_URL = '/api/apps/backend/exchange-rate/exchange-rate-page?rateType=mkbk'

export const fetchExchangeRates = (fromDate, toDate) => {
  return axios.get(`${API_URL}&fromDate=${fromDate}&toDate=${toDate}&from=0&size=1000`)
}
