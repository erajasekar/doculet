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
import Constants from './utils/constants';

Vue.config.productionTip = false;

// todo move to separate file
firebase.initializeApp(config.firebase);
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

export const doculetsCollection = db.collection(Constants.DB_COLLECTION_DOCULENTS);

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.$store.dispatch('autoSignIn', user);
          this.$store.dispatch('loadMyDocs', user);
      }
    });
  },
}).$mount('#app');
