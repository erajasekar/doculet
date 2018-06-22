import Vue from 'vue';
import App from './App.vue';
import router from './router';
import hljs from 'highlight.js';
import {VueHighlightJsDirective} from './directives/VueHighlightJsDirective';

// Tell Vue.js to use vue-highlightjs
Vue.directive('highlightjs', VueHighlightJsDirective);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
