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

export const startTime = new Date().getTime();

Vue.use(BootstrapVue);
Vue.component('vue-headful', vueHeadful);

// Tell Vue.js to use vue-highlightjs
Vue.directive('highlightjs', VueHighlightJsDirective);

Vue.config.productionTip = false;

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
