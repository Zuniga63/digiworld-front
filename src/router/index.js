import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import VerifyView from '../views/VerifyView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: () => {
        if (window) {
          const token = localStorage.getItem('token');
          const user = JSON.parse(localStorage.getItem('user'));
          if (!token) router.push('/login');
          if (user && !user.verify) router.push('/verify');
        }
        return true;
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: () => {
        if (window) {
          const token = localStorage.getItem('token');
          if (token) router.push('/');
        }
        return true;
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: () => {
        if (window) {
          const token = localStorage.getItem('token');
          if (token) router.push('/');
        }
        return true;
      },
    },
    {
      path: '/verify',
      name: 'verify',
      component: VerifyView,
      beforeEnter: () => {
        if (window) {
          const user = JSON.parse(localStorage.getItem('user'));
          if (user && user.verify) router.push('/');
        }
        return true;
      },
    },
  ],
});

export default router;
