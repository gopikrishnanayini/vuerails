import TurbolinksAdapter from 'vue-turbolinks';
import Vue from 'vue/dist/vue.esm'
import BootstrapVue from 'bootstrap-vue'
import Mains from '../mains/mains.vue'
import router from 'mains/scripts/router'
import Vuelidate from 'vuelidate'
import Toasted from 'vue-toasted';
import VueRouter from 'vue-router'
import 'sweetalert2/src/sweetalert2.scss'

Vue.use(VueRouter);
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
Vue.config.productionTip = false;
Vue.use(TurbolinksAdapter);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);

import lodash from 'lodash';
Object.defineProperty(Vue.prototype, '_', {
  value: lodash
});

Vue.prototype.$I18n = window.I18n;

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#mains',
    router,
    template: '<mains/>',
    components: {
      Mains
    }
  })
})
