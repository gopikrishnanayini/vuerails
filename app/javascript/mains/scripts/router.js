import Vue from 'vue';
import Router from 'vue-router';
import MainList from '../MainList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkExactActiveClass: "active",
  routes: [{
      path: '/',
      name: 'homes',
      component: MainList,
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
});
