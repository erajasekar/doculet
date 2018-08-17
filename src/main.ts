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

//const fbApp: firebase.app.App = firebase.initializeApp(config.firebase);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    firebase.initializeApp(config.firebase);

    firebase.auth().onAuthStateChanged((user) => {
      console.log("Auto sign in");
      console.log(user);
        if (user) {
            this.$store.dispatch('autoSignIn', user)
        }
    })
  },
}).$mount('#app');
