import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// axios.defaults.baseURL = 'https://lit-reaches-65994.herokuapp.com'
axios.defaults.baseURL = 'http://localhost:8000'

createApp(App).use(store).use(router, axios).mount('#app')
