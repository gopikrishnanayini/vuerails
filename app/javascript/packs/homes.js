import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/css/bootstrap.min.css";
import '../homes/styles/main.scss'

import TurbolinksAdapter from 'vue-turbolinks';
import Vue from 'vue/dist/vue.esm'
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  position: 'top-right',
  duration: '5000',
  theme: 'primary',
  className: 'toasted-custom',
  action: {
            text : 'X',
            onClick : (e, toastObject) => {
                toastObject.goAway(0);
            }
          }
})
Vue.use(TurbolinksAdapter);

Vue.prototype.$I18n = window.I18n;

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '[data-component="vue"]',
  })
})


document.addEventListener('page:load', () => {
  const app = new Vue({
    el: '[data-component="vue"]',
  })
})
