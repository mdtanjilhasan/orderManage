import {createApp} from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import axios from "axios";

axios.interceptors.request.use(config => {
    const token = store.getters['authentication/getToken']
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config
})

axios.interceptors.response.use(response => {
    return response
}, function (error) {
    if (error.response.data.status === 401) {
        store.dispatch('authentication/logout')
        router.push('/')
    }
})

createApp(App).use(store).use(router).mount('#app')
