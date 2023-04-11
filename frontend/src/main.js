import { createApp } from 'vue';
import App from './App.vue';
import axiosPlugin from './plugins/axios.js';
import router from './router/index.js';
import 'dotenv';
import './style.css';
createApp(App)
    .use(axiosPlugin)
    .use(router)  
    .mount('#app')
    

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"