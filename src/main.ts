import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {VueHighlightJsDirective} from './directives/VueHighlightJsDirective';
import BootstrapVue from 'bootstrap-vue';
import store from './store/index';
import firebase from 'firebase/app';
import './vue-awesome-config';
import {isViewPage} from './utils/auth';
import vueHeadful from 'vue-headful';
import VueAnalytics from 'vue-analytics';
import {analyticsConfig} from './config/analytics-config';
import VueClipboard from 'vue-clipboard2';
import Snotify from 'vue-snotify';
// You also need to import the styles. If you're using webpack's css-loader, you can do so here:
import 'vue-snotify/styles/material.css'; // or dark.css or simple.css


export const startTime = new Date().getTime();

Vue.use(BootstrapVue);
Vue.component('vue-headful', vueHeadful);

// Tell Vue.js to use vue-highlightjs
Vue.directive('highlightjs', VueHighlightJsDirective);

Vue.config.productionTip = false;

Vue.use(VueAnalytics, analyticsConfig);
Vue.use(VueClipboard);
Vue.use(Snotify);

new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered')),
  created() {
    if (!isViewPage(this.$route.path)) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.$store.dispatch('autoSignIn', user);
            }
        });
    }
  },
}).$mount('#app');
