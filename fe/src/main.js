import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axiosPlugin from './plugins/axios.js'
import router from './router/index.js'
loadFonts()

createApp(App)
  .use(vuetify)
  .use(axiosPlugin)
  .use(router)
  .mount('#app')
