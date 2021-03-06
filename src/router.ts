import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import DocEditor from './components/DocEditor.vue';
import DocView from './components/DocView.vue';
import About from './views/About.vue';
import DocShare from './components/DocShare.vue';
import Constants from './utils/constants';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/home',
            name: 'home-static',
            component: Home,
        },
        {
            path: '/edit/:gistId',
            name: 'editor',
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
            path: '/share/:docId',
            name: 'doc-share',
            component: DocShare ,
            props: true,
        },
        {
            path: '/guide/',
            name: 'guide',
            component: DocEditor ,
            props: {gistId: Constants.GETTING_STARTED_DOC_GIST_ID},
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
    ],
    mode: 'history',
});
