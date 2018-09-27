import {isProd} from '../utils/logger';
import router from '../router';

export const analyticsConfig = {
    id: 'UA-53694809-1', // TODO UPDATE,
    router,
    ignoreRoutes: ['doc-view'],
    autoTracking: { // Be aware that if you need to add your own Vue.config.errorHandler
        // you need to do it before you install the plugin or you will overwrite the plugin handler.
        exception: true,
        // screenview: true, //Adding screen view removes pageView
    },
    debug: {
        enabled: !isProd,
        sendHitTask: isProd,
    },
};
