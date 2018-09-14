import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {VueHighlightJsDirective} from './directives/VueHighlightJsDirective';
import BootstrapVue from 'bootstrap-vue';
import firebase from 'firebase/app';
import '@firebase/firestore';
import store from './store/index';

import './vue-awesome-config';

Vue.use(BootstrapVue);

// Tell Vue.js to use vue-highlightjs
Vue.directive('highlightjs', VueHighlightJsDirective);

import {config} from './config/config';

Vue.config.productionTip = false;

// todo move to separate file
firebase.initializeApp(config.firebase);
export const db = firebase.firestore();

db.settings({timestampsInSnapshots: true});

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.$store.dispatch('autoSignIn', user);
      }
    });
  },
}).$mount('#app');
