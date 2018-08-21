import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {VueHighlightJsDirective} from './directives/VueHighlightJsDirective';
import BootstrapVue from 'bootstrap-vue';
import firebase from 'firebase/app';
import store from './store/index';

import './vue-awesome-config';

Vue.use(BootstrapVue);

// Tell Vue.js to use vue-highlightjs
Vue.directive('highlightjs', VueHighlightJsDirective);

import {config} from './config/config';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    firebase.initializeApp(config.firebase);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.$store.dispatch('autoSignIn', user);
      }
    });
  },
}).$mount('#app');
