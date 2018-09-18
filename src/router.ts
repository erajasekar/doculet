import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import DocEditor from './components/DocEditor.vue';
import DocView from './components/DocView.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: DocEditor,
        },
        {
            path: '/edit/:gistId',
            name: 'home-gist-import',
            component: DocEditor ,
            props: true,
        },
        {
            path: '/view/:gistId',
            name: 'doc-view',
            component: DocView ,
            props: true,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
    ],
    mode: 'history',
});
