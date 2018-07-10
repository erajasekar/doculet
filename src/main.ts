import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {VueHighlightJsDirective} from './directives/VueHighlightJsDirective';
import BootstrapVue from 'bootstrap-vue';
import firebase from 'firebase';

import './vue-awesome-config';

Vue.use(BootstrapVue);

// Tell Vue.js to use vue-highlightjs
Vue.directive('highlightjs', VueHighlightJsDirective);

// TODO move to separate file
const config = {
    apiKey: 'AIzaSyAjJ_Y5PmEQq_W5RFYoP9AhlVRZT1pcvos',
    authDomain: 'doculet-cbd63.firebaseapp.com',
    databaseURL: 'https://doculet-cbd63.firebaseio.com',
    projectId: 'doculet-cbd63',
    storageBucket: 'doculet-cbd63.appspot.com',
    messagingSenderId: '274170082980',
};
firebase.initializeApp(config);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
