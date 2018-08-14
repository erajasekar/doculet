import Vue from 'vue';
import Vuex from 'vuex';
import {counter} from './modules/counter'; // TODO remove counter
import {userStore} from './modules/user';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        counter,
        userStore,
    },
    strict: debug,
});
