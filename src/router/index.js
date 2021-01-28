import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import ImportCalendar from '../components/calendar/Import.vue'
import CalendarShow from '../components/calendar/Calendar.vue'
import Java from '../components/interview/Java.vue'
import Mysql from '../components/interview/Mysql.vue'
import Spring from '../components/interview/Spring.vue'
import SpringBoot from '../components/interview/SpringBoot.vue'
import SpringCloud from '../components/interview/SpringCloud.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/user', component: User },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/import', component: ImportCalendar },
        { path: '/calendar', component: CalendarShow },
        { path: '/basic', component: Java },
        { path: '/mysql', component: Mysql },
        { path: '/spring', component: Spring },
        { path: '/boot', component: SpringBoot },
        { path: '/cloud', component: SpringCloud }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
