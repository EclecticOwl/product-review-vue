import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import HomeView from '../views/HomeView.vue'
import SignOut from '../views/SignOut.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'



const routes = [
  { path: '/sign-up', name: 'SignUp', component: SignUp },
  { path: '/log-in', name: 'LogIn', component: LogIn },
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/sign-out', name: 'SignOut', component: SignOut, },
  { path: '/product', name: 'ProductList', component: ProductList},
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail, },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
