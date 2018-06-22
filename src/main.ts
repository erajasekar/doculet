import Vue from 'vue';
import App from './App.vue';
import router from './router';
import hljs from 'highlight.js'

// Tell Vue.js to use vue-highlightjs
Vue.directive('highlightjs', {
    //deep: true,
    bind: function (el : any, binding : any) {

        if (binding.value) {
            el.innerHTML = binding.value
            // on first bind, highlight all targets
            let targets = el.querySelectorAll('code');
            targets.forEach((target: any) => {
                // if a value is directly assigned to the directive, use this
                // instead of the element content.
                /*  if (binding.value) {
                      target.textContent = binding.value;
                  }*/
                hljs.highlightBlock(target);
            });
        }
    },
    componentUpdated: function (el, binding) {
        // after an update, re-fill the content and then highlight

        if (binding.value){
            el.innerHTML = binding.value;
            console.log(el)
            let targets = el.querySelectorAll('code')
            targets.forEach((target) => {
                //if (binding.value) {
                // console.log(target)
                //  target.innerHTML = binding.value;
                hljs.highlightBlock(target);
                //}
            });
        }

    },
});



Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
