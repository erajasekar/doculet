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
import {isProd} from './utils/logger';
import VueAnalytics from 'vue-analytics';

export const startTime = new Date().getTime();

Vue.use(BootstrapVue);
Vue.component('vue-headful', vueHeadful);

// Tell Vue.js to use vue-highlightjs
Vue.directive('highlightjs', VueHighlightJsDirective);

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
    id: 'UA-53694809-1', // TODO UPDATE,
    router,
    ignoreRoutes: ['/doc'],
    autoTracking: { // Be aware that if you need to add your own Vue.config.errorHandler
        // you need to do it before you install the plugin or you will overwrite the plugin handler.
        exception: true,
    },
    debug: {
        enabled: !isProd,
        sendHitTask: isProd,
    },
  });

new Vue({
  router,
  store,
  render: (h) => h(App),
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
