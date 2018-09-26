import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import DocEditor from './components/DocEditor.vue';
import DocView from './components/DocView.vue';
import About from './views/About.vue';
import Constants from './utils/constants';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: Constants.DOCULET_TITLE,
                metaTags: [
                    {
                        name: 'description',
                        content: Constants.DOCULET_TITLE,
                    },
                    {
                        property: 'og:description',
                        content: Constants.DOCULET_DESCRIPTION,
                    },
                    {
                        name: 'keywords',
                        content: Constants.DOCULET_SEO_KEYWORDS,
                    },
                    {
                        property: 'og:description',
                        content: Constants.DOCULET_DESCRIPTION,
                    },
                    {
                        property: 'og:title',
                        content: Constants.DOCULET_TITLE,
                    },
                    {
                        itemprop: 'name',
                        content: Constants.DOCULET_TITLE,
                    },
                    {
                        itemprop: 'description',
                        content: Constants.DOCULET_TITLE,
                    },
                    {
                        property: 'twitter:card',
                        content: Constants.DOCULET_DESCRIPTION,
                    },
                ],
            },
        },
        {
            path: '/edit/:gistId',
            name: 'editor',
            component: DocEditor ,
            props: true,
        },
        {
            path: '/doc/:gistId',
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
