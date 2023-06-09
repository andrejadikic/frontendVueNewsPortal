import Home from './components/pages/Home.vue';
import Articles from './components/pages/secure/Articles.vue';
import Categories from './components/pages/secure/Categories.vue';
import Users from './components/pages/secure/Users.vue';
import Article from './components/pages/Article.vue';
import VueRouter from 'vue-router';
import Login from './components/pages/Login.vue';

const routes = [
  {
    component: Home,
    path: '/',
    name: 'Home'
  },
  {
    component: Articles,
    path: '/articles',
    name: 'Articles'
  },
  {
    component: Article,
    path: '/article/:id',
    name: 'Article'
  },
  {
    component: Login,
    path: '/login',
    name: 'Login'
  },
  {
    component: Categories,
    path: '/categories',
    name: 'Categories'
  },
  {
    component: Users,
    path: '/users',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
