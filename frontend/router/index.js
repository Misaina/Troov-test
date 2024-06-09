import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: Signup
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth.token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
