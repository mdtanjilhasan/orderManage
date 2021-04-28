import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import axios from "axios";

axios.interceptors.request.use(config => {
    const token = store.getters['authentication/getToken']
    config.headers.Authorization = 'Bearer '+token
    return config
})

createApp(App).use(store).use(router).mount('#app')
