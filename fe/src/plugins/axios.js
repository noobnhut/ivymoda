import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.404fn.online/server/public/api/'
})

export default {
  install: (app) => {
    app.config.globalProperties.$axios = instance
  }
}
